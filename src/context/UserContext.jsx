import axios from "axios";
import { useEffect, useState } from "react";
import { createContext, useContext } from "react";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);


export default function UserProvider({children}) {

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {

        user ? 
            localStorage.setItem("user", JSON.stringify(user)) 
            : 
            localStorage.removeItem("user");

        token ?
            localStorage.setItem("token", JSON.stringify(token)) 
            : 
            localStorage.removeItem("token");

    }, [user, token])

    async function login(data) {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/login`, data);
            
            const {user, token} = response.data;
            setUser(user);
            setToken(token);
            
        } catch (error) {
            console.log("Error during login: ", error);
            
        }
    }

    function logout(){
        setUser(null);
        setToken(null);
    }

    return (
        <UserContext.Provider 
            value={{
                login,
                user, 
                token,
                logout
            }}>
            {children}
        </UserContext.Provider>
    )
}