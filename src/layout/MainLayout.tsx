import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => (
  <div className="min-h-screen">
    <Navbar />
    <Outlet />
    <Footer />
  </div>
);

export default MainLayout;
