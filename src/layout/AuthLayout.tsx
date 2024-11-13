import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen w-screen bg-neutral-100 flex-center">
      {children}
    </div>
  );
}
