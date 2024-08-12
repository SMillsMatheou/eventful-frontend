import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/login";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./pages/register";

const router: ReturnType<typeof createBrowserRouter> = createBrowserRouter([
  {
    children: [
      {
        path: "/login",
        element: <Login />,
        index: true,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        index: true,
        element: <div>Test index route</div>,
      },
      {
        path: "/test",
        element: <div>Test secondary route</div>,
      },
    ],
  },
  {
    path: "*",
    element: <div>404 page - TODO: Make an actual 404 page</div>,
  },
]);

export default router;
