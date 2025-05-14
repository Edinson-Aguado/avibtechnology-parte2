import React, { useState } from 'react';
import { FaUser, FaBoxOpen, FaHeart, FaCog, FaSignOutAlt, FaCheckCircle } from 'react-icons/fa';
import './UserSidebar.css';
import { useUser } from '../../../context/UserContext';
import { env } from '../../../config/env.config';

const UserSidebar = () => {
    const { user } = useUser();
    const [activeMenu, setActiveMenu] = useState('');

    const handleMenuToggle = (menu) => {
        setActiveMenu(activeMenu === menu ? '' : menu); // Toggle menu
    };    

    return (
        <aside className="user-sidebar">
            <div className="sidebar-header">
                {
                    user.image ? (
                        <img src={`${env.URL_LOCAL_SIN_API}/uploads/users/${user?.image}`} alt="Avatar" className="avatar" />
                    ) : ""
                }
                <div className="name-box">
                    <h3>{user?.name}</h3>
                    <FaCheckCircle className="verified-icon" />
                </div>
                
                <p>{user?.observations}</p>
                
            </div>
            <ul className="sidebar-menu">
                <li>
                    <FaUser />
                    Datos Personales
                </li>
                <li onClick={() => handleMenuToggle('orders')}>
                    <FaBoxOpen />
                    Mis pedidos
                    {activeMenu === 'orders' && (
                        <ul className="submenu">
                        <li>Activos</li>
                        <li>Finalizados</li>
                        <li>Cancelados</li>
                        </ul>
                    )}
                </li>
                <li>
                    <FaHeart />
                    Favoritos
                </li>
                <li onClick={() => handleMenuToggle('settings')}>
                <FaCog />
                    Configuración
                    {activeMenu === 'settings' && (
                        <ul className="submenu">
                            <li>Cambiar contraseña</li>
                            <li>Notificaciones</li>
                        </ul>
                    )}
                </li>
                <li>
                    <FaSignOutAlt />
                    Cerrar sesión
                </li>
            </ul>
        </aside>
    );
};

export default UserSidebar;
