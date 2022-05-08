import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getLocal } from "./locals";

function LoginCheck({ route, login }) {
    // console.log(route);
    const navigate = useNavigate()
    const user = getLocal('user')
    // ?.userType
    useEffect(() => {
        if (user) {
            const { userType } = user
            if (login && userType)
                navigate(`/${userType}`)
            if (userType !== route) {
                navigate(`/${userType}`)
            }
        }
        else if (route) {
            navigate("/")
        }
    }, [user])
    return <></>
}

export default LoginCheck