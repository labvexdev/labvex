import { prisma } from "@/lib/prisma";
import MissionsClient, { MissionData } from "./MissionsClient";

const MOCK_MISSIONS: MissionData[] = [
  { id: "1", title: "Summarise a Longevity Paper", desc: "Find a peer-reviewed longevity paper published in 2023–24 and write a structured LABVEX summary with methodology, findings, and limitations.", reward: 50, diff: "Easy", category: "Research", time: "~30 min", completions: 312, icon: "📄" },
  { id: "2", title: "Validate an AI Protein Prediction", desc: "Take an AlphaFold2 prediction from the community feed and compare it against available wet-lab data. Submit your validation report.", reward: 120, diff: "Medium", category: "Validation", time: "~2h", completions: 89, icon: "🧬" },
  { id: "3", title: "Peer Review a DeSci Proposal", desc: "Review a community research proposal using LABVEX's structured peer review framework. Score methodology, feasibility, and impact.", reward: 180, diff: "Medium", category: "Peer Review", time: "~3h", completions: 54, icon: "🔬", usdt: 150 },
  { id: "4", title: "Build a VEXY Research Thread", desc: "Create an in-depth research thread using VEXY AI to explore a frontier science topic. Minimum 5 connected posts with citations.", reward: 300, diff: "Hard", category: "Research", time: "~5h", completions: 21, icon: "🧠" },
  { id: "5", title: "Onboard a Researcher", desc: "Invite and onboard a practicing scientist to LABVEX. Help them complete their profile and post their first research thread.", reward: 75, diff: "Easy", category: "Community", time: "~1h", completions: 445, icon: "👥" },
  { id: "6", title: "Reproduce a Published Study", desc: "Select a recent study and attempt computational reproduction using available datasets. Document your process and findings.", reward: 500, diff: "Expert", category: "Validation", time: "~20h", completions: 8, icon: "⚗️", usdt: 1000 },
];

export const revalidate = 0;

export default async function MissionsPage() {
  try {
    const dbMissions = await prisma.mission.findMany({
      orderBy: { createdAt: "desc" }
    });

    const missions: MissionData[] = dbMissions.map(m => ({
      id: m.id,
      title: m.title,
      desc: m.description,
      reward: m.reward,
      diff: "Medium", // Default since it's not in DB
      category: "Research", // Default
      time: "~2h", // Default
      completions: 0,
      icon: "🎯"
    }));

    const finalMissions = missions.length > 0 ? missions : MOCK_MISSIONS;

    return <MissionsClient initialMissions={finalMissions} />;
  } catch (e) {
    console.error("Error fetching missions", e);
    return <MissionsClient initialMissions={MOCK_MISSIONS} />;
  }
}
