import './AdminProducts.css';
import ProductTable from '../../components/ProductTable/ProductTable';
import OtroTitle from '../../components/Title/OtroTitle';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { env } from '../../config/env.config';

export default function AdminProducts({products, setProducts, getProducts}) {

    // VARIABLES
    const [editProduct, setEditProduct] = useState(null);
    const { register, handleSubmit, setValue, setFocus, reset, formState: { errors, isValid } } = useForm({mode:"onChange"});

    function getTime() {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const datedef = `${year}-${month}-${day}`;

        return datedef;
    }
    
    useEffect(() => {
        
        getProducts();

    }, []); 

    useEffect(() => {

        if (editProduct) {
            setValue("image", editProduct?.image);
            setValue("name", editProduct?.name);
            setValue("price", editProduct?.price);
            setValue("stock", editProduct?.stock);
            setValue("description", editProduct?.description);
            setValue("status", editProduct?.status);
            setValue("createAt", editProduct?.createAt);
            setValue("category", editProduct?.category);

            // Llevar el scroll hacia arriba al formulario
            document?.getElementById("form-create-product").scrollIntoView({behavior: "smooth"});
        } else {
            reset();
        }
        
    }, [editProduct, reset, setValue]);

    //CREAR NUEVO PRODUCTO
    async function createProduct(data) {
        
        try {
            if (editProduct) {
                // Lógica para editar el post
        
                const id = editProduct._id; 
        
                const productToUpdate = {
                    name: data.name,
                    price: data.price,
                    stock: data.stock,
                    description: data.description,
                    status: data.status,
                    image: data.image,
                    createAt: data.createAt,
                    category: data.category

                }

                await axios.put(`${env.URL_LOCAL}/products/${id}`, productToUpdate);
            
                setEditProduct(null); //Seteamos nulo a estado del producto que estamos editando.
                //Obtenemos los datos de los productos
                await getProducts();
                //Limpiamos le formulario
                reset()
                Swal.fire("Producto editado", "EL producto fue editado correctamente", "success");
                
            } else {
                //Creo el nuevo producto en base a los datos del formulario
                if (isValid) {
                    const newProduct = {
                        // El "ID" Ya se hace desde el servidor de Mokapi
                        name: data.name,
                        price: data.price,
                        stock: data.stock,
                        description: data.description,
                        category: data.category,
                        status: data.status,
                        image: data.image,
                        createAt: new Date().toISOString()
                    }
    
                    const response = await axios.post(`${env.URL_LOCAL}/products`, newProduct);
                    setProducts(response.data.products);
                    await getProducts();
                    reset();
                    Swal.fire("Producto creado", "El producto fue creado correctamente", "success");

                } else {
                    Swal.fire("Error", "Por favor, completa correctamente el formulario.", "error");
                }
                
            } 
            setFocus("name");

        } catch (error) {
            Swal.fire("¡Error!", `Hubo un problema: ${error.message}`, "error");
        }
    }

    //ELIMINAR PRODUCTO POR ID
    function deleteProduct(id) {
        
        try {

            Swal.fire({
                title: "¿Estás seguro?",
                text: "¡No podrás recuperar este producto!",
                icon: "warning",
                draggable: true,
                showCancelButton: true,
                cancelButtonText: "Cancelar",
                confirmButtonText: "¡Borrar!",
                confirmButtonColor: "#f00",
                cancelButtonColor: "#6c757d",
                reverseButtons: true,

            }).then(async(resultado) => {

                if (resultado.isConfirmed) {

                    await axios.delete(`${env.URL_LOCAL}/products/${id}`);
                    await getProducts();
                    Swal.fire("¡Producto borrado!", "El producto se ha borrado correctamente.", "success");
                }

            });
        } catch (error) {
            Swal.fire("¡Error!", `Hubo un problema: ${error.message}`, "error");
        }
    }

    function fnEditProduct(product) {
        setEditProduct(product);
    }
    //--------------------------------

    return (
        <>
            <OtroTitle title="Administrador de productos" />

            <div className="main-container-admin-products">
                <form 
                    className="create-product"
                    id='form-create-product'
                    onSubmit={handleSubmit(createProduct)}
                    >
                    <div className="input-group">
                        <label htmlFor="name">Nombre</label>
                        <input 
                            type="text"
                            {...register("name", {
                                required: "El nombre es requerido",
                                minLength: {
                                    value: 3,
                                    message: "El titulo debe tener al menos 3 caracteres",
                                },
                                maxLength: {
                                    value: 20,
                                    message: "El titulo debe tener menos de 20 caracteres",
                                },
                            })}
                            id="name"  
                            pattern=".{3,20}" 
                            autoFocus 
                            placeholder="Cámara..."
                        />
                        {errors.name && (
                            <span 
                                className='error-input'>
                                {errors.name.message}
                            </span>
                        )}
                    </div>

                    <div className="input-group  price-stock">
                        <div className="input-group">
                            <label htmlFor="price">Precio</label>
                            <input 
                                type="number" 
                                {...register("price", {
                                    required: "El precio es requerido",
                                    minLength: {
                                        value: 1,
                                        message: "El valor del precio debe ser mayor a 0",
                                    }
                                })} 
                                id="price" 
                            />
                            {errors.price && (
                                <span 
                                    className='error-input'>
                                    {errors.price.message}
                                </span>
                            )}
                        </div>
                        
                        <div className="input-group">
                            <label htmlFor="stock">Stock</label>
                            <input
                                type="number"
                                id="stock"
                                placeholder="Cantidad"
                                {...register("stock", {
                                    required: "El stock es obligatorio",
                                    min: { value: 0, message: "No puede ser negativo" }
                                })}
                            />
                            {errors.stock && <span className="error-input">{errors.stock.message}</span>}
                        </div>
                    </div>
                    

                    <div className="input-group">
                        <label htmlFor="image">Imagen</label>
                        <input
                            type="file"
                            id="image"
                            accept="image/*"
                            {...register("image", {
                                required: "La imagen es obligatoria"
                            })}
                        />
                        {errors.image && <span className="error-input">{errors.image.message}</span>}
                    </div>

                    <div className="input-group">
                        <label htmlFor="fecha">Fecha de creación</label>
                        <input 
                            type="date"
                            {...register("createAt")}
                            id="createAt" 
                            name="createAt" 
                            min="1980-01-01" 
                            max={getTime()} 
                            required
                        />
                        
                    </div>

                    <div className="input-group">
                        <label htmlFor='category'>Categoría</label>
                        <select 
                            {...register("category", { required: "La categoría es obligatoria" })} 
                            id="category">
                            <option value=""></option>
                            <option value="int">Interior</option>
                            <option value="ext">Exterior</option>
                            <option value="ippt">IP PT</option>
                            <option value="bat">Batería</option>
                            <option value="pansol">Panel solar</option>
                            <option value="wifi">WIFI</option>
                            <option value="4g">4G</option>
                            <option value="poe">PoE</option>
                        </select>
                        {errors.category && (
                            <span 
                                className='error-input'>
                                {errors.category.message}
                            </span>
                        )}
                    </div>

                    <div className="input-group">
                        <label 
                            htmlFor="description">
                            Descripción
                        </label>
                        <textarea 
                            {...register("description", {
                                required: "La descripción es requerida",
                                minLength: {
                                    value: 1,
                                    message: "Agrege una una descripción válida y no vacía.",
                                }
                            })}
                            id="description" 
                            rows="5">
                        </textarea>
                        {errors.description && (
                            <span 
                                className='error-input'>
                                {errors.description.message}
                            </span>
                        )}
                    </div>

                    <button 
                        className="btn" 
                        type="submit" 
                        disabled={!isValid}>
                        
                        {
                            editProduct ? "Actualizar Producto" : "Crear Producto"
                        }
                        
                    </button>

                </form>

                <div className="table-container">

                    <table className="main-table">
                        <thead>
                            <tr>
                                <th>Imágen</th>
                                <th>Nombre</th>
                                <th>Descripción</th>
                                <th>Valor</th>
                                <th>Stock</th>
                                <th>Herramientas</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                products && products.length > 0 ? (
                                    products.map((product) => (
                                        <ProductTable 
                                            key={product._id} 
                                            product={product}
                                            deleteProduct={deleteProduct} 
                                            fnEditProduct={fnEditProduct}/>
                                    ))
                                ) : (
                                        <tr>
                                            <td colSpan="5" className="no-products">
                                                No hay productos disponibles.
                                            </td>
                                        </tr>
                                    )
                            }
                        </tbody>
                    </table>

                </div>
            </div>
            
            
        </>
    )

}
