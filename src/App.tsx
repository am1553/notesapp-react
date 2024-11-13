import { Outlet } from "react-router-dom";

function App() {
  return (
    <section className="h-screen w-screen font-inter text-preset-4">
      <Outlet />
    </section>
  );
}

export default App;
