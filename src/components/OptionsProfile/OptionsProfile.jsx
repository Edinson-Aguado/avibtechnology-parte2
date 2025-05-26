import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useUser } from '../../context/UserContext';
import { NavLink } from 'react-router-dom';
import { faChevronDown, faCircleQuestion, faCircleUser, faClipboardList, faGear, faRightFromBracket, faShieldHalved } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import './OptionsProfile.css';

export default function OptionsProfile({isMenuHamburguesaOpen}) {

    console.log("OptionsProfile renderizado");

    const { user, logout } = useUser();
    const [openMenu, setOpenMenu] = useState(null);

    return (
        <>
            <div 
                className={`options-profile ${isMenuHamburguesaOpen ? 'show' : ''}`}
                onClick={(e) => e.stopPropagation()}
                
            >
                <ul className='container-options-profile'>
                    {
                        user && (
                            <li className="container-option">
                                <NavLink className="option-link" to="/UserProfile">
                                    <FontAwesomeIcon icon={faCircleUser}/>
                                    Perfil
                                </NavLink>
                            </li>
                            
                        )
                    }
                    
                    
                    {
                        user?.role === 'admin' && (
                            <li className="container-option dropdown2">
                                <span className="option-link dropdown-toggle" onClick={() => setOpenMenu(prev => prev === 'adminPages' ? null : 'adminPages')}>
                                    <FontAwesomeIcon icon={faShieldHalved}/>
                                    Admin <FontAwesomeIcon icon={faChevronDown} size="sm" className='arrow-icon' />
                                </span>

                                {
                                    openMenu === 'adminPages' && (
                                        <ul className="submenu">
                                            <li className="container-option dropdown2">
                                                <NavLink
                                                    className="option-link"
                                                    to="/AdminProducts"
                                                    onClick={() => {
                                                        console.log("Click en AdminProducts");
                                                        setOpenMenu(null);
                                                        
                                                    }}
                                                >
                                                    Productos
                                                </NavLink>
                                            </li>
                                            <li className="container-option dropdown2">
                                                <NavLink
                                                    className="option-link"
                                                    to="/AdminUsers"
                                                    onClick={() => {
                                                        console.log("Click en AdminUsers");
                                                        setOpenMenu(null);
                                                        
                                                    }}
                                                >
                                                    Usuarios
                                                </NavLink>
                                            </li>
                                        </ul>
                                    )
                                }

                            </li>
                        )
                    }

                    {
                        user ? (
                            <li className="container-option">
                                <NavLink className="option-link" to="/Orders">
                                    <FontAwesomeIcon icon={faClipboardList}/>
                                    Ordenes
                                </NavLink>
                            </li>
                        ) : ""
                    }
                    <li className="container-option">
                        <NavLink className="option-link" to="">
                            <FontAwesomeIcon icon={faCircleQuestion}/>
                            Ayuda
                        </NavLink>
                    </li> 
                    <li className="container-option">
                        <NavLink className="option-link" to="">
                            <FontAwesomeIcon icon={faGear}/>
                            Configuración
                        </NavLink>
                    </li>
                    {
                        user ? (
                        <li className="container-option">
                            <NavLink className="option-link last" to="/" onClick={() => logout()}>
                                <FontAwesomeIcon icon={faRightFromBracket}/>
                                Logout
                            </NavLink>
                        </li>
                        ) : (
                            <li className="container-option">
                                <NavLink className="option-link last" to="/Login">
                                    Login
                                </NavLink>
                            </li>
                        )
                    }
                    
                </ul>

            </div>
        </>
    )
}
