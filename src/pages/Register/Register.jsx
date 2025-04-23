import axios from 'axios';
import OtroTitle from '../../components/Title/OtroTitle';
import '../register/Register.css';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { env } from '../../config/env.config';

export default function Register() {

    const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm({ mode: "onChange" });

    function getTime() {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    }

    async function addUser(datos) {
        //Petición asíncrona
        try {
            const newUser = {
                name: datos.name,
                correo: datos.correo,
                password: datos.pass,
                rePassword: datos.rePass,
                date: datos.date,
                country: datos.selection,
                observations: datos.obs
            };

            if (newUser.password !== newUser.rePassword) {
                alert("Las contraseñas no coinciden.");
                return;
            }

            await axios.post(`${env.URL}/users`, newUser);
            Swal.fire("¡Éxito!", "Usuario registrado con éxito", "success");
            reset();
        } catch (error) {
            Swal.fire("Error", `Hubo un problema al registrar el usuario. Error: ${error} `, "error");
        }
    }

    return (
        <>
            <OtroTitle title="REGISTRO" />

            <main className="main-container">
                <form className="register-form" onSubmit={handleSubmit(addUser)}>

                    <div className="input-group">
                        <label htmlFor="name">Nombre completo <span style={{"color": "red"}}>*</span></label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Ethan Jask"
                            {...register("name", { required: true, minLength: 2, maxLength: 20 })}
                        />
                        {errors.name && <span className="error">Nombre requerido (2-20 caracteres)</span>}
                    </div>

                    <div className="input-group">
                        <label htmlFor="correo">Correo electrónico <span style={{"color": "red"}}>*</span></label>
                        <input
                            type="email"
                            id="correo"
                            placeholder="info@dominio.com"
                            {...register("correo", {
                                required: "Este campo es obligatorio",
                                pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: "Correo electrónico inválido."
                                }
                            })}
                            />
                            {errors.correo && <span className="error">{errors.correo.message}</span>}

                    </div>

                    <div className="input-group">
                        <label htmlFor="pass">Contraseña <span style={{"color": "red"}}>*</span></label>
                        <input
                            type="password"
                            id="pass"
                            {...register("pass", { required: true, minLength: 6 })}
                        />
                        {errors.pass && <span className="error">Contraseña requerida (mín. 6 caracteres)</span>}
                    </div>

                    <div className="input-group">
                        <label htmlFor="rePass">Repetir contraseña <span style={{"color": "red"}}>*</span></label>
                        <input
                            type="password"
                            id="rePass"
                            {...register("rePass", { required: true })}
                        />
                        {errors.rePass && <span className="error">Repite la contraseña</span>}
                    </div>

                    <div className="input-group">
                        <label htmlFor="date">Fecha Nacimiento <span style={{"color": "red"}}>*</span></label>
                        <input
                            type="date"
                            id="date"
                            max={getTime()}
                            min="1920-01-20"
                            {...register("date", { required: true })}
                        />
                        {errors.date && <span className="error">Selecciona una fecha válida</span>}
                    </div>

                    <div className="input-group">
                        <label htmlFor="selection">País <span style={{"color": "red"}}>*</span></label>
                        <select id="selection" {...register("selection", { required: true })}>
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
                        <label htmlFor="obs">Observaciones</label>
                        <textarea
                            id="obs"
                            rows="5"
                            {...register("obs")}
                        ></textarea>
                    </div>

                    <button className="btn" type="submit" disabled={!isValid}>
                        {isValid ? "Registrar":"Completar datos"}
                    </button>
                </form>
            </main>
        </>
    );
}
