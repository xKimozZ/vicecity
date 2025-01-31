import "./App.css";
import "./Responsivity.css";
import { Provider } from "react-redux";
import { TheStore } from "./store/store";
import TheRoutes from "./Routes";
import { RouterProvider } from "react-router-dom";
import { EventHandlerProvider } from "./context/EventHandlerContext";
import { ReduxAbstractorProvider } from "./context/ReduxAbstractorContext";
import BuildInfo from "./components/BuildInfo/BuildInfo";

function App() {
  return (
    <Provider store= { TheStore }>
      <ReduxAbstractorProvider>
        <EventHandlerProvider>
          <BuildInfo />
          <RouterProvider router={ TheRoutes } />
        </EventHandlerProvider>
      </ReduxAbstractorProvider>
    </Provider>
  );
}

export default App;
