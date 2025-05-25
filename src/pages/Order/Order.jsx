import axios from "axios";
import { useOrder } from "../../context/OrderContext";
import { useUser } from "../../context/UserContext";
import './Order.css';
import { faCartShopping, faMinus, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { env } from "../../config/env.config";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingOverlay from "../../components/LoadingOverlay/LoadingOverlay";
import { formatPrice, priceFinalEnPesos, priceWithDiscount } from "../../../utils/priceUtils";

export default function Order() {
    const { cart, total, editQuantity, toggleCart, cleanCart } = useOrder();
    const { user } = useUser();
    const [isLoading, setIsLoading] = useState(false);
    const [dolarValue, setDolarValue] = useState(null);
    const navigate = useNavigate();

    const handleCreateOrder = async () => {
        if (!user || cart.length === 0) {
            return Swal.fire({
                icon: 'warning',
                title: 'Datos faltantes',
                text: 'Inicia sesión y agrega productos antes de confirmar tu orden.',
                confirmButtonColor: '#f59e0b'
            });
        }

        try {
            setIsLoading(true);
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
                    price: prod.price,
                    discount: prod.discount || 0,
                    quantity: prod.quantity,
                    image: prod.image || ""
                })),
                total,
                statusOrder: "earring",
                date: Date.now()
            };

            await axios.post(`${env.URL_LOCAL}/orders`, ordenData, config);

            cleanCart();
            toggleCart();
            Swal.fire({
                icon: 'success',
                title: 'Orden confirmada',
                text: '¡Tu orden fue creada con éxito!',
                confirmButtonColor: '#2563eb'
            }).then(() => {
                navigate('/Orders');
            });
        } catch (err) {
            console.error("Error al crear orden:", err);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Hubo un error al confirmar la orden. Intenta nuevamente.',
                confirmButtonColor: '#ef4444'
            });
        } finally {
            setIsLoading(false);
        }
    };

    const getDolar = async () => {
        try {
            const response = await axios.get(`${env.URL_LOCAL}/dolar`);
            const dolarParsed = parseFloat(response?.data?.data?.venta);
            setDolarValue(dolarParsed);
        } catch (error) {
            console.error("Error al obtener el valor del dólar:", error);
        }
    };

    useEffect(() => {
        getDolar();
    }, []);

    const totalEnPesos = cart.reduce((acc, product) => {
        return acc + priceFinalEnPesos(product, dolarValue) * product.quantity;
    }, 0);

    return isLoading ? (
        <LoadingOverlay isLoading={isLoading} />
    ) : (
        <div className="order-items">
            <div className="order-container-title">
                <span>Mis compras</span>
            </div>

            <button className="button-close" onClick={toggleCart}>
                <FontAwesomeIcon icon={faXmark} />
            </button>

            {cart.length === 0 ? (
                <div className="empty-cart">
                    <FontAwesomeIcon icon={faCartShopping} size="4x" />
                    <p>Tu carrito está vacío...</p>
                </div>
            ) : (
                cart.map((product) => {
                    const precioFinalUnitario = priceFinalEnPesos(product, dolarValue);

                    return (
                        <div className="order-item" key={product._id}>
                            <div className="product-image" style={{ backgroundColor: "#e0f7ff" }}>
                                <img src={product.image} alt={product.name} />
                            </div>

                            <div className="product-info">
                                <h4>{product.name}</h4>
                                <p>{product?.description || 'Descripción'}</p>

                                {dolarValue ? (
                                    product.discount > 0 ? (
                                        <>
                                            <del style={{ color: "#444" }}>
                                                {formatPrice(product.price * dolarValue)}
                                            </del>{" "}
                                            <span>{formatPrice(priceFinalEnPesos(product, dolarValue))}</span>
                                        </>
                                    ) : (
                                        <span>{formatPrice(product.price * dolarValue)}</span>
                                    )
                                ) : (
                                    <span>Cargando precio...</span>
                                )}
                            </div>

                            <div className="product-quantity">
                                <button onClick={() => editQuantity(product._id, "+")}>
                                    <FontAwesomeIcon icon={faPlus} />
                                </button>
                                <span>{product.quantity}</span>
                                <button onClick={() => editQuantity(product._id, "-")}>
                                    <FontAwesomeIcon icon={faMinus} />
                                </button>
                            </div>

                            <div className="subtotal">
                                <h4>Subtotal</h4>
                                {dolarValue ? (
                                    <p>{formatPrice(precioFinalUnitario * product.quantity)}</p>
                                ) : (
                                    <p>--</p>
                                )}
                            </div>
                        </div>
                    );
                })
            )}

            <div className="order-summary">
                <p>
                    Envíos
                    <br />
                    <small>Los pedidos superiores a U$D 300 tienen envío GRATIS</small>
                </p>

                <h3>Total: {dolarValue ? formatPrice(totalEnPesos) : "Calculando..."}</h3>

                <div className="order-buttons">
                    <button className="buy-button" onClick={handleCreateOrder}>
                        Confirmar
                    </button>
                    <button className="button btn-clean" onClick={cleanCart}>
                        Vaciar
                    </button>
                </div>
            </div>
        </div>
    );
}
