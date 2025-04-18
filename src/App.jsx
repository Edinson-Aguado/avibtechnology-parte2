import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

import Header from './Layout/Header/Header';
import Footer from './Layout/Footer/Footer';
import WhatsApp from './components/WhatsApp/WhatsApp';
import OrderModal from './Layout/OrderModal/OrderModal';

import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Contact from './pages/contact/Contact';
import AboutUs from './pages/about-us/AboutUs';
import AdminProducts from './pages/admin-products/AdminProducts';
import AdminUsers from './pages/adminUsers/AdminUsers';
import ProductDetail from './pages/productDetail/ProductDetail';
import Order from './pages/order/Order';
import { env } from './config/env.config';
import './App.css';

export default function App() {
    const [products, setProducts] = useState([]);

  // Función para obtener los productos del servidor
    async function getProducts() {
        try {
        const response = await axios.get(`${env.URL}/products`);
        setProducts(response.data);
        } catch (error) {
        console.warn(error);
        alert("Ocurrió un error al obtener los productos.");
        }
    }

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <div className="app-container">
            {/* Elementos que se muestran siempre */}
            <Header />
            <OrderModal />
            <WhatsApp />

            <main className="main-container-routes">
                <Routes>
                    
                    {/* Rutas principales */}
                    <Route path="/" element={<Home products={products} />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/Register" element={<Register />} />
                    <Route path="/Contact" element={<Contact />} />
                    <Route path="/AboutUs" element={<AboutUs />} />
                    
                    {/* RUTAS DE ADMINISTRACION */}
                    <Route 
                        path="/AdminProducts" 
                        element={<AdminProducts products={products} setProducts={setProducts} />} 
                    />
                    <Route path="/AdminUsers" element={<AdminUsers />} />
                    
                    <Route path="/ProductDetail/:id" element={<ProductDetail />} />
                    <Route path="/Order" element={<Order />} />
                    
                    {/* Ruta fallback: si no se encuentra la ruta, se puede redirigir a Home o mostrar un 404 */}
                    <Route path="*" element={<Home products={products} />} />
                </Routes>
            </main>

            <Footer />
        </div>
    );
}
