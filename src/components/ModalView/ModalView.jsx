import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './ModalView.css';
import { faClose } from '@fortawesome/free-solid-svg-icons';

export default function ModalView({ onClose, product}) {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>
                    <FontAwesomeIcon icon={faClose}/>
                </button>
                <h3 className='title-name-modalview'>{product?.name}</h3>
                <img src={product?.image} alt={product?.name} className='img-product-modalview' />
                <p>Precio: ${product?.price}</p>
                <p>Descripción breve u otros detalles...</p>
            </div>
        </div>
    );
}
