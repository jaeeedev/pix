import { createBrowserRouter } from "react-router-dom";
import MainPage from "./pages/main/MainPage";
import GlobalLayout from "./components/common/GlobalLayout";
import { lazy } from "react";

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
        path: "*",
        element: <div>잘못된 접근이에요. ㅠㅠ</div>,
      },
    ],
  },
]);

export default router;
