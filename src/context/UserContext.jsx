import axios from "axios";
import { useEffect, useState } from "react";
import { createContext, useContext } from "react";
import Swal from "sweetalert2";
import {env} from '../config/env.config';
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);


export default function UserProvider({children}) {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [token, setToken] = useState(localStorage.getItem('token'));
    const navigate = useNavigate();


    useEffect(() => {

        if (user) { 
            localStorage.setItem("user", JSON.stringify(user)) 
        } else { 
            localStorage.removeItem("user");
        }

        if (token) {
            localStorage.removeItem("token");
            localStorage.setItem("token", JSON.stringify(token))
        } else {
            localStorage.removeItem("token");
        }
    }, [user, token])

    async function login(data) {
        try {
            const response = await axios.post(`${env.URL_LOCAL}/login`, data);
            
            const {user, token} = response.data;
            setUser(user);
            setToken(token);
            Swal.fire({
                icon: 'success',
                title: 'Login successful',
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
                title: "Login failed",
                text: error.response.message.data
            })
        }
    }

    function logout() {
    
        setTimeout(() => {
            setUser(null);
            setToken(null);
        }, 500);
    }
    

    return (
        <UserContext.Provider 
            value={{
                login,
                user, 
                token,
                logout,
            }}>
            {children}
        </UserContext.Provider>
    )
}