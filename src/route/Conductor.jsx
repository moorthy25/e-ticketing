import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const Conductor = () => {
    return (
        <>
            <Header conductor />
            <Outlet />
        </>
    );
}

export default Conductor;