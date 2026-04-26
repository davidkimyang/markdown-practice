import { AuthForm } from "@/components/AuthForm";

export default function SignupPage() {
  return (
    <section className="space-y-4 text-center">
      <h1 className="text-xl font-semibold">회원가입</h1>
      <AuthForm mode="signup" />
    </section>
  );
}
