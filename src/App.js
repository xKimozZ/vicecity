import "./App.css";
import "./Responsivity.css";
import TheRoutes from "./Routes";
import { RouterProvider } from "react-router-dom";

function App() {
  return <RouterProvider router={TheRoutes} />;
}

export default App;
