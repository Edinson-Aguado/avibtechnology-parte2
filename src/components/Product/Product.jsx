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
            <article className="card" key={product?.id}>
                <div className="card-content">

                    <div className="card-image">
                        <img 
                            src={product.image} alt="Imágen Cámara H1C" 
                        />
                    </div>

                    <div className={`card-status ${getStatus(product?.status)}`}>
                        {product?.status}
                    </div>
                    <div className="btn-product ">

                        <Link 
                            className='btn card-buy'
                            title='Comprar producto'
                            to={`/ProductDetail/${product.id}`}>
                            Comprar
                        </Link>
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
                            to={`/ProductDetail/${product.id}`}>
                            {product.name}
                        </Link>

                    </h3>
                    <div className="card-price">
                        <span className="peso-signal">
                            $
                        </span>
                        {product?.price}
                    </div>
                    <div className="description">
                        {product?.description}
                    </div>
                    <div className="agregar-carrito">
                        <button 
                            title='Añadir al carrito' 
                            className='btn-agregar-carrito'
                            onClick={() => {
                                addProduct(product);
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
