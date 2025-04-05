import OtroTitle from "../../components/Title/OtroTitle";
import { useOrder } from "../../context/OrderContext";
import './Order.css';
import { faMinus, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Order() {

    const { cart, total, editQuantity, toggleCart, cleanCart} = useOrder();

    return (
        <>
            <OtroTitle
                titulo="Carrito de compras de Posteos"
            />
    
            <div className="order-container">
                <button 
                    className="button-close"
                    onClick={() => toggleCart()}
                    >
                    <FontAwesomeIcon icon={faXmark}/>
                </button>
                <table className="order-table">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Nombre</th>
                            <th>Precio</th>
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
                                        <td>{ product.price }</td>
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
        </>
    );
    
}
