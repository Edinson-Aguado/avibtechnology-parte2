import iconoWhatsApp from '../../assets/images/iconoWhatsApp.png';
import './WhatsApp.css';

export default function WhatsApp() {
    return (
        <>
            <a 
            className="link-whatsapp" 
            href="https://wa.me/5491127721921" 
            target="_blank"
            >
                <img src={iconoWhatsApp} alt="Link a whatsapp"/>
            </a>
        </>
    )
}
