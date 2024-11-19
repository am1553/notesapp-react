import { AuthForm, LoginForm } from "../../features/auth";

import { useAuth } from "../../features/auth/context/auth.tsx";
import AuthLayout from "../../layout/AuthLayout.tsx";

export default function LoginRoute() {
  const [, isAuthenticating] = useAuth();
  return (
    <AuthLayout>
      <AuthForm
        title="Welcome to Notes"
        description={isAuthenticating ? "" : "Please log in to continue"}
      >
        <LoginForm />
      </AuthForm>
    </AuthLayout>
  );
}
