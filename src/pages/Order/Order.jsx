import axios from "axios";
import { useOrder } from "../../context/OrderContext";
import { useUser } from "../../context/UserContext";
import './Order.css';
import { faCartShopping, faMinus, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { env } from "../../config/env.config";
import Swal from "sweetalert2";

export default function Order() {

    const { cart, total, editQuantity, toggleCart, cleanCart} = useOrder();
    const { user } = useUser();

    const formatPrice = (value) => {
        return new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS',
            minimumFractionDigits: 2
        }).format(value);
    };


    const handleCreateOrder = async () => {
        try {
            const token = user?.token || localStorage.getItem("token");

            const ordenData = {
                productos: cart.map(prod => ({
                    productId: prod._id,
                    name: prod.name,
                    price: prod.price,
                    quantity: prod.quantity
                })),
                total
            };

            await axios.post(`${env.URL_LOCAL}/orders`, ordenData, {
                Authorization: `Bearer ${token}`
            });
            cleanCart();
            Swal.fire({
                icon: 'success',
                title: 'Orden confirmada',
                text: '¡Tu orden fue creada con éxito!',
                confirmButtonColor: '#2563eb'
            });

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

    return (
        <>
            <div className="order-items">
                <div className="order-container-title">
                    <span>Mis compras</span>
                </div>
                <button 
                    className="button-close"
                    onClick={() => toggleCart()}
                    >
                    <FontAwesomeIcon icon={faXmark}/>
                </button>
                

                {cart.length === 0 ? (
                    <div className="empty-cart">
                        <FontAwesomeIcon icon={faCartShopping} size="4x" />
                        <p>Tu carrito está vacío...</p>
                    </div>
                ) : (
                    cart.map((product) => (
                
                        <div className="order-item" key={product._id}>
                            <div className="product-image" style={{ backgroundColor: "#e0f7ff" }}>
                                <img src={product.image} alt={product.name} />
                            </div>
                            <div className="product-info">
                                <h4>{product.name}</h4>
                                <p>{product?.description || 'Descripción'}</p>

                                {
                                    product?.discount > 0 ? (
                                        <>
                                        <del style={{ color: "#444" }}>{formatPrice(product.price)}</del>{" "}
                                        {formatPrice(product.price * (1 - product.discount / 100))}
                                        </>
                                    ) : (
                                        <>{formatPrice(product.price)}</>
                                    )
                                }

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
                                <p>{formatPrice(product.price * (1 - product.discount / 100) * product.quantity)}</p>

                            </div>
                        </div>
                    ))
                )}
                
                <div className="order-summary">
                    
                    <p>Envíos<br /><small>Los pedidos superiores a U$D 300 tienen envío GRATIS</small></p>
                    <h3>Total: {formatPrice(total)}</h3>
                    <div className="order-buttons">
                        <button className="buy-button" onClick={handleCreateOrder}>Confirmar Orden</button>
                        <button 
                            className="button btn-clean"
                            onClick={() => cleanCart()}
                        >
                            Vaciar Orden
                        </button>
                    </div>
                    
                </div>
            </div>

        </>
    );
    
}
