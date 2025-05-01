// import { env } from '../../config/env.config';
import './ProductTable.css';

export default function ProductTable({product, deleteProduct, fnEditProduct}) {

    console.log("AQUIIIIII: ", product.image);
    

    return (
        <>
            {/* CUERPO DE LA TABLA */}
            <tr> 
                
                <td className="image-cell">
                    <img src={`${product.image}`} alt={`Imagen de ${product.name}`} className="table-image"/>
                </td>
                <td className="product-cell">
                    {product.name}
                </td>
                <td className="description-cell">
                    <div className="description-table">
                        {product.description}
                    </div>
                </td>
                <td 
                    className="price-cell">
                    <span>$</span> <strong>{product.price ? product.price : "-"}</strong>
                </td>
                <td 
                    className="product-cell">
                    {product.discount > 0 ? product.discount+"%" : "-"}
                </td>
                <td 
                    className="product-cell">
                    <span>{product.stock ? product.stock : "-"}</span>
                </td>
                <td className="actions-cell">
                    <div className="icon-container">
                        <button 
                            className="btn btn-edit" 
                            title="Editar elemento"
                            onClick={() => fnEditProduct(product)}>
                            <i className="fa-solid fa-pencil"></i>
                        </button>

                        <button 
                            className="btn btn-danger" 
                            title="Eliminar elemento"
                            onClick={() => deleteProduct(product._id)}>
                            <i className="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        </>
    )
}
