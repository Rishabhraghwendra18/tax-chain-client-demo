import { ConnectWallet } from "@thirdweb-dev/react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Citizen from "./pages/citizen/Citizen";
import Government from "./pages/government/Government";
import Constituency from "./pages/constituency/Constituency";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/citizen",
    element: <Citizen />,
  },
  {
    path: "/government",
    element: <Government />,
  },
  {
    path: "/constituency",
    element: <Constituency />,
  },
]);
export default function App() {
  return <RouterProvider router={router} />;
}
