import { ConnectWallet } from "@thirdweb-dev/react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Citizen from "./pages/citizen/Citizen";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Home />}>
      <Route index path="/citizen" element={<Citizen />} />
      {/* <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} /> */}
    </Route>
  )
);

export default function App() {
  return (
    <div className="container">
      {/* <Renderer /> */}
      {/* <Navigation></Navigation> */}
      <RouterProvider router={router} />
    </div>
  );
}
// function Renderer(params) {
//   return (
//     <Router>
//       <div className="app">
//         <Navbar />
//         <Routes>
//           <Route path="/" element={<Home />} />
//           {/* <Route path="/about" element={<About />} /> */}
//         </Routes>
//       </div>
//     </Router>
//   );
// }
