import React, { useEffect, useState } from 'react';
import './ProductsPage.css';
import axios from 'axios';
import { env } from '../../config/env.config'; // Asegúrate que exportas correctamente desde aquí
import { NavLink } from 'react-router-dom';
import { faTag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LoadingOverlay from '../../components/LoadingOverlay/LoadingOverlay';

export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [modalContent, setModalContent] = useState(null);
    const [priceFilter, setPriceFilter] = useState({ min: '', max: '' });
    const [extraFilters, setExtraFilters] = useState({
        descuento: false,
        garantia: false,
        nuevo: false,
    });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8; // Productos por página para mostrar
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        
        setIsLoading(true);
        axios.get(`${env.URL_LOCAL}/products`)
        .then(res => {
            setProducts(res.data.products || []);
        })
        .catch(err => {
            console.error('Error al obtener productos:', err);
        }).finally(() => {
            setIsLoading(false); // ocultamos la carga
        });
    }, []);

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
        const price = product.price;
        const matchesMin = priceFilter.min === '' || price >= parseFloat(priceFilter.min);
        const matchesMax = priceFilter.max === '' || price <= parseFloat(priceFilter.max);
    
        const matchesDescuento = !extraFilters.descuento || product.discount > 0;
        const matchesGarantia = !extraFilters.garantia || product.warranty === true;
        const matchesNuevo = !extraFilters.nuevo || product.condition === 'Nuevo';
    
        return matchesSearch && matchesCategory && matchesMin && matchesMax &&
            matchesDescuento && matchesGarantia && matchesNuevo;
    });
    
    

    const categories = [...new Set(products.map(p => p.category))].sort();


    const openModal = (product) => {
        setModalContent(product);
    };

    const closeModal = () => {
        setModalContent(null);
    };

    const handleOverlayClick = (e) => {
        if (e.target.classList.contains('modal-overlay')) {
        closeModal();
        }
    };

    const categoryCounts = products.reduce((acc, product) => {
        acc[product.category] = (acc[product.category] || 0) + 1;
        return acc;
    }, {});

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);


    return (

        <>
            <LoadingOverlay isLoading={isLoading} />
            <div className="products-page">
                <h1>Catálogo de Productos</h1>

                <div className="search-bar">
                    <i className="fas fa-search"></i>
                    <input
                    type="text"
                    placeholder="Buscar producto..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    />
                </div>

                <div className="products-content">

                    <aside className="sidebar">
                        <h3>Categorías</h3>
                        <ul>
                            <li
                                onClick={() => setSelectedCategory(null)}
                                style={{ fontWeight: selectedCategory === null ? 'bold' : 'normal' }}
                            >
                                Todas
                            </li>
                            {categories.map((category, index) => (
                                <li
                                    key={index}
                                    onClick={() => setSelectedCategory(category)}
                                    style={{ fontWeight: selectedCategory === category ? 'bold' : 'normal' }}
                                >
                                    {category} ({categoryCounts[category]})
                                </li>
                            ))}
                        </ul>
                        <div className="price-filter">
                            
                            <span>Filtrar por precio</span>

                            <input
                                type="number"
                                min="0"
                                step="5000"
                                placeholder="Precio mínimo"
                                value={priceFilter.min}
                                onChange={e => setPriceFilter(prev => ({ ...prev, min: e.target.value }))}
                                />
                            <input
                                type="number"
                                min="0"
                                step="5000"
                                placeholder="Precio máximo"
                                value={priceFilter.max}
                                onChange={e => setPriceFilter(prev => ({ ...prev, max: e.target.value }))}
                            />

                        </div>

                        <div className="extra-filters">
                            <label className="filter-toggle">
                                <span>Con Descuento</span>
                                <input
                                    type="checkbox"
                                    checked={extraFilters.descuento}
                                    onChange={e => setExtraFilters(prev => ({ ...prev, descuento: e.target.checked }))}
                                />
                            </label>

                            <label className="filter-toggle">
                                <span>Con Garantía</span>
                                <input
                                    type="checkbox"
                                    checked={extraFilters.garantia}
                                    onChange={e => setExtraFilters(prev => ({ ...prev, garantia: e.target.checked }))}
                                />
                            </label>

                            <label className="filter-toggle">
                                <span>Nuevo</span>
                                <input
                                    type="checkbox"
                                    checked={extraFilters.nuevo}
                                    onChange={e => setExtraFilters(prev => ({ ...prev, nuevo: e.target.checked }))}
                                />
                            </label>
                        </div>


                        <div className="price-buttons">
                            <button
                                className="clear-btn"
                                onClick={() => {
                                    setSelectedCategory(null);
                                    setSearch('');
                                    setPriceFilter({ min: '', max: '' });
                                    setExtraFilters({ descuento: false, garantia: false, nuevo: false });

                                }}
                                >
                                Limpiar filtros
                            </button>
                        </div>
                    </aside>

                    <div className="products-content-list">
                        <div className="product-list">
                            {filteredProducts.length > 0 ? (
                                currentProducts.map(product => (

                                    <div className="product-card" key={product._id}>

                                        {product.discount > 0 && (
                                            <span className="etiqueta-oferta">
                                                Oferta<FontAwesomeIcon icon={faTag} />
                                            </span>
                                        )}
                                        <div className="image-wrapper">
                                            <img src={product.image || '/default.png'} alt={product.name} />
                                        </div>
                                        <span className="category">{product.category}</span>
                                        <h3>
                                            <NavLink to={`/ProductDetail/${product._id}`} title='Ir a su página de detalle'>{product.name}</NavLink>
                                        </h3>
                                        <p className='price'> 
                                            {
                                                product?.discount > 0 ? (
                                                    <>
                                                        <span className='precio-original'>$ {product?.price}</span>{" "}
                                                        <span className='precio-descuento'> $ {Math.round(product?.price * (1 - product?.discount / 100))}</span>

                                                    </>
                                                ) : (
                                                    <span className='precio-descuento'>$ {product?.price}</span>
                                                )
                                            }
                                        </p>
                                        

                                        <p className="description">{product.description}</p>
                                        
                                        <button className="view-more" onClick={() => openModal(product)}>
                                            Ver más
                                        </button>
                                        
                                        
                                    </div>
                                
                                ))
                            ) : (
                                <p className="no-results">No se encontraron productos</p>
                            )}

                        </div>
                        <div className="pagination">
                            <button 
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(prev => prev - 1)}
                            >
                                Anterior
                            </button>
                        
                            {[...Array(totalPages)].map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentPage(index + 1)}
                                    className={currentPage === index + 1 ? 'active' : ''}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        
                            <button 
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage(prev => prev + 1)}
                            >
                                Siguiente
                            </button>
                        </div>
                    </div>
                    
                </div>

                {modalContent && (
                    <div className="modal-overlay" onClick={handleOverlayClick}>
                    <div className="modal-content">
                        <button className="close-btn" onClick={closeModal}>×</button>
                        <h2>{modalContent.name}</h2>
                        <p>{modalContent.description}</p>
                    </div>
                    </div>
                )}
            </div>
        </>
        
    );
}
