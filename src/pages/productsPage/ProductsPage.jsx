import React, { useEffect, useState } from 'react';
import './ProductsPage.css';
import axios from 'axios';
import { env } from '../../config/env.config'; // Asegúrate que exportas correctamente desde aquí
import { NavLink } from 'react-router-dom';
import { faTag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [modalContent, setModalContent] = useState(null);

    useEffect(() => {
        axios.get(`${env.URL_LOCAL}/products`)
        .then(res => {
            setProducts(res.data.products || []);
        })
        .catch(err => {
            console.error('Error al obtener productos:', err);
        });
    }, []);

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
        return matchesSearch && matchesCategory;
    });

    const categories = [...new Set(products.map(p => p.category))];

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

    return (
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
                    {category}
                </li>
                ))}
            </ul>
            </aside>

            <div className="product-list">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map(product => (
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
                        <p className="price">
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
                        </p>
                        <p className="description">{product.description}</p>
                        {(
                        <button className="view-more" onClick={() => openModal(product)}>
                            Ver más
                        </button>
                        )}
                        
                    </div>
                    ))
                ) : (
                    <p className="no-results">No se encontraron productos</p>
                )}
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
    );
}
