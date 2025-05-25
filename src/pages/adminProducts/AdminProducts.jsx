import './AdminProducts.css';
import ProductTable from '../../components/ProductTable/ProductTable';
import OtroTitle from '../../components/Title/OtroTitle';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { env } from '../../config/env.config';
import LoadingOverlay from '../../components/LoadingOverlay/LoadingOverlay';

export default function AdminProducts({products, getProducts}) {

    // VARIABLES
    const [editProduct, setEditProduct] = useState(null);
    const { register, handleSubmit, setValue, setFocus, watch, reset, formState: { errors, isValid } } = useForm({mode:"onChange"});
    const [isLoading, setIsLoading] = useState(false);

    const discountPct = parseInt(watch("discount") ?? 0);
    const overlayText = editProduct ? "Guardando cambios..." : "Cargando...";

    
    useEffect(() => {

        setIsLoading(true);
        getProducts().finally(() => setIsLoading(false));

    }, []); 

    useEffect(() => {

        if (editProduct) {
            setValue("name", editProduct?.name);
            setValue("price", editProduct?.price);
            setValue("stock", editProduct?.stock);
            setValue("description", editProduct?.description);
            setValue("status", editProduct?.status);
            setValue("discount", editProduct?.discount);
            setValue("createdAt", editProduct?.createdAt);
            setValue("category", editProduct?.category);
            setValue("image", editProduct?.image);

            // Llevar el scroll hacia arriba al formulario
            document?.getElementById("form-create-product").scrollIntoView({behavior: "smooth"});
        } else {
            reset();
        }
        
    }, [editProduct, reset, setValue]);

    //CREAR NUEVO PRODUCTO
    async function createProduct(data) {
        
        try {
            const bearer = localStorage.getItem('token');

            setIsLoading(true); // comienza la carga
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("price", data.price);
            formData.append("stock", data.stock);
            formData.append("discount", data.discount);
            formData.append("description", data.description);
            formData.append("status", data.status);
            formData.append("category", data.category);

            if (data.image?.length && data.image[0] instanceof File) {
                formData.append("image", data.image[0]);
            }

            if (editProduct) {

                // Lógica para editar el post
                formData.append("updatedAt", new Date().toISOString().slice(0, 10));

                await axios.put(`${env.URL_LOCAL}/products/${editProduct._id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${bearer}`
                    }
                });
            
                //Obtenemos los datos de los productos
                await getProducts();
                setEditProduct(null); //Seteamos nulo a estado del producto que estamos editando.
                //Limpiamos le formulario
                reset()
                Swal.fire("Producto editado", "EL producto fue editado correctamente", "success");
                
            } else {
                
                //Creo el nuevo producto en base a los datos del formulario
                if (isValid) {
    
                    formData.append("createdAt", new Date().toISOString().slice(0, 10));
                    formData.append("updatedAt", new Date().toISOString().slice(0, 10));

                    await axios.post(`${env.URL_LOCAL}/products`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: `Bearer ${bearer}`
                        }
                    });
                    await getProducts();
                    reset();
                    Swal.fire("Producto creado", "El producto fue creado correctamente", "success");

                } else {
                    Swal.fire("Error", "Por favor, completa correctamente el formulario.", "error");
                }
                
            } 
            setFocus("name");

        } catch (error) {
            // En caso de error
            if (error.response) {
                Swal.fire("¡Error!", `Servidor: ${error.response.data.message || error.response.data}`, "error");
            } else {
                Swal.fire("¡Error!", `Hubo un problema: ${error.message}`, "error");
            }
        } finally {
            setIsLoading(false); // Esto garantiza que el loading se desactive si hay un error
        }

    }

    //ELIMINAR PRODUCTO POR ID
    function deleteProduct(id) {
        
        try {
            setIsLoading(true); // comienza la carga
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
        } finally {
            setIsLoading(false); // finaliza la carga
        }
    }

    function fnEditProduct(product) {
        setEditProduct(product);
    }
    //--------------------------------

    return (
        <>
            <OtroTitle title="Administrador de productos" id={`mainTitle`}/>

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
                                step="0.01"
                                {...register("price", {
                                    required: "El precio es requerido",
                                    min: {
                                        value: 0,
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
                        <label htmlFor='status'>Estatus</label>
                        <select 
                            {...register("status", { required: "El estatus es obligatorio" })} 
                            id="status">
                            <option value=""></option>
                            <option value="Nuevo">Nuevo</option>
                            <option value="Regular">Regular</option>
                            <option value="Prox">Prox</option>
                        </select>
                        {errors.category && (
                            <span 
                                className='error-input'>
                                {errors.category.message}
                            </span>
                        )}
                    </div>

                    <div className="input-group">
                        <label htmlFor="discount">
                        Descuento: <strong>{discountPct}%</strong>
                        </label>
                        <input
                            type="range"
                            id="discount"
                            min="0"
                            max="100"
                            step="1"
                            {...register("discount", {
                                required: "El descuento es obligatorio",
                                min: { value: 0, message: "Debe ser al menos 0%" },
                                max: { value: 100, message: "No puede exceder 100%" }
                            })}
                        />
                        {errors.discount && (
                        <span className="error-input">{errors.discount.message}</span>
                        )}
                    </div>


                    <div className="input-group">
                        <label htmlFor='category'>Categoría</label>
                        <select 
                            {...register("category", { required: "La categoría es obligatoria" })} 
                            id="category">
                            <option value=""></option>
                            <option value="Interior">Interior</option>
                            <option value="Exterior">Exterior</option>
                            <option value="IP PT">IP PT</option>
                            <option value="Bateria">Batería</option>
                            <option value="Panel Solar">Panel solar</option>
                            <option value="WIFI">WIFI</option>
                            <option value="4G">4G</option>
                            <option value="PoE">PoE</option>
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
                                    value: 10,
                                    message: "Caracteres mínimos: 10.",
                                },
                                maxLength: {
                                    value: 1000,
                                    message: "Caracteres máximos: 1000.",
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

                    <div className="input-group">
                        <label htmlFor="image">Imagen</label>
                        <input
                            type="file"
                            id="image"
                            accept="image/*"
                            {...register("image", editProduct ? {} : {
                                required: "La imagen es requerida",
                                validate: {
                                    type: (files) =>
                                    files?.[0]?.type.startsWith("image/") || "Debe ser una imagen",
                                    size: (files) =>
                                    (files?.[0]?.size ?? 0) < 2 * 1024 * 1024 || "Máx 2MB"
                                }
                            })}
                        />
                        {errors.image && <span className="error-input">{errors.image.message}</span>}
                    </div>
                    
                    <div className="buttons">
                        <button 
                            className="btn" 
                            type="submit" 
                            disabled={!isValid}>
                            
                            {
                                editProduct ? "Actualizar Producto" : "Crear Producto"
                            }
                            
                        </button>
                        <button 
                            className="btn btn-clean" 
                            type="button"
                            onClick={() => {
                                reset();
                                setEditProduct(null);
                            }}
                        >
                            Limpiar datos
                        </button>
                    </div>
                    

                </form>

                <div className="table-container">

                    <table className="main-table">
                        <thead>
                            <tr>
                                <th>Imagen</th>
                                <th>Nombre</th>
                                <th>Descripción</th>
                                <th>Valor</th>
                                <th>Descuento</th>
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
                                            <td colSpan="7" className="no-products">
                                                No hay productos disponibles.
                                            </td>
                                        </tr>
                                    )
                            }
                        </tbody>
                    </table>

                </div>
            </div>
            
            <LoadingOverlay isLoading={isLoading} text={overlayText} />
        </>
    )

}
