import { prisma } from "@/lib/prisma";
import ProfileClient, { UserProfileData } from "./ProfileClient";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const MOCK_USER: UserProfileData = {
  id: "mock123",
  username: "genetics_mapper",
  display_name: "Dr. Alex Kim",
  bio: "Computational geneticist studying CRISPR efficiency and off-target modification patterns. PhD @ MIT. Building open science tooling on Solana.",
  wallet_address: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
  reputation_score: 650,
  badges: ["Research Contributor", "Early Scientist"],
  interests: ["Genetics", "AI", "Biotech", "DeSci"],
  created_at: "2025-01-15",
  stats: { posts: 24, comments: 137, upvotes_received: 842, missions_completed: 8 },
};

export const revalidate = 0;

export default async function ProfilePage({ params }: { params: { username: string } }) {
  try {
    const session = await getServerSession(authOptions);
    
    let targetUsername = params.username;

    if (targetUsername === "me") {
      if (!session?.user?.id) {
        return (
          <div style={{ padding: 40, textAlign: "center" }}>
            <h2>You must be logged in to view your profile.</h2>
          </div>
        );
      }
      const me = await prisma.user.findUnique({ where: { id: session.user.id } });
      if (!me) {
        return <div style={{ padding: 40, textAlign: "center" }}>User not found in database.</div>;
      }
      targetUsername = me.username;
    }

    const dbUser = await prisma.user.findUnique({
      where: { username: targetUsername }
    });

    if (!dbUser) {
      // Fallback to mock if looking for mock user
      if (targetUsername === "genetics_mapper") {
        return <ProfileClient user={MOCK_USER} isOwnProfile={false} />;
      }
      return <div style={{ padding: 40, textAlign: "center" }}>User not found</div>;
    }

    const isOwnProfile = session?.user?.id === dbUser.id;

    const userData: UserProfileData = {
      id: dbUser.id,
      username: dbUser.username,
      display_name: dbUser.displayName || dbUser.username,
      bio: dbUser.bio || "Science enthusiast and LABVEX member.",
      wallet_address: dbUser.walletAddress || "Not Connected",
      reputation_score: dbUser.reputation,
      badges: ["Early Scientist"],
      interests: ["DeSci", "Research"],
      created_at: dbUser.createdAt.toISOString().split("T")[0],
      stats: { posts: 0, comments: 0, upvotes_received: 0, missions_completed: 0 }
    };

    return <ProfileClient user={userData} isOwnProfile={isOwnProfile} />;
  } catch (e) {
    console.error("Error fetching profile", e);
    return <ProfileClient user={MOCK_USER} isOwnProfile={false} />;
  }
}

