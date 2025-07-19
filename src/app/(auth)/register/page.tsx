import { RegisterForm } from "@/components/auth/RegisterForm";
import { Container } from "@/components/ui/container";

export default function RegisterPage() {
  return (
    <Container className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Create your account
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Join SignatureCraft and create professional email signatures in minutes
          </p>
        </div>
        <RegisterForm />
      </div>
    </Container>
  );
}

export const metadata = {
  title: "Sign Up | SignatureCraft",
  description: "Create your SignatureCraft account to start building professional email signatures.",
};