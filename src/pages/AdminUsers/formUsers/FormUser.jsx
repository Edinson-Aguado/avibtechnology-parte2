import './FormUser.css';

export default function FormUser({
    register,
    handleSubmit,
    errors,
    isValid,
    passwordValue,
    createUser,
    reset,
    editUser,
    setEditUser,
    getTime
}) {
    return (
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
                        })
                    }
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
                <label htmlFor="rePassword">Repetir contraseña</label>
                <input
                    type="password"
                    id="rePassword"
                    {...register("rePassword", {
                        required: true,
                        validate: value => value === passwordValue || "Las contraseñas no coinciden"
                    })}
                />
                {errors.rePassword && <span className="error">{errors.rePassword.message}</span>}
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
                <label htmlFor="image-perfil">Imagen de perfil</label>
                <input
                    type="file"
                    name="imageProfile"
                    id="imageProfile"
                    accept="image/*"
                    {...register("imageProfile", {
                        required: "La imagen es requerida"
                    })}
                />

            </div>

            <div className="input-group">
                <label htmlFor="observations">Notas</label>
                <textarea
                    id="observations"
                    rows="5"
                    {...register("observations", {minLength: 10, maxLength: 100})}
                ></textarea>
                {errors.observations && <span className="error">Min: 10. Max: 100.</span>}
            </div>
            
            <div className="btn-form">
                <button className="btn" type="submit" disabled={!isValid}>
                    {editUser ? "Actualizar" : "Crear usuario"}
                </button>
                <button className="btn btn-clean" type="button" onClick={() => {
                    reset();
                    setEditUser(null);
                }}>
                    Limpiar datos
                </button>
            </div>
        </form>
    );
}