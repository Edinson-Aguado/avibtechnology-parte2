import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useUser } from '../../../context/UserContext';
import './UserInfo.css';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faBox } from '@fortawesome/free-solid-svg-icons/faBox';

const UserInfo = () => {
  const {user} = useUser();
  return (
    <div className="user-info-main">
      <h2 className="section-title">
        <FontAwesomeIcon icon={faUser} />
        Información personal
      </h2>
      <div className="info-section">
        <div className="info-box">
          <label>Nombre</label>
          <span>{user?.name}</span>
        </div>
        <div className="info-box">
          <label>Email</label>
          <span>{user?.email}</span>
        </div>
        <div className="info-box">
          <label>Teléfono</label>
          <span>+54 9 11 1234-5678</span>
        </div>
        <div className="info-box">
          <label>DNI</label>
          <span>34.567.890</span>
        </div>
        <div className="info-box">
          <label>Fecha de nacimiento</label>
          <span>{user?.date.slice(0, 10)}</span>
        </div>
        <div className="info-box">
          <label>Género</label>
          <span>Masculino</span>
        </div>
      </div>

      <h2 className="section-title">
        <FontAwesomeIcon icon={faBox} className='faBox'/>
        Dirección de envío
      </h2>
      <div className="info-section">
        <div className="info-box">
          <label>Dirección</label>
          <span>Av. Siempre Viva 742</span>
        </div>
        <div className="info-box">
          <label>Ciudad</label>
          <span>Buenos Aires</span>
        </div>
        <div className="info-box">
          <label>Provincia</label>
          <span>CABA</span>
        </div>
        <div className="info-box">
          <label>Código Postal</label>
          <span>1405</span>
        </div>
        <div className="info-box">
          <label>País</label>
          <span>{user?.country}</span>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
