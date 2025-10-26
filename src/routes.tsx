import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { Home } from "./pages/Home";
import { Settings } from "./pages/Settings";
import { Responsible } from "./pages/Settings/pages/Responsible/index.tsx";
import { ChangePassword } from "./pages/Settings/pages/ChangePassword";
import { RecoverPassword } from "./pages/Settings/pages/RecoverPassword";

const appRoutes = createBrowserRouter([
 {
    path: "/",
    element: <Home />,
  },
  {
    path: "/settings",
    element: <Settings />,
    children: [
      {
        path: "responsible",
        element: <Responsible />,
      },
      {
        path: "change-password",
        element: <ChangePassword />,
      },
      {
        path: "recover-password",
        element: <RecoverPassword />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

export function Routes() {
  return <RouterProvider router={appRoutes} />;
}