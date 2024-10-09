import { Header } from "../ui";
import { Outlet } from "react-router-dom";
import { Footer } from "../ui/Footer";

export const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow p-4 mt-[20px]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
