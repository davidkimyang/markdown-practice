import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export async function GET(_: NextRequest, { params }: { params: Promise<{ shortId: string }> }) {
  const { shortId } = await params;
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data } = await getSupabaseAdmin().from("notes").select("*").eq("short_id", shortId).single();

  if (!data) return NextResponse.json({ error: "Not Found" }, { status: 404 });
  if (data.expires_at && new Date(data.expires_at).getTime() < Date.now()) {
    return NextResponse.json({ error: "만료된 메모입니다." }, { status: 410 });
  }
  if (data.is_private && data.user_id !== user?.id) {
    return NextResponse.json({ error: "권한이 없습니다." }, { status: 403 });
  }

  await getSupabaseAdmin().rpc("increment_note_views", { p_short_id: shortId });

  return NextResponse.json({ note: data });
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ shortId: string }> }) {
  const { shortId } = await params;
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });

  const { error } = await getSupabaseAdmin().from("notes").delete().eq("short_id", shortId).eq("user_id", user.id);

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true });
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ shortId: string }> }) {
  const { shortId } = await params;
  const { content } = await req.json();
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });

  const { error } = await getSupabaseAdmin()
    .from("notes")
    .update({ content: String(content).slice(0, 5000) })
    .eq("short_id", shortId)
    .eq("user_id", user.id);

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true });
}
