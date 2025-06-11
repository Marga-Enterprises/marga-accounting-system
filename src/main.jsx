// react
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// global css
import './index.css';

// app.jsx
import App from './App.jsx';

// redux
import { Provider } from 'react-redux';
import store from '@redux/store.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
