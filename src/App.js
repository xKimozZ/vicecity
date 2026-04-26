import "./App.css";
import "./Responsivity.css";
import TheRoutes from "./Routes";
import { RouterProvider } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <>
      <Analytics />
      <RouterProvider router={TheRoutes} />
    </>
  );
}

export default App;
