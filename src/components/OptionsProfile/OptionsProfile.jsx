import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useUser } from '../../context/UserContext';
import { NavLink } from 'react-router-dom';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import './OptionsProfile.css';

export default function OptionsProfile({isMenuHamburguesaOpen}) {

    const { user, logout } = useUser();
    const [openMenu, setOpenMenu] = useState(null);

    return (
        <>
            <div 
                className={`options-profile ${isMenuHamburguesaOpen ? 'show' : ''}`}
                onClick={(e) => e.stopPropagation()}
                
            >
                <ul className='container-options-profile'>
                    <li className="container-option">
                        <NavLink className="option-link" to="/">Profile</NavLink>
                    </li>
                    
                    {
                        user?.role === 'admin' && (
                            <li className="container-option dropdown2">
                                <span className="option-link dropdown-toggle" onClick={() => setOpenMenu(prev => prev === 'adminPages' ? null : 'adminPages')}>

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

                    <li className="container-option">
                        <NavLink className="option-link" to="">Ayuda</NavLink>
                    </li>
                    {
                        user ? (
                        <li className="container-option">
                            <NavLink className="option-link" to="" onClick={() => logout()}>
                                Logout
                            </NavLink>
                        </li>
                        ) : (
                            <li className="container-option">
                                <NavLink className="option-link" to="/Login">
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
