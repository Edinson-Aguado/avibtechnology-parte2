import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

import MainLayout from './Layout/MainLayout/MainLayout';
import AuthLayout from './Layout/AuthLayout/AuthLayout';

import Login from './pages/login/Login';
import Register from './pages/register/Register';

import Home from './pages/home/Home';
import Contact from './pages/contact/Contact';
import AboutUs from './pages/about-us/AboutUs';
import AdminProducts from './pages/adminProducts/AdminProducts';
import AdminUsers from './pages/adminUsers/AdminUsers';
import ProductDetail from './pages/productDetail/ProductDetail';
import Order from './pages/order/Order';
import { env } from './config/env.config';
import AdminGuard from './services/guard/AdminGuard';
import Header from './Layout/Header/Header';

export default function App() {
    const [products, setProducts] = useState([]);

    async function getProducts() {
        console.log("getProducts: ejecutándose");
        try {
            const response = await axios.get(`${env.URL_LOCAL}/products`);
            setProducts(response.data.products);
        } catch (error) {
            console.warn(error);
            alert("Ocurrió un error al obtener los productos.");
        }
    }

    function useWindowWidth() {
        const [width, setWidth] = useState(window.innerWidth);
        useEffect(() => {
            const handleResize = () => setWidth(window.innerWidth);
            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }, []);
        return width;
    }

    useEffect(() => {
        console.log("useEffect: llamando a getProducts");
        getProducts();
    }, []);

    return (
        <Routes>

            {/* Layout para páginas con header/footer */}
            <Route element={<MainLayout useWindowWidth={useWindowWidth} />}>
                {/* Rutas principales */}
                <Route path='/' element={<Home products={products} />} />
                <Route path="/Register" element={<Register />} />
                <Route path="/Contact" element={<Contact />} />
                <Route path="/AboutUs" element={<AboutUs />} />
                <Route path="/ProductDetail/:id" element={<ProductDetail />} />
                <Route path="/Order" element={<Order />} />
                <Route path="*" element={<Home products={products} />} />

                {/* Rutas de ADMINISTRACION */}

                <Route path="/AdminProducts" element={
                    <AdminGuard>
                        <AdminProducts products={products} setProducts={setProducts} getProducts={getProducts}/>
                    </AdminGuard>  
                }/>
                <Route path="/AdminUsers" element={
                    <AdminGuard>
                        <AdminUsers />
                    </AdminGuard>
                } />
            </Route>

            {/* Layout exclusivo para login*/}
            <Route element={<AuthLayout />}>
                <Route path="/Login" element={<Login />} />
            </Route>
        </Routes>
    );
}

