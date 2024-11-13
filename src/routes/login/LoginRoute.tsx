import { AuthForm, LoginForm } from "../../features/auth";
import { AuthLayout } from "../../layout";

export default function LoginRoute() {
  return (
    <AuthLayout>
      <AuthForm
        title="Welcome to Note"
        description={"Please log in to continue"}
      >
        <LoginForm />
      </AuthForm>
    </AuthLayout>
  );
}
