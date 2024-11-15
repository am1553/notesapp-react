import { Outlet } from "react-router-dom";
import AuthProvider from "./features/auth/context/auth.tsx";

function App() {
  return (
    <AuthProvider>
      <section className="h-screen w-screen font-inter text-preset-4 lg:text-preset-3">
        <Outlet />
      </section>
    </AuthProvider>
  );
}

export default App;
