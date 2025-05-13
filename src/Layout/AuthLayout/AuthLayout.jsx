import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

export default function AuthLayout({useWindowWidth}) {
    return (
        <>
            <Header useWindowWidth={useWindowWidth} />
            <main className="auth-layout">
                <Outlet/>
            </main>
        </>
        
    );
}
