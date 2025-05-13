import axios from 'axios';
import OtroTitle from '../../components/Title/OtroTitle';
import '../register/Register.css';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { env } from '../../config/env.config';

export default function Register() {

    const { register, handleSubmit, watch, reset, formState: { errors, isValid } } = useForm({ mode: "onChange" });

    function getTime() {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    }

    // Contruir el FormData() para enviar los datos del formulario en él
    function builtNewFormData(data) {
        if (data.password !== data.rePassword) {
            Swal.fire("Error", "¡Las contraseñas no coinciden!", "error");
            return null;
        }
        
    
        const x = new FormData();
        x.append('name', data.name);
        x.append('email', data.email);
        x.append('password', data.password);
        x.append('date', data.date);
        x.append('country', data.country);
        if (data.imageProfile?.[0]) {
            x.append('imageProfile', data.imageProfile[0]);
        }
        x.append('observations', data.observations);
        return x;
    }
    

    // Añadir un nuevo usuario
    async function addUser(datos) {
        const formData = builtNewFormData(datos);
        if (!formData) return;
        //Petición asíncrona
        try {

            await axios.post(`${env.URL}/users`, formData);
            Swal.fire("¡Éxito!", "Te has registrado con éxito", "success");
            reset();
        } catch (error) {
            console.log(error);
            Swal.fire("Error", error.response?.data?.message || "Hubo un problema al registrarse.", "error");
        }
    }

    return (
        <>
            <OtroTitle title="REGISTRARSE" />

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
                        <label htmlFor="email">Correo electrónico <span style={{"color": "red"}}>*</span></label>
                        <input
                            type="email"
                            id="email"
                            placeholder="info@dominio.com"
                            {...register("email", {
                                required: "Este campo es obligatorio",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: "Correo electrónico inválido."
                                }
                            })}
                        />
                        {errors.email && <span className="error">{errors.email.message}</span>}

                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Contraseña <span style={{"color": "red"}}>*</span></label>
                        <input
                            type="password"
                            id="password"
                            {...register("password", { required: true, minLength: 6 })}
                        />
                        {errors.password && <span className="error">Contraseña requerida (mín. 6 caracteres)</span>}
                    </div>

                    <div className="input-group">
                        <label htmlFor="rePassword">Repetir contraseña <span style={{"color": "red"}}>*</span></label>
                        <input
                            type="password"
                            id="rePassword"
                            {...register("rePassword", {
                                required: true,
                                validate: (value) => value === watch("password") || "Las contraseñas no coinciden"
                            })}
                        />
                        {errors.rePassword && <span className="error">Repite la contraseña</span>}
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
                        <label htmlFor="country">País <span style={{"color": "red"}}>*</span></label>
                        <select defaultValue="" id="country" {...register("country", { required: true })}>
                            <option value="" disabled>Seleccionar país</option>
                            <option value="Argentina">Argentina</option>
                            <option value="Brasil">Brasil</option>
                            <option value="Venezuela">Venezuela</option>
                            <option value="Chile">Chile</option>
                            <option value="Colombia">Colombia</option>
                            <option value="Ecuador">Ecuador</option>
                            <option value="Bolivia">Bolivia</option>
                            <option value="Perú">Perú</option>
                            <option value="Paraguay">Paraguay</option>
                            <option value="Panamá">Panamá</option>
                            <option value="Canadá">Canadá</option>
                            <option value="Estados Unidos">Estados Unidos</option>
                        </select>
                    </div>

                    <div className="input-group">
                        <label htmlFor="imageProfile">Imagen de perfil</label>
                        <input
                            type="file"
                            id="imageProfile"
                            {...register("imageProfile")}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="observations">Observaciones</label>
                        <textarea
                            id="observations"
                            rows="5"
                            {...register("observations")}
                        ></textarea>
                    </div>

                    <button className="btn" type="submit" disabled={!isValid}>
                        {isValid ? "Registrarse":"Completar datos"}
                    </button>
                </form>
            </main>
        </>
    );
}
