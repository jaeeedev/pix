import Header from "./header/Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import AuthObserver from "../auth/AuthObserver";
import LoadingFallback from "./LoadingFallback";

const GlobalLayout = () => {
  return (
    <div className="h-screen">
      <Header />
      <div className="min-h-full">
        <Suspense fallback={<LoadingFallback />}>
          <Outlet />
        </Suspense>
      </div>
      <Footer />
      <AuthObserver />
    </div>
  );
};

export default GlobalLayout;
