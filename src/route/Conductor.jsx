import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import LoginCheck from "../components/loginCheck";

const Conductor = () => {
    LoginCheck({route:'conductor'})
    return (
        <>
            <Header conductor />
            <Outlet />
        </>
    );
}

export default Conductor;