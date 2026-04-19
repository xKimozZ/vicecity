import { createBrowserRouter } from "react-router-dom";

// Landing pages
import Layout from "./landing/components/Layout/Layout";
import Home from "./landing/pages/Home/Home";
import Demo from "./landing/pages/Demo/Demo";
import Devlog from "./landing/pages/Devlog/Devlog";
import EntryPage from "./landing/pages/Devlog/EntryPage";
import About from "./landing/pages/About/About";
import Disclaimer from "./landing/pages/Disclaimer/Disclaimer";

// The actual Vice City app (uses Redux)
import AppWrapper from "./AppWrapper";

const TheRoutes = createBrowserRouter([
    // Landing site routes (no Redux)
    {
        path: "/",
        element: <Layout />,
        children: [
            { index: true, element: <Home /> },
            { path: "demo", element: <Demo /> },
            { path: "devlog", element: <Devlog /> },
            { path: "devlog/:slug", element: <EntryPage /> },
            { path: "about", element: <About /> },
            { path: "disclaimer", element: <Disclaimer /> },
        ],
    },
    // The actual Vice City demo (with Redux)
    {
        path: "/app",
        element: <AppWrapper />,
    },
]);

export default TheRoutes;