import './Header.css';
import logo from "../../assets/images/logo.jpg";
import imagenPerfil from "../../assets/images/imagen-perfil.png";
import { NavLink } from "react-router-dom";

import { useOrder } from '../../context/OrderContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

export default function Header() {

    // const [cartCount] = useState(0);
    const {toggleCart, count} = useOrder();

    return (
        <>
            <header className="main-header">

                <input type="checkbox" id="burger" className="input-burger"/>
                
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
                <nav className="main-nav">
                    <ul className="nav-list">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="../pages/Register/Register">Registrarse</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="../pages/Contact/Contact">Contacto</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="../../pages/About-us/AboutUs">Sobre nosotros</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="../../pages/Admin-products">Administrar productos</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/pages/AdminUsers/AdminUsers">Administrar usuarios</NavLink>
                        </li>
                    </ul>
                </nav>

                {/* CARRITO Y AVATAR */}
                <div className="user-info">
                    <div className="cart-container">
                        
                        <div 
                            className='user-cart' onClick={() => toggleCart()}>
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
                            className="user-picture" />
                    </div>
                </div>
            </header>
        </>
    )
}
