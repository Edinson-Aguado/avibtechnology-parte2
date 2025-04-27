import './Product.css';
import { Link } from 'react-router-dom';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useOrder } from '../../context/OrderContext';

export default function Product({product}) {

    const {addProduct} = useOrder();

    function getStatus(status) {
        if (status.toLowerCase() === "nuevo") {
            return "card-status"
        } else {
            if (status.toLowerCase() === "regular") {
                return "card-regular"
            } else {
                return "card-prox"
            }
        }
    }
    

    return (
        <>
            <article className="card">
                <div className="card-content">

                    <div className="card-image">
                        {
                            product?.discount > 0 && 
                            (
                                <div className={`card-desc`}>
                                    <span>{(product?.discount*100).toFixed(0)}% OFF</span>
                                </div>
                            )
                        }
                        
                        <img 
                            src={product?.image} alt="Imágen Cámara H1C" 
                        />
                    </div>

                    <div className={`card-status ${getStatus(product?.status)}`}>
                        {product?.status}
                    </div>
                    
                    <div className="btn-product ">

                        {product?._id && (
                            <Link 
                                className='btn card-buy'
                                title='Comprar producto'
                                to={`/ProductDetail/${product?._id}`}>
                                Comprar
                            </Link>
                        )}

                        <button 
                            title='Ver más detalles' 
                            className='btn btn-ver-detalles'>
                            
                            <a 
                                target='_blank'
                                title='Ir a la página oficial de la marca' 
                                href="https://www.ezviz.com/">
                                Página oficial
                            </a>

                        </button>

                    </div>

                </div>
                <div className="card-info">
                    
                    <h3 className="card-title">

                        <Link 
                            to={`/ProductDetail/${product?._id}`}>
                            {product?.name}
                        </Link>

                    </h3>
                    <div className="card-price">
                        
                        {
                            product?.discount > 0 ? (
                                <>
                                    <del style={{color:"#7a8a99"}}>$ {product?.price}</del>{" "}
                                    $ {product?.price - (product?.price * product?.discount)}
                                </>
                            ) : (
                                <>$ {product?.price}</>
                            )
                        }
                        
                    </div>
                    <div className="agregar-carrito">
                        <button 
                            title='Añadir al carrito' 
                            className='btn-agregar-carrito'
                            onClick={() => {
                                addProduct(product, 1);
                            }}
                        >
                            <FontAwesomeIcon 
                                icon={faCartShopping} 
                                className='icon-cart'/>
                            <p>Añadir al carrito</p>
                        </button>
                    </div>
                    
                </div>
            </article>
        </>
    )
}
