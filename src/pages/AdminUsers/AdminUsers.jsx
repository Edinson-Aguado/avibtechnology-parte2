import './AdminUsers.css';
import OtroTitle from '../../components/Title/OtroTitle';
import TableUsers from '../../components/TableUsers/TableUsers';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { env } from '../../config/env.config';

export default function AdminUsers() {

    // VARIABLES
    const [editUser, setEditUser] = useState(null);
    const { register, watch, handleSubmit, setValue, setFocus, reset, formState: { errors, isValid } } = useForm({mode:"onChange"});
    const [users, setUsers] = useState();
    const passwordValue = watch("password");

    function getTime() {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    }

    function formatDateToInputValue(dateInput) {
        const fecha = new Date(dateInput);
        if (isNaN(fecha)) return ""; // fallback si date es inválido
    
        const dia = String(fecha.getDate() + 1).padStart(2, '0');
        const mes = String(fecha.getMonth() + 1).padStart(2, '0');
        const año = fecha.getFullYear();
        return `${año}-${mes}-${dia}`;
    }
    
    useEffect(() => {
        
        getUsers();

    }, []); 

    useEffect(() => {

        if (editUser) {
            setValue("name", editUser?.name);
            setValue("email", editUser?.email);
            setValue("date", formatDateToInputValue(editUser?.date));
            setValue("country", editUser?.country);
            setValue("observations", editUser?.observations);

            // Llevar el scroll hacia arriba al formulario
            document.getElementById("formulario")?.scrollIntoView({behavior: "smooth"});
        } else {
            reset();
        }
        
    }, [editUser, reset, setValue]);

    //OBTENER LOS PRODUCTOS DESDE URL
    async function getUsers() {
        
        try {
            
            const response = await axios.get(`${env.URL_LOCAL}/users`);
            console.log(response.data);
            setUsers(response.data);
        } catch (error) {
            Swal.fire("¡Error!", `Hubo un problema al obtener los usurios: ${error.message}`, "error");
        }
    }

    //CREAR NUEVO PRODUCTO
    async function createUser(data) {
        
        try {
            
            if (editUser) {

                // Lógica para editar el post 
                const userUpdated = {
                    name: data.name,
                    email: data.email,
                    password: data.password,
                    date: data.date,
                    country: data.country,
                    observations: data.observations
                }
                
                const bearer = localStorage.getItem('token');
                await axios.put(`${env.URL_LOCAL}/users/${editUser._id}`, userUpdated, {
                    headers: {
                        Authorization: `Bearer ${bearer}`
                    }
                });
            
                setEditUser(null); //Seteamos nulo a estado del usuario que estamos editando.
                //Obtenemos los datos de los usuarios
                await getUsers();
                //Limpiamos le formulario
                reset()
                Swal.fire("Usuario editado", "El usuario fue editado correctamente", "success");
                
            } else {
                //Creo el nuevo producto en base a los datos del formulario
                if (isValid) {
                    const newUser = {
                        name: data.name,
                        email: data.email,
                        password: data.password,
                        date: data.date,
                        country: data.country,
                        observations: data.observations
                    }
                    await axios.post(`${env.URL_LOCAL}/users`, newUser);
                    
                    await getUsers();
                    reset();
                    Swal.fire("Usuario creado", "El usuario fue creado correctamente", "success");

                } else {
                    Swal.fire("Error", "Por favor, completa correctamente el formulario.", "error");
                }
                
            } 
            setFocus("name");

        } catch (error) {
            Swal.fire("¡Error!", `Hubo un problema: ${error.message}`, "error");
        }
    }

    //ELIMINAR PRODUCTO POR ID
    function deleteUser(id) {
        
        try {

            Swal.fire({
                title: "¿Estás seguro?",
                text: "¡No podrás recuperar este usuario!",
                icon: "warning",
                draggable: true,
                showCancelButton: true,
                cancelButtonText: "Cancelar",
                confirmButtonText: "Eliminar",
                confirmButtonColor: "#f00",
                cancelButtonColor: "#6c757d",
                reverseButtons: true,

            }).then(async(resultado) => {

                if (resultado.isConfirmed) {
                    await axios.delete(`${env.URL_LOCAL}/users/${id}`);
                    await getUsers();
                    Swal.fire("Usuario borrado!", "El usuario se ha borrado correctamente.", "success");
                }

            });
        } catch (error) {
            Swal.fire("¡Error!", `Hubo un problema: ${error.message}`, "error");
        }
    }

    function fnEditUser(user) {
        setEditUser(user);
    }
    //--------------------------------

    return (
        <>
            <OtroTitle title="Administrador de usuarios" />

            <div className="main-container-admin-users">
                <div className="formulario">
                    <form className="create-users" onSubmit={handleSubmit(createUser)}>

                        <div className="input-group">
                            <label htmlFor="name">Nombre completo</label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Ethan Craine"
                                {...register("name", { required: true, minLength: 2, maxLength: 20 })}
                            />
                            {errors.name && <span className="error">Nombre requerido (2-20 caracteres)</span>}
                        </div>

                        <div className="input-group">
                            <label htmlFor="email">Correo electrónico</label>
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
                            <label htmlFor="password">Contraseña</label>
                            <input
                                type="password"
                                id="password"
                                {...register("password", { required: true, minLength: 4 })}
                            />
                            {errors.password && <span className="error">Contraseña requerida (mín. 4 caracteres)</span>}
                        </div>

                        <div className="input-group">
                            <label htmlFor="rePass">Repetir contraseña</label>
                            <input
                                type="password"
                                id="rePass"
                                {...register("rePass", {
                                    required: true,
                                    validate: value => value === passwordValue || "Las contraseñas no coinciden"
                                })}
                            />
                            {errors.rePass && <span className="error">{errors.rePass.message}</span>}
                        </div>

                        <div className="input-group">
                            <label htmlFor="date">Fecha Nacimiento</label>
                            <input
                                type="date"
                                id="date"
                                defaultValue=""
                                max={getTime()}
                                min="1920-01-20"
                                {...register("date", { required: true })}
                            />
                            {errors.date && <span className="error">Selecciona una fecha válida</span>}
                        </div>

                        <div className="input-group">
                            <label htmlFor="country">País</label>
                            <select id="country" {...register("country", { required: true })}>
                                <option value="Argentina">Argentina</option>
                                <option value="Brasil">Brasil</option>
                                <option value="Venezuela">Venezuela</option>
                                <option value="Chile">Chile</option>
                                <option value="Colombia">Colombia</option>
                                <option value="Ecuador">Ecuador</option>
                                <option value="Bolivia">Bolivia</option>
                                <option value="Peru">Perú</option>
                                <option value="Paraguay">Paraguay</option>
                                <option value="Panama">Panamá</option>
                                <option value="Canada">Canadá</option>
                                <option value="Estados Unidos">Estados Unidos</option>
                            </select>
                        </div>

                        <div className="input-group">
                            <label htmlFor="observations">Notas</label>
                            <textarea
                                id="observations"
                                rows="5"
                                {...register("observations", {required: true, minLength: 10, maxLength: 100})}
                            ></textarea>
                            {errors.observations && <span className="error">Min: 10. Max: 100.</span>}
                        </div>
                        
                        <div className="btn-form">
                            <button className="btn" type="submit" disabled={!isValid}>
                                {editUser ? "Actualizar" : "Crear usuario"}
                            </button>
                            <button className="btn btn-clean" type="button" onClick={() => reset()}>
                                Limpiar datos
                            </button>
                        </div>
                        
                    </form>
                </div>
                
                <div className="table-container-user">
                    <table className="main-table-users">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Correo</th>
                                <th>Nacimiento</th>
                                <th>Pais</th>
                                <th>Notas</th>
                                <th>Herramientas</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                users && users.length > 0 ? (
                                    users.map((user) => (
                                        <TableUsers
                                            key={user._id} 
                                            user={user}
                                            deleteUser={deleteUser} 
                                            fnEditUser={fnEditUser}/>
                                    ))
                                ) : (
                                        <tr>
                                            <td colSpan="7" className="no-products">
                                                No hay usuarios disponibles.
                                            </td>
                                        </tr>
                                    )
                            }
                        </tbody>
                    </table>
                </div>
                                
            </div>
        </>
    )

}