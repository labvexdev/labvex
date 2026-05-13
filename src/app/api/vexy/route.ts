import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";


const VEXY_SYSTEM_PROMPT = `You are VEXY, an AI research co-pilot integrated into LABVEX — the Unified DeSci Operating System.

Your role is to assist scientists, researchers, and DeSci builders with:
- Summarizing scientific research papers and findings
- Generating testable scientific hypotheses
- Explaining complex scientific concepts in clear language
- Recommending related research topics and researchers
- Analyzing datasets and research methodology
- Supporting biotech, genetics, neuroscience, longevity, AI, and DeSci discussions

Guidelines:
- Be precise, scientific, and evidence-based
- Cite reasoning clearly but admit uncertainty when appropriate
- Use structured formatting (bullet points, numbered lists) for complex topics
- Keep responses focused and actionable
- Never fabricate specific paper citations or author names
- Always recommend verifying AI-generated content against primary literature
- Maintain a professional but approachable scientific tone`;

export async function POST(req: NextRequest) {
  try {
    const { messages, context } = await req.json();

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OpenAI API key not configured" },
        { status: 500 }
      );
    }
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const stream = await openai.chat.completions.create({
      model: "gpt-4o",
      stream: true,
      max_tokens: 1024,
      messages: [
        { role: "system", content: VEXY_SYSTEM_PROMPT },
        ...(context ? [{ role: "system" as const, content: `Current context: ${JSON.stringify(context)}` }] : []),
        ...messages,
      ],
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const text = chunk.choices[0]?.delta?.content ?? "";
          if (text) controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`));
        }
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      },
    });

    return new NextResponse(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("VEXY API error:", error);
    return NextResponse.json({ error: "AI request failed" }, { status: 500 });
  }
}
