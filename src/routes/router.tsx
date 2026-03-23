import { createBrowserRouter } from "react-router-dom";

import CatalogPage from "../pages/CatalogPage";
import CartPage from "../pages/CartPage";
import CarDetailsPage from "../pages/CarDetailsPage";
import AuthPage from "../pages/AuthPage";

import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "./ProtectedRoute";
import App from "../App";

export const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthPage />,
  },
  {
    element: (
      <>
        <App />
        <ProtectedRoute>
          <MainLayout />
        </ProtectedRoute>
      </>
    ),
    children: [
      {
        path: "/",
        element: <CatalogPage />,
      },
      {
        path: "/cars/:id",
        element: <CarDetailsPage />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
    ],
  },
]);
