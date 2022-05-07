import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const Admin = () => {
    return (
        <>
            <Header admin />
            <Outlet />
        </>
    );
}

export default Admin;