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
    const {id} = useParams(); // Recibimos los datos del id.
    const [product, setProduct] = useState();

    const {addProduct, cantidadOrder, setCantidad} = useOrder();

    useEffect(() => {
        getProductDetail();
    }, [id]);

    //Otro tipo de definicion de una funcion:
    const getProductDetail = async() => {

        try {

            const response = await axios.get(`${env.URL_LOCAL}/products/${id}`);
            
            setProduct(response.data.product);
            
        } catch (error) {
            console.log(error);
            Swal.fire("Error", "Error al obtener los productos", "error");
        }
    };

    return (
        <>
            
            <div className="main-container-detail-product">
                <button className="btn-back" onClick={() => navigate(-1)}>
                    <FontAwesomeIcon icon={faArrowLeft} className="icon-back"/>
                    Volver
                </button>
                <div className="part-1">
                    {/* IMAGE */}
                    <div className="image-product">
                        <img src={product?.image} alt={product?.name} />

                        {/* CATEGORY */}
                        <div className="category">
                            <span>{product?.category ?? 'Categoria no disponible'}</span>
                        </div>
                    </div>
                    <div className="detail-product">
                        <div className="about-product-buy">
                            
                            
                            {/* NAME */}
                            <h3>{product?.name}</h3>
                            {/* PRICE */}
                            <div className="price">
                                <p>$ {product?.price}</p>
                            </div>
                            {/* DESCRIPTION */}
                            <div className="about-product">
                                <p>{product?.description}</p>
                            </div>
                            {/* ACTIONS */}
                            <div className="add-info">
                                <form action="">
                                    <label htmlFor="cantidadOrder">Cantidad</label>
                                    <input
                                        type="number"
                                        id="cantidadOrder"
                                        name="cantidadOrder"
                                        min="1"
                                        max="36"
                                        step="1"
                                        value={cantidadOrder ?? 1}
                                        onChange={(e) => setCantidad(Number(e.target.value))}
                                    />
                                    <input 
                                        type="text"
                                        id="code-promotional"
                                        placeholder="Código promocional"
                                    />
                                    <div className="btns-buy">
                                        <button 
                                            className="add-btn" 
                                            type="button"
                                            onClick={() => addProduct(product, null)}>
                                                <FontAwesomeIcon 
                                                    icon={faCartShopping} 
                                                    className='icon-cart'/>
                                            Añadir al carrito
                                        </button>

                                        <button type="button"
                                        >
                                            Comprar ahora
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                {/* PRODUCT DETAILS */}
                <div className="description-product">
                    <h3>Detalles de {product?.name}</h3>
                    <p>
                        {product?.description ?? 'Descripción del producto no disponible.'}
                    </p>
                    <div className="datasheet">

                        <h3>SITIO OFICIAL</h3>
                        <a href={"https://www.ezviz.com"} target="_blank" rel="noopener noreferrer">
                            Datasheet oficial
                        </a>
                        {/* NOOPENER: Evita que la nueva página tenga acceso a la propiedad window.opener, mejorando la seguridad y el rendimiento. */}

                        {/* NOOREFERRER: Evite que la nueva página reciba información sobre la página de origen. */}

                    </div>
                </div>
            </div>
        </>
    );
}
