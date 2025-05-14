import './AdminUsers.css';
import OtroTitle from '../../components/Title/OtroTitle';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { env } from '../../config/env.config';
import FormUser from './formUsers/formUser';
import UserTable from './userTable/UserTable';
import LoadingOverlay from '../../components/LoadingOverlay/LoadingOverlay';

export default function AdminUsers() {

    // VARIABLES
    const [editUser, setEditUser] = useState(null);
    const { register, watch, handleSubmit, setValue, setFocus, reset, formState: { errors, isValid } } = useForm({mode:"onChange"});
    const [users, setUsers] = useState();
    const passwordValue = watch("password");
    const [isLoading, setIsLoading] = useState(false);


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
    
        const dia = String(fecha.getDate()).padStart(2, '0');
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

    //OBTENER LOS PRODUCTOS DESDE EL SERVIDOR
    async function getUsers() {
        try {
            setIsLoading(true); // comienza la carga
            const bearer = localStorage.getItem('token'); // Obtener el token
            const response = await axios.get(`${env.URL_LOCAL}/users`, {
                headers: {
                    Authorization: `Bearer ${bearer}`
                }
            });
            setUsers(response.data);
        } catch (error) {
            Swal.fire("¡Error!", `Hubo un problema al obtener los usuarios: ${error.message}`, "error");
        } finally {
            setIsLoading(false); // Desactivar loading
        }
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

        if (data.image?.length && data.image[0] instanceof File) {
                x.append("image", data.image[0]);
        }
        
        x.append('observations', data.observations);
        return x;
    }

    //CREAR NUEVO USUARIO
    async function createUser(data) {
        
        
        try {
            const formData = builtNewFormData(data);
            if (!formData) return;
            setIsLoading(true);
            const bearer = localStorage.getItem('token');
            if (editUser) {
                
                await axios.put(`${env.URL_LOCAL}/users/${editUser._id}`, formData, {
                    headers: {
                        Authorization: `Bearer ${bearer}`
                    }
                });

                //Seteamos nulo a estado del usuario que estamos editando.
                setEditUser(null); 

                //Obtenemos los datos de los usuarios
                await getUsers();

                //Limpiamos le formulario
                reset()

                //Mostramos un mensaje 
                Swal.fire("Usuario editado", "El usuario fue editado correctamente", "success");
            } else {

                //Creo el nuevo usuario en base a los datos del formulario
                //Validamos si es valido
                if (isValid) {

                    await axios.post(`${env.URL_LOCAL}/users`, formData, {
                        headers: {
                            Authorization: `Bearer ${bearer}`
                        }
                    });

                    await getUsers();
                    reset();
                    Swal.fire("Usuario creado", "El usuario fue creado correctamente", "success");

                } else {
                    Swal.fire("Error", "Por favor, completa correctamente el formulario.", "error");
                }
                
            } 
            setFocus("name");
        } catch (error) {
            Swal.fire("Error", error.response?.data?.message || "Hubo un problema al registrarse.", "error");
        } finally {
            setIsLoading(false);
        }
    }

    //ELIMINAR USUARIO POR ID
    async function deleteUser(id) {
    try {
        const bearer = localStorage.getItem('token'); // Obtener el token desde el localStorage
        
        // Verificar si el token está presente
        if (!bearer) {
            return Swal.fire("¡Error!", "No estás autenticado. Por favor inicia sesión.", "error");
        }

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
                await axios.delete(`${env.URL_LOCAL}/users/${id}`, {
                    headers: {
                        Authorization: `Bearer ${bearer}`, // Asegúrate de incluir el token aquí
                    }
                });
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
                <div className="formulario" id="formulario">


                    {/* Formulario para crear un nuevo usuario */}
                    <FormUser
                        register={register}
                        handleSubmit={handleSubmit}
                        errors ={errors}
                        isValid={isValid}
                        passwordValue={passwordValue}
                        createUser={createUser}
                        reset={reset}
                        editUser={editUser}
                        setEditUser={setEditUser}
                        getTime={getTime}
                    />

                </div>
                
                <div className="table-container-user">

                    {/* Tabla de usuarios */}
                    <UserTable
                        users={users}
                        isLoading={isLoading}
                        deleteUser={deleteUser}
                        fnEditUser={fnEditUser}
                    />

                </div>

            </div>

            <LoadingOverlay isLoading={isLoading} text={editUser ? "Guardando cambios..." : "Cargando..."} />

        </>
    )

}