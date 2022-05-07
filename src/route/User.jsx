import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const User = () => {
    return (
        <>
            <Header user />
            <Outlet />
        </>
    );
}

export default User;