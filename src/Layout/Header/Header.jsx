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
import { useUser } from '../../context/UserContext';
import { env } from '../../config/env.config';
import { FaCheckCircle } from 'react-icons/fa';

export default function Header({useWindowWidth}) {

    const {count, toggleCart} = useOrder();
    const [openMenu, setOpenMenu] = useState(null);
    const [cartAnim, setCartAnim] = useState(false);


    const menuRef = useRef(null); // para el main-nav
    const profileMenuRef = useRef(null); // para OptionsProfile
    const burgerRef = useRef(null); 

    const [isMenuHamburguesaOpen, setIsMenuHamburguesaOpen] = useState(false);
    const location = useLocation();
    const width = useWindowWidth();
    const { user } = useUser();
    
    const toggleMenuAdmin = () => {
        setIsMenuHamburguesaOpen(!isMenuHamburguesaOpen);
    };

    useEffect(() => {
        function handleClickOutside(event) {
            const clickedOutsideMenu = menuRef.current && !menuRef.current.contains(event.target);
            const clickedOutsideProfile = profileMenuRef.current && !profileMenuRef.current.contains(event.target);
            const clickedOutsideBurger = burgerRef.current && !burgerRef.current.contains(event.target);

            if (clickedOutsideMenu && clickedOutsideProfile && clickedOutsideBurger) {
                setOpenMenu(null);
                setIsMenuHamburguesaOpen(false);
            }
        }


        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);




    // Cierra el menú cada vez que cambia la ruta
    useEffect(() => {
        setIsMenuHamburguesaOpen(false);
    }, [location]);

    useEffect(() => {
        if (count > 0) {
            setCartAnim(true);
            const timer = setTimeout(() => setCartAnim(false), 500); // 500ms de animación
            return () => clearTimeout(timer);
        }
    }, [count]);


    const toggleMenu = (menuX) => {
        setOpenMenu(prev => (prev === menuX ? null : menuX));
    };
    
    const userImage = user?.image 
    ? `${env.URL_LOCAL_SIN_API}/uploads/users/${user.image}` 
    : imagenPerfil;

    return (
        <>
            <header className="main-header">
                
                {/* MENÚ DE HAMBURGUESA */}
                <label
                    ref={burgerRef} 
                    className={`burger-container ${isMenuHamburguesaOpen ? 'open' : ''}`} 
                    onClick={() => {
                        setIsMenuHamburguesaOpen(prev => !prev)}}
                    >
                    <div className="burger-line line-short"></div>
                    <div className="burger-line line-long"></div>
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
                <nav className={`main-nav ${isMenuHamburguesaOpen ? 'open' : ''}`} ref={menuRef}>

                    {
                        width <= 819 && user && (
                            <div className="user-profile-sidebar">
                                <img
                                    loading="lazy"
                                    src={userImage}
                                    alt="User avatar"
                                    className="avatar-sidebar"
                                />
                                <div className="user-name-verified">
                                    <span className={user?.role === 'admin' ? 'super-premium-name' : ''}>{user.name}</span>
                                    <FaCheckCircle className="verified-icon" />
                                </div>
                            </div>
                        )
                    }

                    
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
                            <NavLink className="nav-link" to="/">Ofertas</NavLink>
                        </li>

                    </ul>

                    {
                        width <= 819 && (
                            <LoginLateral/>
                        )
                    }

                    <div className="bottom-glow-line" />

                </nav>

                {/* CARRITO Y AVATAR */}
                <div className="user-info">
                    <div className="cart-container">
                        
                        <div 
                            className={`user-cart ${cartAnim ? 'cart-bounce' : ''}`}
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
                        ref={profileMenuRef}
                    >
                        <span>
                            <img
                                loading='lazy'
                                src={userImage}
                                alt="User avatar"
                                className="user-picture" 
                                id="user-picture"
                                onClick={toggleMenuAdmin} 
                            />
                            <OptionsProfile 
                                isMenuHamburguesaOpen={isMenuHamburguesaOpen} 
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
