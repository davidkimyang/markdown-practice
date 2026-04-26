import { MAX_CONTENT_LENGTH } from "@/lib/constants";

export function validateContent(content: string): string {
  const trimmed = content.trim();
  if (!trimmed) throw new Error("메모 내용을 입력해주세요.");
  if (trimmed.length > MAX_CONTENT_LENGTH) {
    throw new Error(`메모는 최대 ${MAX_CONTENT_LENGTH}자까지 입력할 수 있습니다.`);
  }

  return trimmed.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
}

export function generateShortId(length = 8): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";
  let out = "";
  for (let i = 0; i < length; i++) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return out;
}
