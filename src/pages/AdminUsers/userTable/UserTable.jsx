import TableUsers from "../../../components/TableUsers/TableUsers";
import './UserTable.css';

export default function UserTable({ users, loading, deleteUser, fnEditUser }) {
    return (
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
                {loading ? (
                    <tr>
                        <td colSpan="7" className="loading">Cargando usuarios...</td>
                    </tr>
                ) : users && users.length > 0 ? (
                    users.map((user) => (
                        <TableUsers
                            key={user._id}
                            user={user}
                            deleteUser={deleteUser}
                            fnEditUser={fnEditUser}
                        />
                    ))
                ) : (
                    <tr>
                        <td colSpan="7" className="no-products">No hay usuarios disponibles.</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}