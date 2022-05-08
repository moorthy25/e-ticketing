import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import LoginCheck from "../components/loginCheck";

const User = () => {
    LoginCheck({route:'user'})
    return (
        <>
            <Header user />
            <Outlet />
        </>
    );
}

export default User;