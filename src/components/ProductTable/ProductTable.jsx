import './ProductTable.css';

export default function ProductTable({product, deleteProduct, fnEditProduct}) {
    return (
        <>
            {/* CUERPO DE LA TABLA */}
            <tr> 
                <td className="image-cell">
                    <img src={product.image} alt="Imagen de la camara H1C" className="table-image"/>
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
                    <span>$</span> <strong>{product.price ? product.price : "N/A"}</strong>
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
                            onClick={() => deleteProduct(product.id)}>
                            <i className="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        </>
    )
}
