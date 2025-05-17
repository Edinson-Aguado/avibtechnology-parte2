import './Product.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faWarehouse, faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faEye, faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons'; // Corazón vacío
import { useOrder } from '../../context/OrderContext';
import { useRef, useState } from "react";
import ModalView from '../ModalView/ModalView';

export default function Product({product}) {

    const {addProduct} = useOrder();
    const [isFavorited, setIsFavorited] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const imageRef = useRef(null);


    const handleFavorite = () => {
        setIsFavorited(!isFavorited);
    };

    const handleQuickView = () => {
        setShowModal(true);
    };

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

    const animateFlyToCart = (productImageRef) => {
        const cartIcon = document.querySelector('.icon-carrito');
        const productImage = productImageRef.current;

        if (!cartIcon || !productImage) return;

        const imageRect = productImage.getBoundingClientRect();
        const cartRect = cartIcon.getBoundingClientRect();

        const clone = productImage.cloneNode(true);
        clone.style.position = 'fixed';
        clone.style.top = `${imageRect.top}px`;
        clone.style.left = `${imageRect.left}px`;
        clone.style.width = `${imageRect.width}px`;
        clone.style.height = `${imageRect.height}px`;
        clone.style.zIndex = 9999;
        clone.style.transition = 'all 0.7s ease-in-out';
        clone.style.pointerEvents = 'none';

        document.body.appendChild(clone);

        requestAnimationFrame(() => {
            clone.style.top = `${cartRect.top}px`;
            clone.style.left = `${cartRect.left}px`;
            clone.style.width = '20px';
            clone.style.height = '20px';
            clone.style.opacity = 0.2;
        });

        setTimeout(() => {
            document.body.removeChild(clone);
        }, 700);
    };

    

    return (
        <>
            <article className="card">
                
                
                <div className="card-content">

                    <div className="icon-container">
                        <FontAwesomeIcon icon={faWarehouse} />
                        <span className="badge-stock">{product.stock}</span>
                    </div>

                    <div className="card-image">
                        {
                            product?.discount > 0 && 
                            (
                                <div className={`card-desc`}>
                                    <span>{product?.discount.toFixed(0)}% OFF</span>
                                </div>
                            )
                        }
                        
                        <img 
                            src={product?.image} alt={`Imágen de ${product?.name}`} ref={imageRef} 
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

                    <div className="actions-product">
                        <button className="favorite-btn" onClick={handleFavorite}>
                            <FontAwesomeIcon icon={isFavorited ? solidHeart : regularHeart} />
                        </button>
                        <button className="view-btn" onClick={handleQuickView}>
                            <FontAwesomeIcon icon={faEye} />
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
                                $ {Math.round(product?.price * (1 - product?.discount / 100))}

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
                                animateFlyToCart(imageRef);
                            }}
                        >
                            <FontAwesomeIcon 
                                icon={faCartShopping} 
                                className='icon-cart'/>
                            <p>Añadir al carrito</p>
                        </button>
                    </div>
                    
                </div>
                {showModal && (
                    <ModalView onClose={() => setShowModal(false)} product={product}/>
                )}

            </article>
        </>
    )
}
