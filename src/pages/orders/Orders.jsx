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
import { formatPrice, priceFinalEnPesos, priceWithDiscountUSD } from '../../../utils/priceUtils';

export default function Orders() {
    const { cart, total, count, setTotal, setCount, cleanCart } = useOrder();
    const { user } = useUser();

    const [ordenesPendientes, setPendientes] = useState([]);
    const [ordenesPagadas, setPagadas] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [dolarValue, setDolarValue] = useState(null);

    useEffect(() => {
        if (!cart.length) return;
        const totalProductos = cart.reduce((acc, item) => acc + item.quantity, 0);
        const totalPrecio = cart.reduce((acc, item) => acc + item.quantity * priceWithDiscountUSD(item), 0);
        setTotal(+totalPrecio.toFixed(2));
        setCount(totalProductos);
        localStorage.setItem("productsInCart", JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        fetchOrders();
        getDolar();
    }, []);

    const getDolar = async () => {
        try {
            const response = await axios.get(`${env.URL_LOCAL}/dolar`);
            const dolarParsed = parseFloat(response?.data?.data?.venta);
            setDolarValue(dolarParsed);
        } catch (error) {
            console.error("Error al obtener el valor del dólar:", error);
        }
    };

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

    const generarIdUnico = (longitud = 16) => {
        const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let resultado = '';
        for (let i = 0; i < longitud; i++) {
            const indice = Math.floor(Math.random() * caracteres.length);
            resultado += caracteres[indice];
        }
        return resultado + '-' + Date.now().toString(36);
    };

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
                products: cart.map(prod => ({
                    _id: prod._id,
                    name: prod.name,
                    price: Number(prod.price), // mejor que parseFloat
                    discount: Number(prod.discount) || 0,
                    quantity: prod.quantity,
                    image: prod.image || ""
                })),
                total, // USD total
                statusOrder: "earring",
                date: Date.now(),
                dolarAtPurchase: dolarValue
            };

            await axios.post(`${env.URL_LOCAL}/orders`, ordenData, config);
            Swal.fire({
                icon: 'success',
                title: 'Orden confirmada',
                text: '¡Tu orden fue creada con éxito!',
                confirmButtonColor: '#2563eb'
            });
            fetchOrders();
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
                if (!item) return null;
                const precioUnitarioPesos = priceFinalEnPesos(item, dolarValue);
                const subtotalPesos = +(precioUnitarioPesos * item.quantity).toFixed(2);


                return (
                    <div className="order-card" key={String(item._id + generarIdUnico())}>
                        <div className="order-image">
                            <h2>
                                <NavLink to={`/ProductDetail/${item._id}`} title="Ir a la página de detalles del producto">
                                    {item.name}
                                </NavLink>
                            </h2>
                            {item.image && <img src={item.image} alt={item.name} />}
                        </div>
                        <div className="order-details">
                            <p><strong>Precio:</strong> {dolarValue ? formatPrice(precioUnitarioPesos) : "Cargando..."}</p>
                            <p><strong>Cantidad:</strong> {item.quantity}</p>
                            <p className="value">
                                <strong>Subtotal:</strong> {dolarValue ? formatPrice(subtotalPesos) : "--"}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );

    const renderOrdenes = (ordenes) => (
        ordenes.map((order) => {
            
            const totalPesos = order.products.reduce((acc, item) => {
                const precioUnitario = priceFinalEnPesos(item, dolarValue);
                return acc + precioUnitario * item.quantity;
            }, 0);

            return (
                <div key={order._id} className='order-wrapper'>
                    {renderProductos(order.products)}
                    <div className="btn-pay-order">
                        <h3>Total a pagar: <span>{formatPrice(totalPesos)}</span></h3>
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
            );
        })
    );

    return (
        <div className="orders-page">
            <h1>Mis Órdenes</h1>

            {cart.length > 0 && (
                <div className="current-cart">
                    <h2>Carrito actual (sin confirmar)</h2>
                    {renderProductos(cart)}
                    <div className="order-summary">
                        <h3>Cantidad de productos: {count}</h3>
                        <h3>Total a pagar: <span>{dolarValue ? formatPrice(cart.reduce((acc, product) => {
                            return acc + priceFinalEnPesos(product, dolarValue) * product.quantity;
                        }, 0)) : 'Cargando...'}</span>
                        </h3>
                        <div className="buttons-order">
                            <button
                                className="create-order-button"
                                onClick={handleCreateOrder}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Procesando...' : 'Confirmar orden'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="my-orders">
                <h2>Órdenes Pendientes</h2>
                {isLoading ? (
                    <LoadingOverlay isLoading={isLoading} />
                ) : ordenesPendientes.length === 0 ? (
                    <p className="empty-orders">No hay órdenes pendientes.</p>
                ) : (
                    renderOrdenes(ordenesPendientes)
                )}

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