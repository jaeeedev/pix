import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const GlobalLayout = () => {
  return (
    <div className="h-screen">
      <Header />
      <div className="h-full">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default GlobalLayout;
