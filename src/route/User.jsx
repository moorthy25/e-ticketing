import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const User = () => {
    return (
        <>
            <Header />
            <Outlet />
        </>
    );
}

export default User;