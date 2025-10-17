import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";

const authRoutes = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <Navigate to="/login" replace />,
  },
]);

const appRoutes = createBrowserRouter([
 {
    path: "/",
    element: <Home />,
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

export function Routes() {
  // const { isAuthenticated } = useAuth();
  const isAuthenticated = true;

  return <RouterProvider router={isAuthenticated ? appRoutes : authRoutes} />;
}