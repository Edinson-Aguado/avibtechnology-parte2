import './Header.css';
import logo from "../../assets/images/logo.png"
import imagenPerfil from "../../assets/images/imagen-perfil.png";
import { NavLink, useLocation } from "react-router-dom";
import { useOrder } from '../../context/OrderContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, useRef } from "react";
import LoginLateral from '../../components/LoginLateral/LoginLateral';
import OptionsProfile from '../../components/OptionsProfile/OptionsProfile';

export default function Header({useWindowWidth}) {

    const {count, toggleCart} = useOrder();
    const [openMenu, setOpenMenu] = useState(null);
    const menuRef = useRef(null);
    const [isMenuHamburguesaOpen, setIsMenuHamburguesaOpen] = useState(false);
    const location = useLocation();
    const width = useWindowWidth();
    
    const toggleMenuAdmin = () => {
        setIsMenuHamburguesaOpen(!isMenuHamburguesaOpen);
    };

    useEffect(() => {

        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpenMenu(null);
            }
        }
        
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        setIsMenuHamburguesaOpen(false);
        setOpenMenu(null);
    }, []);

    // Cierra el menú cada vez que cambia la ruta
    useEffect(() => {
        setIsMenuHamburguesaOpen(false);
    }, [location]);

    const toggleMenu = (menuX) => {
        console.log("toggleMenu clicked:", menuX);
        setOpenMenu(prev => (prev === menuX ? null : menuX));
    };

    return (
        <>
            <header className="main-header">

                <input 
                    type="checkbox" 
                    id="burger" 
                    className="input-burger"
                    checked={isMenuHamburguesaOpen}
                    onChange={() => setIsMenuHamburguesaOpen(!isMenuHamburguesaOpen)}
                />
                
                {/* MENU  DE HAMBURGUESA */}
                <label className="burger-container" htmlFor="burger">
                    <div className="burger"></div>
                </label>

                {/* LOGO DE LA EMPRESA */}
                <div className="logo">
                    <NavLink 
                        className="nav-link" 
                        to="/">
                        <img 
                            loading='lazy' 
                            src={logo} 
                            alt="Imágen del Logo de la empresa" className="nav-logo"
                            title='AVIB Technology'/>
                    </NavLink>
                </div>

                {/* MENÚ DE NAVEGACIÓN */}
                <nav className="main-nav" ref={menuRef} style={{ left: isMenuHamburguesaOpen ? '0' : '-250px' }}>
                    
                    <ul className="nav-list">

                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">AVIB</NavLink>
                        </li>

                        <li className="nav-item dropdown">
                            <span className="nav-link dropdown-toggle" onClick={() => toggleMenu('paginas')}>
                            Informacion <FontAwesomeIcon icon={faChevronDown} size="sm" className='arrow-icon' />
                            </span>
                            
                            {
                                openMenu === 'paginas' && (
                                    <ul className="dropdown-menu">
                                        <li><NavLink className="nav-link-dropdown" to="/Register">Registrarse</NavLink></li>
                                        <li><NavLink className="nav-link-dropdown" to="/Contact">Contacto</NavLink></li>
                                        <li><NavLink className="nav-link-dropdown" to="/AboutUs">Sobre nosotros</NavLink></li>
                                    </ul>
                                )
                            }
                            
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link" to="/ProductsPage">Productos</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">Promociones</NavLink>
                        </li>

                    </ul>

                    {
                        width <= 819 && (
                            <LoginLateral/>
                        )
                    }
                    

                </nav>

                {/* CARRITO Y AVATAR */}
                <div className="user-info">
                    <div className="cart-container">
                        
                        <div 
                            className='user-cart' 
                            onClick={() => toggleCart()
                            }>

                            <FontAwesomeIcon
                                className='icon-carrito'
                                icon={faShoppingBag}
                                size="2x"
                                style={{ cursor: "pointer" }}
                            />
                            <span 
                                className="cart-count">
                                {count}
                            </span>

                        </div>
                    </div>
                    
                    <div 
                        className="picture-container" 
                    >
                        <span>
                            <img
                                loading='lazy'
                                src={imagenPerfil} 
                                alt="User avatar"
                                className="user-picture" 
                                id="user-picture"
                                onClick={toggleMenuAdmin} 
                            />
                            <OptionsProfile 
                                isMenuHamburguesaOpen={isMenuHamburguesaOpen} 
                                toggleMenu={toggleMenu} 
                                toggleMenuAdmin={toggleMenuAdmin}
                            />
                        </span>
                        
                    </div>

                    {
                        width >= 820 && (
                            <LoginLateral/>
                        )
                    }
                </div>
                
                
            </header>
        </>
    )
}
