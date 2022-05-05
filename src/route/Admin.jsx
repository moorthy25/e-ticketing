import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const Admin = () => {
    return (
        <>
            <Header />
            <Outlet />
        </>
    );
}

export default Admin;