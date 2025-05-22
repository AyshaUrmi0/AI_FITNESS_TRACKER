import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Chat from "./pages/Chat";
import Workout from "./pages/Workout";
import Diet from "./pages/diet";
import Home from "./pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/chat",
        element: <Chat />,
      },
      {
        path: "/workout", 
        element: <Workout />,
      },
      {
        path: "/diet",
        element: <Diet />,
      }
    ]
  }
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
