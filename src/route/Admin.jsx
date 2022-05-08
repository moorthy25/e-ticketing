import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import LoginCheck from "../components/loginCheck";

const Admin = () => {
    LoginCheck({ route: 'admin' })
    return (
        <>
            <Header admin />
            <Outlet />
        </>
    );
}

export default Admin;