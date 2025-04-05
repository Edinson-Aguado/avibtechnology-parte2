import './AdminUsers.css';
import OtroTitle from '../../components/Title/OtroTitle';
import TableUsers from '../../components/TableUsers/TableUsers';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { env } from '../../config/env.config';

export default function AdminProducts() {

    // VARIABLES
    const [editUser, setEditUser] = useState(null);
    const { register, handleSubmit, setValue, setFocus, reset, formState: { errors, isValid } } = useForm({mode:"onChange"});
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);

    function getTime() {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    }
    function getDate(milisegundos) {
        const fecha = new Date(milisegundos);
        const dia = String(fecha.getDate()).padStart(2, '0');
        const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Mes empieza en 0
        const año = fecha.getFullYear();
        return `${año}-${mes}-${dia}`;
    }
    
    useEffect(() => {
        
        getUsers();

    }, []); 

    useEffect(() => {

        if (editUser) {
            setValue("name", editUser?.name);
            setValue("correo", editUser?.correo);
            setValue("password", editUser?.password);
            setValue("rePassword", "");
            setValue("date", getDate(editUser?.date));
            setValue("country", editUser?.country);
            setValue("obs", editUser?.observations);

            // Llevar el scroll hacia arriba al formulario
            document.getElementById("form-create-product")?.scrollIntoView({behavior: "smooth"});
        } else {
            reset();
        }
        
    }, [editUser, reset, setValue]);

    //OBTENER LOS PRODUCTOS DESDE MOCKAPI
    async function getUsers() {
        try {
            setLoading(true);  // Inicia la carga
            const response = await axios.get(`${env.URL}/users`);
            setUsers(response.data);
        } catch (error) {
            Swal.fire("¡Error!", `Hubo un problema al obtener los usurios: ${error.message}`, "error");
        } finally {
            setLoading(false);  // Termina la carga, independientemente de si ocurrió un error o no
        }
    }

    //CREAR NUEVO PRODUCTO
    async function createUser(data) {
        
        try {
            setLoading(true);  // Inicia la carga (icono)
            if (editUser) {

                // Lógica para editar el post 
                const userToUpdate = {
                    name: data.name,
                    correo: data.correo,
                    password: data.password,
                    date: data.date,
                    country: data.country,
                    observations: data.obs
                }

                await axios.put(`${env.URL}/users/${editUser.id}`, userToUpdate);
            
                setEditUser(null); //Seteamos nulo a estado del usuario que estamos editando.
                //Obtenemos los datos de los usuarios
                await getUsers();
                //Limpiamos le formulario
                reset()
                Swal.fire("Usuario editado", "EL usuario fue editado correctamente", "success");
                
            } else {
                //Creo el nuevo producto en base a los datos del formulario
                if (isValid) {
                    const newUser = {
                        // El "ID" Ya se hace desde el servidor de Mokapi
                        name: data.name,
                        correo: data.correo,
                        password: data.password,
                        date: data.date,
                        country: data.country,
                        observations: data.obs
                    }
                    setLoading(true);  // Inicia la carga (icono)
                    await axios.post(`${env.URL}/users`, newUser);
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
        } finally {
            setLoading(false);  // Termina la carga
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
                    setLoading(true);
                    await axios.delete(`${env.URL}/users/${id}`);
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

            {loading && (
                <div className="spinner-overlay">
                    <div className="spinner"></div> 
                </div>
            )}

            <div className="main-container-admin-users">
                <div className="formulario">
                    <h3 className='title-user'>Crear nuevo usuario</h3>
                    <form className="create-users" onSubmit={handleSubmit(createUser)}>

                        <div className="input-group">
                            <label htmlFor="name">Nombre completo</label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Ethan Jask"
                                {...register("name", { required: true, minLength: 2, maxLength: 20 })}
                            />
                            {errors.name && <span className="error">Nombre requerido (2-20 caracteres)</span>}
                        </div>

                        <div className="input-group">
                            <label htmlFor="correo">Correo electrónico</label>
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
                            <label htmlFor="password">Contraseña</label>
                            <input
                                type="password"
                                id="password"
                                {...register("password", { required: true, minLength: 6 })}
                            />
                            {errors.pass && <span className="error">Contraseña requerida (mín. 6 caracteres)</span>}
                        </div>

                        <div className="input-group">
                            <label htmlFor="rePass">Repetir contraseña</label>
                            <input
                                type="password"
                                id="rePass"
                                {...register("rePass", { required: true })}
                            />
                            {errors.rePass && <span className="error">Repite la contraseña</span>}
                        </div>

                        <div className="input-group">
                            <label htmlFor="date">Fecha Nacimiento</label>
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
                            <label htmlFor="country">País</label>
                            <select id="country" {...register("country", { required: true })}>
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
                                {...register("obs", {required: true, maxLength: 20})}
                            ></textarea>
                            {errors.obs && <span className="error">Límite de caracteres: 20.</span>}
                        </div>

                        <button className="btn" type="submit" disabled={!isValid}>
                            {isValid ? "Registrar":"Faltan datos"}
                        </button>
                    </form>
                </div>
                
                <div className="table-container-user">
                    <table className="main-table-users">
                        <thead>
                            <tr>
                                <th>NAME</th>
                                <th>CORREO</th>
                                <th>CONTRASEÑA</th>
                                <th>FECHA NACIMIENTO</th>
                                <th>PAIS</th>
                                <th>OBSERVACIONES</th>
                                <th>ACCIONES</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                users && users.length > 0 ? (
                                    users.map((user) => (
                                        <TableUsers
                                            key={user.id} 
                                            user={user}
                                            deleteUser={deleteUser} 
                                            fnEditUser={fnEditUser}/>
                                    ))
                                ) : (
                                        <tr>
                                            <td colSpan="5" className="no-products">
                                                No hay productos disponibles.
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