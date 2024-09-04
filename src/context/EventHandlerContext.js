import React, { createContext, useContext } from 'react';
import useEventHandler from '../hooks/useEventHandler';

const EventHandlerContext = createContext();

export const EventHandlerProvider = ({ children }) => {
  const eventHandler = useEventHandler();
  return (
    <EventHandlerContext.Provider value={eventHandler}>
      {children}
    </EventHandlerContext.Provider>
  );
};

export const useEventHandlerContext = () => useContext(EventHandlerContext);
