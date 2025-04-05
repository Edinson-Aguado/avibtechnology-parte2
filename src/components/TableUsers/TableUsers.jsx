import './TableUsers.css';

export default function TableUsers({user, deleteUser, fnEditUser}) {

    function getDate(milisegundos) {
        const fecha = new Date(milisegundos);
        const dia = String(fecha.getDate()).padStart(2, '0');
        const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Mes empieza en 0
        const año = fecha.getFullYear();
        return `${año}-${mes}-${dia}`;
    }

    return (
        <>
            {/* CUERPO DE LA TABLA */}
            <tr> 
                <td className="name-cell">
                    {user.name}
                </td>
                <td className="correo-cell">
                    <div className="correo-table">
                        {user.correo}
                    </div>
                </td>
                <td className="normal-cell">
                    {user.password}
                </td>
                <td className="normal-cell">
                    {getDate(user.date)}
                </td>
                <td className="country-cell">
                    {user.country}
                </td>
                <td className="obs-cell">
                    {user.observations}
                </td>
                <td className="actions-cell">
                    <div className="icon-container">
                        <button 
                            className="btn btn-edit" 
                            title="Editar elemento"
                            onClick={() => fnEditUser(user)}>
                            <i className="fa-solid fa-pencil"></i>
                        </button>

                        <button 
                            className="btn btn-danger" 
                            title="Eliminar elemento"
                            onClick={() => deleteUser(user.id)}>
                            <i className="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        </>
    )
}
