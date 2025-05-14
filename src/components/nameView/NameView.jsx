import { FaCheckCircle } from 'react-icons/fa';
import { useUser } from '../../context/UserContext';
import './NameView.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

export default function NameView() {
    const { user } = useUser();

    const mailToLink = `mailto:avibtechnology@gmail.com?subject=Consulta%20desde%20el%20perfil&body=Hola%20AVIB%20Technology,%0A%0ANecesito%20hacer%20una%20consulta%20sobre...`;
    const callToLink = "wa.me/54911277219";

    return (
        <>
            {user && (
                <div className="viewName">
                    <div className="view">
                        <span className="viewName-user">
                            {user.name}
                            <FaCheckCircle className="verified-icon" />
                        </span>
                    </div>
                    <div className="viewInfo">
                        <span className='linkTo'>
                            <a title='Enviar un Mail' className='infoLink' href={mailToLink} target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faEnvelope} />
                                avibtechnology@gmail.com
                            </a>
                        </span>
                        
                        <span className='linkTo'>
                            <a title='Enviar un WhatsApp' className='infoLink' href={callToLink} target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faPhone} />
                                +54 9 11 2772-1921
                            </a>
                        </span>
                    </div>
                </div>
            )}
        </>
    );
}
