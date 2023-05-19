import Header from "./header/Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import AuthObserver from "../auth/AuthObserver";

const GlobalLayout = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="h-screen">
        <Header />
        <div className="h-full">
          <Outlet />
        </div>
        <Footer />
        <AuthObserver />
      </div>
    </Suspense>
  );
};

export default GlobalLayout;
