import { NextRequest, NextResponse } from "next/server";
import { FREE_DAILY_LIMIT } from "@/lib/constants";
import { generateShortId, validateContent } from "@/lib/security";
import { applyRateLimit } from "@/lib/rate-limit";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import type { PlanType } from "@/lib/types";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  if (!applyRateLimit(`create:${ip}`, 20, 60_000)) {
    return NextResponse.json({ error: "요청이 너무 많습니다." }, { status: 429 });
  }

  try {
    const body = await req.json();
    const content = validateContent(body.content ?? "");
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    let plan: PlanType = "free";
    if (user) {
      const { data: profile } = await supabaseAdmin
        .from("profiles")
        .select("plan")
        .eq("id", user.id)
        .single();
      plan = (profile?.plan as PlanType) ?? "free";
    }

    if (plan === "free") {
      const start = new Date();
      start.setUTCHours(0, 0, 0, 0);

      const { count } = await supabaseAdmin
        .from("notes")
        .select("id", { count: "exact", head: true })
        .gte("created_at", start.toISOString())
        .eq("user_id", user?.id ?? null);

      if ((count ?? 0) >= FREE_DAILY_LIMIT) {
        return NextResponse.json({ error: "무료 플랜은 하루 10개까지만 저장 가능합니다." }, { status: 403 });
      }
    }

    const shortId = generateShortId();
    const isPrivate = plan === "pro" ? Boolean(body.isPrivate) : false;
    const expiresAt = plan === "pro" ? body.expiresAt : null;

    const { error } = await supabaseAdmin.from("notes").insert({
      user_id: user?.id ?? null,
      short_id: shortId,
      content,
      is_private: isPrivate,
      expires_at: expiresAt,
      view_count: 0,
    });

    if (error) throw error;

    return NextResponse.json({ shortId }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "저장에 실패했습니다." }, { status: 400 });
  }
}
