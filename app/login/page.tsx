import { AuthForm } from "@/components/AuthForm";

export default function LoginPage() {
  return (
    <section className="space-y-4 text-center">
      <h1 className="text-xl font-semibold">로그인</h1>
      <AuthForm mode="login" />
    </section>
  );
}
