import { faRightFromBracket, faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import './LoginLateral.css';
import { useUser } from "../../context/UserContext";
import Swal from "sweetalert2";

export default function LoginLateral() {

    const navigate = useNavigate();
    const {user, logout} = useUser();

    return (
        <>
            <div className="container-btn-login">
                {
                    user ? (
                        <button 
                            className='btn-login btn-login-close'
                            onClick={() => {
                                logout();
                                Swal.fire({
                                    title: 'Sesión cerrada',
                                    text: 'Has cerrado sesión correctamente.',
                                    icon: 'success',
                                    timer: 2000,
                                    showConfirmButton: false,
                                    timerProgressBar: true,
                                    background: '#fefefe',
                                    color: '#333',
                                });
                                navigate('/');
                            }}

                            style={{
                                "backgroundColor":"#dc3545"
                            }}
                            >
                            <FontAwesomeIcon icon={faRightToBracket} />
                            Cerrar sesión
                        </button>
                    ) : (
                        <button 
                            className='btn-login'
                            onClick={() => navigate('/Login')}
                            >
                            <FontAwesomeIcon icon={faRightFromBracket} />
                            Login
                        </button>
                    )
                }
            </div>
        </>
    )
}
