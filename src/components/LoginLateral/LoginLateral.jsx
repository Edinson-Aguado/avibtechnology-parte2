import { faRightFromBracket, faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import './LoginLateral.css';
import { useUser } from "../../context/UserContext";

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
                            onClick={() => logout()}
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
