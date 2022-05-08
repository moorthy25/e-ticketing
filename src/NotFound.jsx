import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <h1 className="center column h50">404 Page Not Found
            <Link to={'/'}><button className="btn mt-10 secondary ws-nowrap w-max p10">HOME</button></Link>
        </h1>
    );
}

export default NotFound;