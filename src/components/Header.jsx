import { Link } from "react-router-dom";
import './header.css'
import UserNavbar from "./UserNavbar";

const Header = ({ admin = false }) => {
    return (
        <div className="w100 headerContainer">
            {/* <h3>onTheGO</h3> */}
            {/* <div className=" h100 "> */}
                <UserNavbar />
            {/* </div> */}
        </div>
    );
}

export default Header;