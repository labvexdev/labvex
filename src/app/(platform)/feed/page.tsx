import { prisma } from "@/lib/prisma";
import FeedClient, { PostData } from "./FeedClient";

const MOCK_POSTS: PostData[] = [
  { id: "1", author: "dr_chen_lab", field: "Longevity · Stanford", reputation: 1840, title: "TERT reactivation in somatic cells shows 40% lifespan extension in murine models", body: "Our team investigated controlled TERT reactivation as a longevity intervention. Results show a 40% median lifespan extension in C57BL/6 mice with no observable tumor formation at 18 months post-treatment.", tags: ["Longevity", "Genetics"], upvotes: 312, comments: 47, time: "2h ago", summary: "TERT reactivation extended median murine lifespan by 40% with no tumor formation, reduced p21 expression, and improved mitochondrial function.", casFlag: false },
  { id: "2", author: "neuro_synthesis", field: "Neuroscience · MIT", reputation: 920, title: "Ketone metabolism as neuroprotective mechanism: hypothesis for Alzheimer's targeting", body: "Exogenous ketone supplementation may act as neuroprotection via dual pathways: direct ATP generation bypassing glycolytic deficits, and NLRP3 inflammasome suppression.", tags: ["Neuroscience", "Longevity"], upvotes: 187, comments: 29, time: "5h ago", summary: null, casFlag: false },
  { id: "3", author: "vexy_analyst", field: "Bioinformatics · Broad Institute", reputation: 3200, title: "Validation methodology for AI-assisted protein folding predictions: proposed community standard", body: "Proposing a four-tier verification protocol: AlphaFold2 baseline, wet-lab MD simulation validation, community peer review with structured scoring, and on-chain attestation for verified predictions.", tags: ["AI", "Biotech"], upvotes: 456, comments: 83, time: "1d ago", summary: "Four-tier validation protocol for AI protein folding: AlphaFold2 comparison, MD simulation, peer review, and on-chain attestation.", casFlag: false },
  { id: "4", author: "genetics_mapper", field: "Genetics · Weizmann Institute", reputation: 650, title: "CRISPR-Cas9 efficiency improvements with modified guide RNA secondary structures", body: "Engineering secondary structures into guide RNAs improves Cas9 binding efficiency by 23% on average across 14 target sequences, reducing off-target activity significantly. Reagent CAS: 9001-99-4.", tags: ["Genetics", "Biotech"], upvotes: 94, comments: 16, time: "2d ago", summary: null, casFlag: true },
];

export const revalidate = 0; // Disable static rendering for this page

export default async function FeedPage() {
  try {
    const dbPosts = await prisma.post.findMany({
      include: { author: true },
      orderBy: { createdAt: "desc" }
    });

    // Map Prisma schema to frontend shape
    const posts: PostData[] = dbPosts.map(p => ({
      id: p.id,
      author: p.author.username,
      field: "General Science", // Currently missing from DB, mocked for now
      reputation: p.author.reputation,
      title: p.title,
      body: p.content,
      tags: ["DeSci"], // Default tag
      upvotes: 0,
      comments: 0,
      time: p.createdAt.toLocaleDateString(),
      summary: null,
      casFlag: false
    }));

    // If db is empty, provide the mock posts as fallback so it looks good for the prototype
    const finalPosts = posts.length > 0 ? posts : MOCK_POSTS;

    return <FeedClient initialPosts={finalPosts} />;
  } catch (e) {
    console.error("Error fetching posts", e);
    // Fallback to mock data if DB connection fails
    return <FeedClient initialPosts={MOCK_POSTS} />;
  }
}
