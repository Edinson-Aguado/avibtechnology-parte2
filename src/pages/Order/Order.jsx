import { useOrder } from "../../context/OrderContext";
import './Order.css';
import { faCartShopping, faMinus, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Order() {

    const { cart, total, editQuantity, toggleCart, cleanCart} = useOrder();

    return (
        <>
            {/* <div className="order-container">
                <div className="order-container-title">
                    <h2>Mi carrito</h2>
                </div>
                
                <button 
                    className="button-close"
                    onClick={() => toggleCart()}
                    >
                    <FontAwesomeIcon icon={faXmark}/>
                </button>
                <div className="container-table">
                    <table className="order-table">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Nombre</th>
                                <th>Valor</th>
                                <th>Cantidad</th>
                                <th>Subtotal</th>
                            </tr>
                            
                        </thead>
                        <tbody>
                            {
                                cart.map(product => {
                                
                                    return (
                                        <tr key={product.id}>
                        
                                            <td>
                                                <img src={product.image} alt={product.name} />
                                            </td>
                                            <td>{ product.name }</td>
                                            <td>{ product.price.toFixed(2) }</td>
                                            <td className="quantity-container">
                                                
                                                <div className="cantidades">
                                                    
                                                    <button onClick={() => 
                                                        editQuantity(product.id, "+")} 
                                                        className="quantity-btn">
                                                        <FontAwesomeIcon icon={faPlus} />
                                                    </button>

                                                    <span className="quantity-value">{product.quantity}</span>

                                                    <button onClick={() => 
                                                        editQuantity(product.id, "-")} 
                                                        className="quantity-btn">
                                                        <FontAwesomeIcon icon={faMinus} />
                                                    </button>

                                                </div>

                                            </td>
                                            <td>{ product.quantity * product.price }</td>
                                            
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={5}>Total: $ {total}</td>
                            </tr>
                        </tfoot>
                    </table>
            
                    <div className="order-buttons">

                        <button className="button btn-finish">
                            Finalizar compra
                        </button>
                        <button 
                            className="button btn-clean"
                            onClick={() => cleanCart()}
                        >
                            Vaciar carrito
                        </button>
                    
                    </div>
                </div>
                
            </div> */}
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
                
                        <div className="order-item" key={product.id}>
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
                                            $ {product.price - (product.price * product.discount)}
                                        </>
                                    ) : (
                                        <>$ {product.price}</>
                                    )
                                }
                            </div>
                            <div className="product-quantity">
                                <button onClick={() => editQuantity(product.id, "+")}>
                                <FontAwesomeIcon icon={faPlus} />
                                </button>
                                <span>{product.quantity}</span>
                                <button onClick={() => editQuantity(product.id, "-")}>
                                <FontAwesomeIcon icon={faMinus} />
                                </button>
                            </div>
                            <div className="subtotal">
                                <h4>Subtotal</h4>
                                <p>$ { (product.price - (product.price * product.discount)) * product.quantity }</p>
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
