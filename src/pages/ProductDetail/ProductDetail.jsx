import { useParams } from "react-router-dom";
import './ProductDetail.css';
import axios from "axios";
import { useEffect, useState } from "react";
import { env } from "../../config/env.config";
import Swal from "sweetalert2";
import Loading from "../../components/Loading/Loading";
import { useOrder } from "../../context/OrderContext";

export default function ProductDetail() {
    
    // const navigate = useNavigate();
    const {id} = useParams(); // Recibimos los datos del id.
    const [product, setProduct] = useState(null);

    const {addProduct, cantidadOrder, setCantidad} = useOrder();

    useEffect(() => {
        getProductDetail();
    }, []);

    //Otro tipo de definicion de una funcion:
    const getProductDetail = async() => {

        try {

            const response = await axios.get(`${env.URL}/products/${id}`);
            setProduct(response.data);
            
        } catch (error) {
            console.log(error);
            Swal.fire("Error", "Error al obtener los productos", "error");
        }
    };

    if (!product) {
        return <Loading/>
    }

    return (
        <div className="main-container-detail-product">

            <div className="part-1">
                {/* IMAGE */}
                <div className="image-product">
                    <img src={product?.image} alt={product?.name} />
                </div>
                <div className="detail-product">
                    <div className="about-product-buy">
                        
                        {/* CATEGORY */}
                        <div className="category">
                            <span>{product?.category ?? 'Categoria no disponible'}</span>
                        </div>
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
                                    value={cantidadOrder}
                                    onChange={(e) => setCantidad(Number(e.target.value))}
                                />
                                <div className="btns-buy">
                                    <button 
                                        className="add-btn" 
                                        type="button"
                                        onClick={() => addProduct(product)}>
                                        Añadir al carrito
                                    </button>

                                    <button type="submit"
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
    );
}
