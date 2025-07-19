import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";
import { Container } from "@/components/ui/container";

export default function ResetPasswordPage() {
  return (
    <Container className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Reset your password
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Don&apos;t worry, we&apos;ll help you get back into your account
          </p>
        </div>
        <ResetPasswordForm />
      </div>
    </Container>
  );
}

export const metadata = {
  title: "Reset Password | SignatureCraft",
  description: "Reset your SignatureCraft account password.",
};