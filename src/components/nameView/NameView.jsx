import { FaCheckCircle } from 'react-icons/fa';
import { useUser } from '../../context/UserContext';
import './NameView.css';

export default function NameView() {

    const {user} = useUser();
    return (
        <>
            { user && (
                <div className="viewName">
                    <span className="viewName-user">
                        {user.name}
                    </span>
                    <FaCheckCircle className="verified-icon" />
                </div>
            )}
            
        </>
    )
}
