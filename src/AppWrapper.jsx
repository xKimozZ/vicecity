import { useEffect } from "react";
import { Provider } from "react-redux";
import { TheStore } from "./store/store";
import { EventHandlerProvider } from "./context/EventHandlerContext";
import { ReduxAbstractorProvider } from "./context/ReduxAbstractorContext";
import Frontend from "./components/Frontend/Frontend";
import BuildInfo from "./components/BuildInfo/BuildInfo";

/**
 * Wrapper for the Vice City demo app.
 * Provides Redux store and context providers separately from the landing site.
 */
const AppWrapper = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <Provider store={TheStore}>
      <ReduxAbstractorProvider>
        <EventHandlerProvider>
          <BuildInfo />
          <Frontend />
        </EventHandlerProvider>
      </ReduxAbstractorProvider>
    </Provider>
  );
};

export default AppWrapper;
