// import { Link } from "react-router-dom";
import './header.css'
import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/logo.svg'
import logout from '../assets/logout.svg'
import login from '../assets/login.svg'
import Forms from '../generalComponent/Forms';
import { removeLocal } from './locals';

const Header = ({ admin = false, home = false, user = false, conductor = false }) => {
    const navigate = useNavigate()
    const buses = [
        "TN 64 N 4564",
        "TN 64 N 4564",
        "TN 64 N 4564",
        "TN 64 N 4564"
    ]
    return (
        <div className="w100 headerContainer">
            {/* <h3>onTheGO</h3> */}
            {/* <div className=" h100 "> */}
            <>
                <div className="navbar row">
                    <img src={logo} alt="Logo" />
                    {user && <div className="row nav-group">
                        <button className="btn secondary ws-nowrap" disabled>TN 69 N 4656</button>
                        {/* <Link to={'/login'}><button className="btn w100 p10 ws-nowrap c-secondary">Login</button></Link> */}
                        <Link to={'history'}><button className="btn w100 p10 ws-nowrap c-secondary">Ticket History</button></Link>
                        <Link to={'BookTicket'}><button className="btn w100 p10 ws-nowrap c-secondary">GET Ticket</button></Link>
                    </div>}
                    {conductor && <div className="row nav-group">
                        <button className="btn secondary ws-nowrap" disabled>TN 69 N 4656</button>
                        {/* <Link to={'/login'}><button className="btn w100 p10 ws-nowrap c-secondary">Login</button></Link> */}
                        <Link to={''}><button className="btn w100 p10 ws-nowrap c-secondary">Transactions</button></Link>
                        {/* <Link to={'BookTicket'}><button className="btn w100 p10 ws-nowrap c-secondary">GET Ticket</button></Link> */}
                    </div>}
                    {admin && <div className="row nav-group">
                        {/* <button className="btn secondary ws-nowrap" disabled>TN 69 N 4656</button> */}
                        <Forms.Select className={'btn primary'} onChange={(e, v) => console.log(v)}>
                            {buses.map((v, i) => <Forms.Option key={i} value={v}>{v}</Forms.Option>)}
                        </Forms.Select>
                        {/* <Link to={'/login'}><button className="btn w100 p10 ws-nowrap c-secondary">Login</button></Link> */}
                        <Link to={'transaction'}><button className="btn w100 p10 ws-nowrap c-secondary">Transactions</button></Link>
                        <Link to={'Buses'}><button className="btn w100 p10 ws-nowrap c-secondary">Buses</button></Link>
                        <Link to={'Routes'}><button className="btn w100 p10 ws-nowrap c-secondary">Routes</button></Link>
                        <Link to={'QR'}><button className="btn w100 p10 ws-nowrap c-secondary">QR code</button></Link>
                        <Link to={'staff'}><button className="btn w100 p10 ws-nowrap c-secondary">Staff</button></Link>
                        {/* <Link to={'BookTicket'}><button className="btn w100 p10 ws-nowrap c-secondary">GET Ticket</button></Link> */}
                    </div>}
                    {home ? <div><Link to={'/login'} className='btn secondary p10'>Login</Link> </div> :
                        <img onClick={() => {
                            removeLocal('user')
                            navigate('/')
                        }} src={logout} alt="logout" />}
                </div>
            </>
            {/* </div> */}
        </div>
    );
}

export default Header;