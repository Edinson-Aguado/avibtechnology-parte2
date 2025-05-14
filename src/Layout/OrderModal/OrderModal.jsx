import {useOrder} from '../../context/OrderContext';
import OtroTitle from '../../components/Title/OtroTitle';
import Order from '../../pages/order/Order';
import "./OrderModal.css";

export default function OrderModal() {

    const { isOpen, toggleCart } = useOrder();

    if (!isOpen) return;

    return (

        <div className="modal-overlay-order" onClick={ () => toggleCart() }>
            
            <div className="modal-content-order" onClick={ (e) => e.stopPropagation() }>
                
                <Order/>
            </div>
        </div>
    );
}