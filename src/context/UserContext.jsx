import axios from "axios";
import { useEffect, useState, createContext, useContext } from "react";
import Swal from "sweetalert2";
import { env } from '../config/env.config';
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const UserContext = createContext();
export const useUser = () => useContext(UserContext);

export default function UserProvider({ children }) {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // Axios con interceptor
    useEffect(() => {
        const axiosInstance = axios.create();

        axiosInstance.interceptors.response.use(
            response => response,
            error => {
                if (error.response?.status === 401) {
                    logout(true); // Expiración
                }
                return Promise.reject(error);
            }
        );

        // Si querés usar este axiosInstance en todo el proyecto,
        // podés exportarlo desde un archivo como "api.js"

    }, []);

    // Guardar user/token en localStorage
    useEffect(() => {
        if (user) localStorage.setItem("user", JSON.stringify(user));
        else localStorage.removeItem("user");

        if (token) localStorage.setItem("token", token);
        else localStorage.removeItem("token");
    }, [user, token]);

    // Detectar token expirado al cargar la app
    useEffect(() => {
        if (token) {
            try {
                const decoded = jwtDecode(token);
                if (decoded.exp * 1000 < Date.now()) {
                    logout(true); // Token expirado
                } else {
                    setUser(JSON.parse(localStorage.getItem("user"))); // opcional
                }
            } catch (err) {
                console.error("Token inválido", err);
                logout(true);
            }
        }
    }, []);

    async function login(data) {
        setIsLoading(true);
        try {
            const response = await axios.post(`${env.URL_LOCAL}/login`, data);
            const { user, token } = response.data;
            setUser(user);
            setToken(token);
            Swal.fire({
                icon: 'success',
                title: 'Login exitoso',
                text: `Bienvenido, ${user.name}`,
                timer: 2000,
                showConfirmButton: false
            }).then(() => {
                navigate('/');
            });
        } catch (error) {
            console.log("Error during login: ", error);
            Swal.fire({
                icon: "error",
                title: "Login fallido",
                text: error.response?.data?.message || "Error desconocido"
            });
        } finally {
            setIsLoading(false);
        }
    }

    function logout(fromExpiration = false) {
        setUser(null);
        setToken(null);
        if (fromExpiration) {
            Swal.fire({
                icon: "info",
                title: "Sesión expirada",
                text: "Tu sesión ha caducado. Por favor, inicia sesión nuevamente.",
            }).then(() => {
                navigate('/login');
            });
        } else {
            navigate('/login');
        }
    }

    return (
        <UserContext.Provider
            value={{
                login,
                logout,
                user,
                token,
                isLoading
            }}>
            {children}
        </UserContext.Provider>
    );
}
