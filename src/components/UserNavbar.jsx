import { Link } from "react-router-dom";
import './userNavbar.css'
const UserNavbar = ({ }) => {
    return (
        <div className="navbar row">
            <Link to={'/login'}><button className="btn w100 p10 ws-nowrap c-secondary">Login</button></Link>
            <Link to={'history'}><button className="btn w100 p10 ws-nowrap c-secondary">Booking History</button></Link>
            <Link to={'BookTicket'}><button className="btn w100 p10 ws-nowrap c-secondary">Book Ticket</button></Link>
        </div>
    );
}

export default UserNavbar;