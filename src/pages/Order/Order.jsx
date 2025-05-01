import { useOrder } from "../../context/OrderContext";
import './Order.css';
import { faCartShopping, faMinus, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Order() {

    const { cart, total, editQuantity, toggleCart, cleanCart} = useOrder();

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
                                            <del style={{color:"#444"}}>${product.price}</del>{" "}
                                            $ {Math.round(product?.price * (1 - product?.discount / 100))}
                                        </>
                                    ) : (
                                        <>$ {product.price}</>
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
                                <p>$ { Math.round((product.price * (1 - product.discount / 100)) * product.quantity) }</p>

                            </div>
                        </div>
                    ))
                )}
                
                <div className="order-summary">
                    
                    <p>Envíos<br /><small>Los pedidos superiores a U$D 300 tienen envío GRATIS</small></p>
                    <h3>Total: ${total}</h3>
                    <div className="order-buttons">
                        <button className="buy-button">Comprar</button>
                        <button 
                            className="button btn-clean"
                            onClick={() => cleanCart()}
                        >
                            Vaciar
                        </button>
                    </div>
                    
                </div>
            </div>

        </>
    );
    
}
