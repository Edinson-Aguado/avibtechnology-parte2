import OtroTitle from '../../components/Title/OtroTitle';
import './Register.css';

export default function Register() {
    return (
        <>
            <OtroTitle title="REGISTRAR"/>
            <hr/>
            
            <main className="main-container">
                
                <form className="register-form">

                    <div className="input-group">

                        <label 
                            htmlFor="NOMBRE">
                                Nombre completo
                        </label>
                        <input 
                            type="text" 
                            name="nombre" 
                            id="NOMBRE" 
                            required 
                            minLength="4" 
                            maxLength="20"
                            pattern="^[a-zA-Z0-9 ]+$" 
                            autoFocus  
                            placeholder="Ethan Jask"
                            />

                    </div>

                    <div className="input-group">
                        <label htmlFor="correo">
                            Correo electrónico
                        </label>
                        <input 
                            type="email" name="email" 
                            id="correo" 
                            pattern="[A-Za-z0-9._+\-']+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$"
                            placeholder="info@dominio.com" 
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label 
                            htmlFor="pass"
                        >
                            Contraseña
                        </label>
                        <input 
                            type="password" id="pass" name="contraseña" required
                        />
                    </div>

                    <div className="input-group">

                        <label htmlFor="re-pass">
                            Repetir contraseña
                        </label>
                        <input 
                            type="password" id="re-pass" name="contraseña" required 
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="fecha">
                            Fecha Nacimiento
                        </label>
                        <input 
                            type="date" 
                            id="fecha" name="nacimiento" min="1900-01-20" max="2024-11-1" 
                            required 
                        />
                    </div>

                    <div className="input-group">
                        <label>Pais</label>
                        <select name="" id="">
                            <option value=""></option>
                            <option value="arg">Argentina</option>
                            <option value="bra">Brasil</option>
                            <option value="ven">Venezuela</option>
                            <option value="chi">Chile</option>
                            <option value="col">Colombia</option>
                            <option value="ecu">Ecuador</option>
                            <option value="bol">Bolivia</option>
                            <option value="per">Perú</option>
                            <option value="par">Paraguay</option>
                            <option value="pan">Panamá</option>
                            <option value="can">Canadá</option>
                            <option value="eu">Estados Unidos</option>
                        </select>
                    </div>

                    <div className="input-group">
                        <label 
                            htmlFor="obs"
                        >
                            Observaciones
                        </label>
                        <textarea 
                            name="obs" 
                            id="obs" 
                            rows="5"
                        ></textarea>
                    </div>

                    <button 
                        className="btn" type="submit">
                            Registrar
                    </button>

                </form>
            </main>
        </>
    )
}
