import { AuthForm, LoginForm } from "../../features/auth";

import { useAuth } from "../../features/auth/context/auth.tsx";
import AuthLayout from "../../layout/AuthLayout.tsx";

export default function LoginRoute() {
  const [authenticate, isAuthenticating] = useAuth();
  return (
    <AuthLayout>
      <AuthForm
        title="Welcome to Note"
        description={isAuthenticating ? "" : "Please log in to continue"}
      >
        <LoginForm />
      </AuthForm>
    </AuthLayout>
  );
}
