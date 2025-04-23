import React from 'react'
import { useUser } from '../../context/UserContext'
import { Navigate } from 'react-router-dom';

export default function AdminGuard({children}) {

    const {user} = useUser();

    return (user?.role === "admin" ? children : <Navigate to="/" replace/>)
}
