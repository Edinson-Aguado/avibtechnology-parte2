import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from "react-router-dom";
import OrderProvider from './context/OrderContext.jsx';
import ScrollToTop from './components/ScrollToTop/ScrollToTop.jsx';

createRoot(document.getElementById('root')).render(
  
  <OrderProvider>

    <BrowserRouter>
      <ScrollToTop/>
      <StrictMode>
        <App />
      </StrictMode>
    </BrowserRouter>
    
  </OrderProvider>

  
)
