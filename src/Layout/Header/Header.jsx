import './Header.css';
import logo from "../../assets/images/logo.png"
import imagenPerfil from "../../assets/images/imagen-perfil.png";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useOrder } from '../../context/OrderContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faRightToBracket, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, useRef } from "react";

export default function Header() {

    const {count, toggleCart} = useOrder();
    const [openMenu, setOpenMenu] = useState(null);
    const menuRef = useRef(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

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

    // Cierra el menú cada vez que cambia la ruta
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location]);

    const toggleMenu = (menuX) => {
        setOpenMenu(prev => (prev === menuX ? null : menuX));
    };

    return (
        <>
            <header className="main-header">

                <input 
                    type="checkbox" 
                    id="burger" 
                    className="input-burger"
                    checked={isMenuOpen}
                    onChange={() => setIsMenuOpen(!isMenuOpen)}
                />
                
                {/* MENU  DE EHAMBURGUESA */}
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
                <nav className="main-nav" ref={menuRef} style={{ left: isMenuOpen ? '0' : '-250px' }}>
                    
                    <ul className="nav-list">

                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">Home</NavLink>
                        </li>

                        <li className="nav-item dropdown">
                            <span className="nav-link dropdown-toggle" onClick={() => toggleMenu('paginas')}>
                            Páginas <FontAwesomeIcon icon={faChevronDown} size="sm" className='arrow-icon' />
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

                        <li className="nav-item dropdown">
                            <span className="nav-link dropdown-toggle" onClick={() => toggleMenu('adminPages')}>
                            Administración <FontAwesomeIcon icon={faChevronDown} size="sm" className='arrow-icon' />
                            </span>
                            {
                                openMenu === 'adminPages' && (
                                    <ul className="dropdown-menu">
                                        <li><NavLink className="nav-link-dropdown" to="/AdminProducts">Administrar productos</NavLink></li>
                                        <li><NavLink className="nav-link-dropdown" to="/AdminUsers">Administrar usuarios</NavLink></li>
                                    </ul>
                                )
                            }
                            
                        </li>

                    </ul>

                    <div className="container-btn-login">
                        <button 
                            className='btn-login'
                            onClick={() => navigate('/Login')}
                            >
                            <FontAwesomeIcon icon={faRightToBracket} />
                            Login
                        </button>
                    </div>

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
                                icon={faShoppingCart}
                                size="2x"
                                style={{ cursor: "pointer" }}
                            />
                            <span 
                                className="cart-count">
                                {count}
                            </span>

                        </div>
                        
                        
                    </div>
                    <div className="picture-container">
                        <img
                            loading='lazy'
                            src={imagenPerfil} alt="User avatar"
                            className="user-picture" 
                            id="user-picture" 
                        />
                        
                        {/* <NavLink to="/Login" id='user-picture' title='Iniciar sesión'>
                            Iniciar sesión
                        </NavLink> */}
                        
                    </div>
                </div>
            </header>
        </>
    )
}
