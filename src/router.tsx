import { createBrowserRouter } from "react-router-dom";
import MainPage from "./pages/main/MainPage";
import GlobalLayout from "./components/common/GlobalLayout";
import { lazy } from "react";

const LoginPage = lazy(() => import("./pages/auth/LoginPage"));
const SignupPage = lazy(() => import("./pages/auth/SignupPage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <GlobalLayout />,
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
        path: "*",
        element: <div>잘못된 접근이에요. ㅠㅠ</div>,
      },
    ],
  },
]);

export default router;
