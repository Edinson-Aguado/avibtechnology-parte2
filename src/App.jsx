import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Layout/Header/Header';
import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import Contact from './pages/Contact/Contact';
import AboutUs from './pages/About-us/AboutUs';
import AdminProducts from './pages/Admin-products/AdminProducts';
import AdminUsers from './pages/AdminUsers/AdminUsers';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Footer from './Layout/Footer/Footer';
import WhatsApp from './components/WhatsApp/WhatsApp';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Order from './pages/Order/Order';
import OrderSidebar from './Layout/OrderSideBar/OrderSideBar';
import { env } from './config/env.config';

export default function App() {

    const [products, setProducts] = useState([]);

    //Funcion para obtener lso productos del servidor
    async function getProducts() {
        
        // PETICION ASINCRONA
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
    <>
        <div className="app-container">
            <WhatsApp />
            <Header />
            <OrderSidebar />

            <main className="main-container-routes">
                <Routes>
                    
                    <Route 
                        path="/" 
                        element={
                            <Home 
                                products={products}
                            />} 
                    />
                    
                    <Route path='/ProductDetail/:id' element={<ProductDetail/>} />
                    
                    <Route path="/pages/Register/Register" element={<Register />} />
                    
                    <Route path="/pages/Contact/Contact" element={<Contact />} />
                    
                    <Route path="/pages/About-us/AboutUs" element={<AboutUs />} />
                    
                    <Route path="/pages/Admin-products" element={
                    
                    <AdminProducts 
                        products={products}
                        setProducts={setProducts}
                    />}
                    />
                    
                    <Route path="/pages/Order/Order" element={<Order />} />

                    <Route path="/pages/AdminUsers/AdminUsers" element={<AdminUsers />} />

                </Routes>
            </main>

            <Footer />
        </div>
        

        </>
    )
}
