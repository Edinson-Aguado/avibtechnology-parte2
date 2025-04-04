import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Layout/Header/Header';
import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import Contact from './pages/Contact/Contact';
import AboutUs from './pages/About-us/AboutUs';
import AdminProducts from './pages/Admin-products/AdminProducts';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Footer from './Layout/Footer/Footer';
import WhatsApp from './components/WhatsApp/WhatsApp';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Order from './pages/Order/Order';
import OrderSidebar from './Layout/OrderSideBar/OrderSideBar';

const URL = 'https://67cb833a3395520e6af589db.mockapi.io';

export default function App() {

    const [products, setProducts] = useState([]);

    //Funcion para obtener lso productos del servidor
    async function getProducts() {
        
        // PETICION ASINCRONA
        try {

        const response = await axios.get(`${URL}/products`);
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
        <WhatsApp />
        <Header />
        <OrderSidebar />

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

        </Routes>

        <Footer />

        </>
    )
}
