import { createBrowserRouter } from "react-router-dom";
import MainPage from "./pages/main/MainPage";
import GlobalLayout from "./components/common/GlobalLayout";
import { lazy } from "react";
import GlobalModal from "./components/common/modal/GlobalModal";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";

const ProductsPage = lazy(() => import("./pages/products/ProductsPage"));
const ProductDetailPage = lazy(
  () => import("./pages/products/ProductDetailPage")
);
const AdminPage = lazy(() => import("./pages/admin/AdminPage"));
const CartPage = lazy(() => import("./pages/cart/CartPage"));
const MyPage = lazy(() => import("./pages/mypage/MyPage"));

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
        path: "/products/:id",
        element: <ProductDetailPage />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/admin",
        element: <AdminPage />,
      },
      {
        path: "/mypage",
        element: <MyPage />,
      },
      {
        path: "*",
        element: <div>잘못된 접근이에요. ㅠㅠ</div>,
      },
    ],
  },
]);

export default router;
