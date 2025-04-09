import './Footer.css';
import logo from '../../assets/images/logo.png';

export default function Footer() {
    return (
        <>
            <footer className="main-footer">
                <div className="footer-1">
                    <section className="footer-social">
                        <h3>REDES SOCIALES</h3>
                        <ul>
                            <li>
                                <a 
                                    target="_blank" 
                                    className="facebook" 
                                    href="https://www.facebook.com/profile.php?id=61569006397086"><i className="fab fa-facebook-f"></i>
                                </a>
                            </li>

                            <li>
                                <a 
                                    target="_blank" 
                                    className="whatsapp" 
                                    href="https://wa.me/c/5491127721921">
                                    <i className="fa-brands fa-whatsapp"></i>
                                </a>
                            </li>
                            
                            <li>
                                <a 
                                    target="_blank" 
                                    className="instagram" 
                                    href="https://www.instagram.com/avibtechnology/"><i className="fab fa-instagram"></i>
                                </a>
                            </li>
                        </ul>
                    </section>
                    
                    <section className="footer-brand">
                        <h3>LOGO</h3>
                        <div className="image">
                            <img loading="lazy" src={logo} alt="Logo de la empresa"/>
                        </div>
                    </section>
                    
                    <section className="footer-info">
                        <h3>MÁS INFORMACIÓN</h3>
                        <div className="container">
                            <div className="footer-links">
                                <h4>Compañia</h4>
                                <ul>
                                    <li><a href="#">Nosotros</a></li>
                                    <li><a href="#">Nuestros servicios</a></li>
                                    <li><a href="#">Políticas de privacidad</a></li>
                                    <li><a href="#">Afiliate</a></li>
                                </ul>
                            </div>
                            <div className="footer-links">
                                <h4>Tienda</h4>
                                <ul>
                                    <li><a href="#">Accesorios</a></li>
                                    <li><a href="#">Cámaras</a></li>
                                    <li><a href="#">Casas inteligentes</a></li>
                                    <li><a href="#">Videoporteros</a></li>
                                    <li><a href="#">Control de acceso</a></li>
                                </ul>
                            </div>
                            <div className="footer-links">
                                <h4>Ayuda</h4>
                                <ul>
                                    <li><a href="#">Preguntas frecuentes</a></li>
                                    <li><a href="#">Compras</a></li>
                                    <li><a href="#">Envíos</a></li>
                                    <li><a href="#">Estatus de orden</a></li>
                                    <li><a href="#">Pagos</a></li>
                                </ul>
                            </div>
                        </div>
                    </section>
                </div>
                
                <div className="footer-2">
                    <div className="last-line">
                        <h5>Todos los derechos reservados &copy; 2025 - AVIB TechStudio</h5>
                    </div>
                </div>
            
            </footer>
        </>
    )
}