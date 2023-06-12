import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import GlobalStylesWrapper from './GlobalStylesWrapper';
import store from './store/store'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store} >
    <BrowserRouter>
      <GlobalStylesWrapper>
        <App />
      </GlobalStylesWrapper>
    </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
