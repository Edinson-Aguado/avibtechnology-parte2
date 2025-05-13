import OtroTitle from "../../components/Title/OtroTitle";
import './Contact.css';

export default function Contact() {
    return (
        <>
            <OtroTitle title="Contactar"/>

            <h2 className="subtitle-contact">Formulario de contacto</h2>
            
            <main className="main-container-contact">
                
                <div className="formulario-contact">
                    
                    <form className="contact-form">
                        <div className="input-group">
                            <label htmlFor="NOMBRE">Nombre completo</label>
                            <input 
                                type="text" name="nombre" id="NOMBRE" 
                                required minLength="4" maxLength="20"
                                pattern="^[a-zA-Z0-9]+$" 
                                autoFocus  placeholder="Jhon Wick" />
                        </div>
            
                        <div className="input-group">
                            <label htmlFor="correo">
                                Correo eletrónico
                            </label>
                            <input 
                                type="email" name="email" id="correo" 
                                pattern="[A-Za-z0-9._+\-']+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$"
                                placeholder="name@dominio.com" 
                                required/>
                        </div>
            
                        <div className="input-group">
                            <label htmlFor="obs">
                                Comentarios
                            </label>
                            <textarea 
                                name="obs" 
                                id="obs" 
                                rows="4">
                            </textarea>
                        </div>
            
                        <button 
                            className="btn" type="submit">
                            Contactar
                        </button>
            
                    </form>

                </div>

                <div className="mapa">
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2760.1484367996504!2d-58.39846536651309!3d-34.64489891131849!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccb6aeed57bd3%3A0xe5cec50209b9c4ad!2sEstadio%20Tom%C3%A1s%20Adolfo%20Duc%C3%B3!5e0!3m2!1ses!2sar!4v1727476055031!5m2!1ses!2sar" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </main>
        </>
    )
}
