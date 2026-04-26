import { useEffect } from "react";
import { Provider } from "react-redux";
import { TheStore } from "./store/store";
import { EventHandlerProvider } from "./context/EventHandlerContext";
import { ReduxAbstractorProvider } from "./context/ReduxAbstractorContext";
import Frontend from "./components/Frontend/Frontend";
import BuildInfo from "./components/BuildInfo/BuildInfo";
import mouseCursor from "./assets/images/mouse64.png";

/**
 * Wrapper for the Vice City demo app.
 * Provides Redux store and context providers separately from the landing site.
 */
const AppWrapper = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.body.style.userSelect = "none";
    document.title = "Vice City PS2 Menu";
    document.body.style.cursor = `url(${mouseCursor}), auto`;
    return () => {
      document.body.style.overflow = "";
      document.body.style.userSelect = "";
      document.body.style.cursor = "";
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
