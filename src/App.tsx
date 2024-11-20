import { Outlet } from "react-router-dom";
import AuthProvider from "./features/auth/context/auth.tsx";
import { StyleProvider } from "./context/StyleContext.tsx";

function App() {
  return (
    <AuthProvider>
      <StyleProvider>
        <section className={`h-screen w-screen text-preset-4 lg:text-preset-3`}>
          <Outlet />
        </section>
      </StyleProvider>
    </AuthProvider>
  );
}

export default App;
