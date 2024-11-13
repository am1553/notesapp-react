import { AuthForm, SignUpForm } from "../../features/auth";
import { AuthLayout } from "../../layout";

export default function SignUpRoute() {
  return (
    <AuthLayout>
      <AuthForm
        title="Create Your Account"
        description={
          "Sign up to start organizing your notes and boost your productivity."
        }
      >
        <SignUpForm />
      </AuthForm>
    </AuthLayout>
  );
}
