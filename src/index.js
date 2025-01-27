import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './assets/globals.css'
import { Provider } from 'react-redux';
import { store } from './store/store'
import { EventHandlerProvider } from './context/EventHandlerContext';
import { ReduxAbstractorProvider } from './context/ReduxAbstractorContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ReduxAbstractorProvider>
        <EventHandlerProvider>
          <App />
        </EventHandlerProvider>
      </ReduxAbstractorProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
