/* ─── LABVEX Core Types ───────────────────────────────────────────────────── */

export type InterestCategory =
  | "AI"
  | "Biotech"
  | "Longevity"
  | "Neuroscience"
  | "Genetics"
  | "DeSci";

export type BadgeType =
  | "Research Contributor"
  | "Reviewer"
  | "AI Analyst"
  | "Early Scientist"
  | "Community Builder";

export type ReputationTier =
  | "Newcomer"
  | "Member"
  | "Contributor"
  | "Expert"
  | "Distinguished";

export type MissionStatus = "available" | "in_progress" | "completed";
export type MissionDifficulty = "easy" | "medium" | "hard";

/* ─── Database Models ─────────────────────────────────────────────────────── */

export interface User {
  id: string;
  email?: string;
  wallet_address?: string;
  username: string;
  display_name?: string;
  bio?: string;
  avatar_url?: string;
  interests: InterestCategory[];
  reputation_score: number;
  badges: BadgeType[];
  is_onboarded: boolean;
  created_at: string;
  updated_at: string;
}

export interface Post {
  id: string;
  author_id: string;
  author?: User;
  title: string;
  content: string;
  tags: string[];
  upvotes: number;
  comment_count: number;
  bookmark_count: number;
  ai_summary?: string;
  is_pinned: boolean;
  created_at: string;
  updated_at: string;
  /* client-only */
  user_vote?: "up" | null;
  user_bookmarked?: boolean;
}

export interface Comment {
  id: string;
  post_id: string;
  author_id: string;
  author?: User;
  parent_id?: string;
  content: string;
  upvotes: number;
  replies?: Comment[];
  created_at: string;
  updated_at: string;
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  difficulty: MissionDifficulty;
  rep_reward: number;
  badge_reward?: BadgeType;
  category: InterestCategory;
  status: MissionStatus;
  participants: number;
  deadline?: string;
  created_at: string;
}

export interface ReputationEvent {
  id: string;
  user_id: string;
  event_type:
    | "post_upvoted"
    | "comment_upvoted"
    | "mission_completed"
    | "post_created"
    | "review_given";
  points: number;
  description: string;
  created_at: string;
}

export interface AIInteraction {
  id: string;
  user_id: string;
  session_id: string;
  role: "user" | "assistant";
  content: string;
  context_type?: "feed" | "post" | "profile" | "general";
  context_id?: string;
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  type:
    | "upvote"
    | "comment"
    | "reply"
    | "badge"
    | "mission"
    | "follow"
    | "ai_insight";
  title: string;
  body: string;
  read: boolean;
  link?: string;
  created_at: string;
}

/* ─── API Response Wrappers ───────────────────────────────────────────────── */

export interface PaginatedResponse<T> {
  data: T[];
  count: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export interface ApiError {
  code: string;
  message: string;
  status: number;
}

/* ─── Vexy AI ─────────────────────────────────────────────────────────────── */

export interface VexyMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
}

export interface VexyContext {
  type: "post" | "feed" | "profile" | "general";
  data?: unknown;
}
