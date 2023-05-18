import { createBrowserRouter } from "react-router-dom";
import MainPage from "./pages/main/MainPage";
import GlobalLayout from "./components/common/GlobalLayout";
import { lazy } from "react";
import GlobalModal from "./components/common/modal/GlobalModal";

const LoginPage = lazy(() => import("./pages/auth/LoginPage"));
const SignupPage = lazy(() => import("./pages/auth/SignupPage"));
const ProductsPage = lazy(() => import("./pages/products/ProductsPage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <GlobalLayout />
        <GlobalModal />
      </>
    ),
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
      {
        path: "/products",
        element: <ProductsPage />,
      },
      {
        path: "*",
        element: <div>잘못된 접근이에요. ㅠㅠ</div>,
      },
    ],
  },
]);

export default router;
