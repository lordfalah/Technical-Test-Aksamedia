import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootErrorBoundary from "./components/Errors/ErrorBoundary.tsx";
import PageLogin from "./pages/Login.tsx";
import RootLayout from "./pages/RootLayout.tsx";
import PageDashboard from "./pages/dashboard/Index.tsx";
import "./index.css";
import PageProfile from "./pages/dashboard/Profile.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    element: <RootLayout />,
    errorElement: <RootErrorBoundary />,

    children: [
      {
        id: "login",
        index: true,
        element: <PageLogin />,
      },

      {
        id: "parent_dashboard",
        path: "/dashboard",
        element: <ProtectedRoute />,
        children: [
          {
            id: "dashboard",
            index: true,
            element: <PageDashboard />,
          },

          {
            id: "profile",
            path: "profile",
            element: <PageProfile />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
