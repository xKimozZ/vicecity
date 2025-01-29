import { createBrowserRouter } from "react-router";
import Frontend from "./components/Frontend/Frontend";

const TheRoutes = createBrowserRouter([
    {
        path: "/",
        element: <Frontend />,
    },
]);

export default TheRoutes;