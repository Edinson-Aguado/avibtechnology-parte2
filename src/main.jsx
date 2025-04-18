import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from "react-router-dom";
import OrderProvider from './context/OrderContext.jsx';
import UserProvider from './context/UserContext.jsx';
import ScrollToTop from './components/ScrollToTop/ScrollToTop.jsx';

createRoot(document.getElementById('root')).render(
  
  <BrowserRouter>
  {/* CONTEXTO */}
    <UserProvider>
      {/* OTRO CONTEXTO */}
      <OrderProvider>

          <ScrollToTop/>
          <StrictMode>
            <App />
          </StrictMode>
        
      </OrderProvider>
    </UserProvider>
  </BrowserRouter>
  
)
