import { useEffect, useState } from 'react';
import './Orders.css';
import { useOrder } from '../../context/OrderContext';
import { useUser } from '../../context/UserContext';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { env } from '../../config/env.config';
import Swal from 'sweetalert2';
import LoadingOverlay from '../../components/LoadingOverlay/LoadingOverlay';
import { generateProformaPdf } from '../../../utils/proforma';

export default function Orders() {
    const { cart, total, count, setTotal, setCount, cleanCart } = useOrder();
    const { user } = useUser();

    const [ordenesPendientes, setPendientes] = useState([]);
    const [ordenesPagadas, setPagadas] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Recalcula total y cantidad
    useEffect(() => {
        if (!cart.length) return;
        const totalProductos = cart.reduce((acc, item) => acc + item.quantity, 0);
        const totalPrecio = cart.reduce((acc, item) => acc + item.quantity * item.price, 0);
        setCount(totalProductos);
        setTotal(totalPrecio);
        localStorage.setItem("productsInCart", JSON.stringify(cart));
    }, [cart]);


    useEffect(() => {
        fetchOrders();
    }, []);

    const formatPrice = (value) => {
        return new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS', // o USD, EUR, etc.
            minimumFractionDigits: 2
        }).format(value);
    };

    const renderOrdenes = (ordenes) => (
        ordenes.map((order) => (
            <div key={order._id} className='order-wrapper'>
                
                {renderProductos(order.products)}
                <div className="btn-pay-order">
                    <h3>Total a pagar: <span>{formatPrice(order?.total)}</span></h3>
                    <div className="buttons-order">
                        <NavLink to={`/`} className='btn-pay'>
                            Pagar orden
                        </NavLink>

                        <button
                            className="btn-download"
                            onClick={() => generateProformaPdf(order, user)}
                        >
                            Generar PDF
                        </button>
                    </div>
                    
                </div>
                <p className="order-date">Fecha: {new Date(order.date).toLocaleString()}</p>
                
            </div>
        ))
    );

    const fetchOrders = async () => {
        try {
            setIsLoading(true);
            const bearer = localStorage.getItem('token');
            const config = {
                headers: {
                        Authorization: `Bearer ${bearer}`
                    }
            };

            const res = await axios.get(`${env.URL_LOCAL}/orders`, config);
            const todas = res.data.orders;
            
            setPendientes(todas.filter(order => order.statusOrder === 'earring'));
            setPagadas(todas.filter(order => order.statusOrder === 'paid'));
        } catch (err) {
            console.log("Error al obtener órdenes:", err);
        } finally {
            setIsLoading(false);
        }
    };

    function generarIdUnico(longitud = 16) {
        const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let resultado = '';
        for (let i = 0; i < longitud; i++) {
            const indice = Math.floor(Math.random() * caracteres.length);
            resultado += caracteres[indice];
        }
        return resultado + '-' + Date.now().toString(36);
    }


    const handleCreateOrder = async () => {
        try {
            const token = user?.token || localStorage.getItem("token");
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            const ordenData = {
                userId: user?._id,
                products: cart.map(prod => (
                    {
                        _id: prod._id,                // ID real del producto
                        name: prod.name,              // Nombre en ese momento
                        price: prod.price,            // Precio original sin descuento
                        discount: prod.discount || 0, // Descuento vigente al momento de la orden
                        quantity: prod.quantity,      // Cantidad comprada
                        image: prod.image || ""       // Imagen del producto
                    }
                )),
                total,
                statusOrder: "earring",
                date: Date.now()
            };

            await axios.post(`${env.URL_LOCAL}/orders`, ordenData, config);
            Swal.fire({
                icon: 'success',
                title: 'Orden confirmada',
                text: '¡Tu orden fue creada con éxito!',
                confirmButtonColor: '#2563eb'
            });
            fetchOrders(); // Refresca las órdenes
            cleanCart();
        } catch (err) {
            console.error("Error al crear orden:", err);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Hubo un error al confirmar la orden. Intenta nuevamente.',
                confirmButtonColor: '#ef4444'
            });
        }
    };

    const renderProductos = (products) => (
        <div className="orders-list">
            {products.map((item) => {
                if (!item) return null; // Previene errores si hay algún item inválido

                const finalPrice = (item.discount > 0 ? 
                    item.price * (1 - item.discount / 100)
                    : 
                    item.price
                )

                return (
                    <div className="order-card" key={String(item._id+generarIdUnico())}>
                        <div className="order-image">
                            <h2>
                                <NavLink to={`/ProductDetail/${item._id}`} title={`Ir a la pagina de detalles del producto`}>
                                    {item.name}
                                </NavLink>
                            </h2>
                            {item.image && (
                                <img src={item.image} alt={item.name} />
                            )}
                        </div>
                        <div className="order-details">
                            <p><strong>Precio:</strong> {formatPrice(finalPrice)}</p>
                            <p><strong>Cantidad:</strong> {item.quantity}</p>
                            <p className="value">
                                <strong>Subtotal:</strong> {formatPrice(finalPrice * item.quantity)}
                            </p>
                            
                        </div>
                    </div>
                );
            })}
        </div>
    );

    return (
        <div className="orders-page">
            <h1>Mis Órdenes</h1>

            {/* Carrito actual */}
            {cart.length > 0 && (
                <div className="current-cart">
                    <h2>Carrito actual (sin confirmar)</h2>
                    {renderProductos(cart)}
                    <div className="order-summary">
                        <h3>Cantidad de productos: {count}</h3>
                        <h3>Total a pagar: <span>{formatPrice(total)}</span></h3>
                        <div className="buttons-order">
                            <button
                                className="create-order-button"
                                onClick={handleCreateOrder}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Procesando...' : 'Confirmar orden'}
                            </button>

                            <button
                                className="create-order-button createPDF-order-button"
                                onClick={generateProformaPdf}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Procesando...' : 'Generar PDF'}
                            </button>
                        </div>
                        

                    </div>
                </div>
            )}
            
            <div className="my-orders">

                {/* Órdenes pendientes */}
                <h2>Órdenes Pendientes</h2>                

                {isLoading ? (
                    <LoadingOverlay isLoading={isLoading} />
                ) : ordenesPendientes.length === 0 ? (
                    <p className="empty-orders">No hay órdenes pendientes.</p>
                ) : (
                    renderOrdenes(ordenesPendientes)
                )}

                {/* Órdenes pagadas */}
                <h2>Órdenes Pagadas</h2>

                {isLoading ? (
                    <LoadingOverlay isLoading={isLoading} />
                ) : ordenesPagadas.length === 0 ? (
                    <p className="empty-orders">Aún no hay órdenes pagadas.</p>
                ) : (
                    renderOrdenes(ordenesPagadas)
                )}
            </div>
        </div>
    );
}
