import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer/Footer";

function MainLayout() {
  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />

      <main className="mx-auto py-12">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
