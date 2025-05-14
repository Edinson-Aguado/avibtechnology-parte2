import { useNavigate, useParams } from "react-router-dom";
import './ProductDetail.css';
import axios from "axios";
import { useEffect, useState } from "react";
import { env } from "../../config/env.config";
import Swal from "sweetalert2";
import { useOrder } from "../../context/OrderContext";
import { faArrowLeft, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ProductDetail() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [product, setProduct] = useState();
    const { addProduct, cantidadOrder, setCantidad } = useOrder();

    useEffect(() => {
        const getProductDetail = async () => {
        try {
            const { data } = await axios.get(`${env.URL_LOCAL}/products/${id}`);
            setProduct(data.product);
        } catch (error) {
            console.error(error);
            Swal.fire("Error", "Error al obtener los productos", "error");
        }
        };
        getProductDetail();
    }, [id]);

    const formatPrice = (value) => {
        return new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS', // o USD, EUR, etc.
            minimumFractionDigits: 2
        }).format(value);
    };

    return (
        <div className="product-detail-container">
            <button className="btn-back" onClick={() => navigate(-1)}>
                <FontAwesomeIcon icon={faArrowLeft} className="icon" />
                Volver
            </button>

            <div className="product-main">
                <div className="product-image-section">
                    <img src={product?.image} alt={product?.name} />
                    <span className="category">{product?.category ?? 'Sin categoría'}</span>
                </div>

                <div className="product-info-section">
                    <h1>{product?.name}</h1>
                    {
                        product?.discount > 0 ? (
                            <p className="price">{formatPrice(product?.price * (1 - product.discount / 100))}</p>
                        ) : (
                            <p className="price">{formatPrice(product?.price)}</p>
                        )
                    }
                    
                    <p className="description">{product?.description}</p>

                    <form className="purchase-form">
                        <div className="field-group">
                            <label htmlFor="cantidadOrder">Cantidad</label>
                            <input
                                type="number"
                                id="cantidadOrder"
                                min="1"
                                max="36"
                                value={cantidadOrder ?? 1}
                                onChange={(e) => setCantidad(Number(e.target.value))}
                            />
                        </div>

                        <div className="field-group">
                            <label htmlFor="code">Código promocional</label>
                            <input type="text" id="code" placeholder="Ej. AVIB10" />
                        </div>

                        <div className="action-buttons">
                            <button
                                type="button"
                                className="add-to-cart"
                                onClick={() => addProduct(product, null)}
                            >
                                <FontAwesomeIcon icon={faCartShopping} className="icon" />
                                Añadir al carrito
                            </button>
                            <button type="button" className="buy-now">
                                Comprar ahora
                            </button>
                        </div>

                    </form>
                </div>
            </div>

            <div className="product-extra">
                <h2>Detalles de {product?.name}</h2>
                <p>{product?.description ?? "Descripción no disponible."}</p>

                <div className="datasheet">
                    <h3>Sitio oficial</h3>
                    <a href="https://www.ezviz.com" target="_blank" rel="noopener noreferrer">
                        Datasheet oficial
                    </a>
                </div>
            </div>
        </div>
    );
}
