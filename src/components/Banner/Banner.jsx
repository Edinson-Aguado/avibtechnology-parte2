import './Banner.css';
import banner from "../../assets/images/banner.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldAlt, faLock, faLightbulb, faShield, faArrowRight } from '@fortawesome/free-solid-svg-icons';

export default function Banner() {


    return (
        <>
            
            <div className="top-strip">
                <FontAwesomeIcon icon={faShieldAlt} /> Garantía oficial EZVIZ incluida
            </div>

            <section className="section-banner">

                
                <div className="slider-messages">
                    <div className="slider-track">
                        <span><FontAwesomeIcon icon={faLock} /> Tecnología de vanguardia para tu hogar</span>
                        <span><FontAwesomeIcon icon={faLightbulb} /> Cámaras inteligentes con visión nocturna</span>
                        <span><FontAwesomeIcon icon={faShield} /> Protegé lo que más querés con AVIB</span>
                    </div>
                </div>

                <h1 id='avib-title'>SOMOS AVIB</h1>

                {/* Imagen del banner principal */}
                <div className="banner">
                    <img loading="lazy" src={banner} alt="Imágen del banner" className="imagen" />
                    <div className="bottom-glow-line" />
                    
                    <a href="/ProductsPage" className="cta-button">
                        Ver productos <FontAwesomeIcon icon={faArrowRight} />
                    </a>

                </div>

            </section>
        </>
    );
}
