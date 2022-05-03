import Admin from "./route/Admin";
import Conductor from "./route/Conductor";

const Routes = () => {
    const uType = localStorage.getItem('userType');
    return (
        <>
            {uType === "admin" && <Admin />}
            {uType === "user" && <User />}
            {uType === "conductor" && <Conductor />}
        </>
    );
}

export default Routes;