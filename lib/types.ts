export type PlanType = "free" | "pro";

export type Note = {
  id: string;
  user_id: string | null;
  short_id: string;
  content: string;
  is_private: boolean;
  view_count: number;
  expires_at: string | null;
  created_at: string;
};
