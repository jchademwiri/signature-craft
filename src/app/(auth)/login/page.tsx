import { LoginForm } from "@/components/auth/LoginForm";
import { Container } from "@/components/ui/container";

export default function LoginPage() {
  return (
    <Container className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Sign in to your SignatureCraft account
          </p>
        </div>
        <LoginForm />
      </div>
    </Container>
  );
}

export const metadata = {
  title: "Sign In | SignatureCraft",
  description: "Sign in to your SignatureCraft account to create professional email signatures.",
};