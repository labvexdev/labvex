import { prisma } from "@/lib/prisma";
import AdminClient, { SubmissionData } from "./AdminClient";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export const revalidate = 0;

export default async function AdminDashboard() {
  try {
    const session = await getServerSession(authOptions);
    const user = session?.user as { id?: string } | undefined;
    if (!user?.id) {
      redirect("/onboarding");
    }

    const me = await prisma.user.findUnique({ where: { id: user.id } });
    
    // Hardcoded admin check for prototyping
    if (!me || (me.username !== "labvex_admin" && me.username !== "genetics_mapper")) {
      redirect("/feed");
    }

    const dbSubmissions = await prisma.submission.findMany({
      orderBy: { createdAt: "desc" },
      include: { author: true }
    });

    const submissions: SubmissionData[] = dbSubmissions.map((s: any) => ({
      id: s.id,
      author: s.author.username,
      title: s.title,
      link: s.link,
      desc: s.desc,
      status: s.status,
      date: s.createdAt.toISOString()
    }));

    return <AdminClient initialSubmissions={submissions} />;
  } catch (e) {
    console.error("Error fetching submissions", e);
    // If DB fails, fallback to local storage parsing in client? 
    // We'll just pass empty for now.
    return <AdminClient initialSubmissions={[]} />;
  }
}
