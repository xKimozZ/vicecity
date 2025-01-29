import React, { createContext, useContext, useMemo } from 'react';
import useSelectorAbstractor from '../hooks/abstraction/useSelectorAbstractor';
import useDispatchAbstractor from '../hooks/abstraction/useDispatchAbstractor';

const ReduxAbstractorContext = createContext();

export const ReduxAbstractorProvider = ({ children }) => {
  const selectorAbstractor = useSelectorAbstractor();
  const dispatchAbstractor = useDispatchAbstractor();
  const value = useMemo(() => ({ selectorAbstractor, dispatchAbstractor }), [selectorAbstractor, dispatchAbstractor]);
  return (
    <ReduxAbstractorContext.Provider value={ value }>
      {children}
    </ReduxAbstractorContext.Provider>
  );
};

export const useReduxAbstractorContext = () => useContext(ReduxAbstractorContext);
