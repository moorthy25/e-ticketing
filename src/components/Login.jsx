import './login.css';
import { Link } from "react-router-dom";
import Forms from "../generalComponent/Forms";
import loginImg from '../assets/login.svg';

const Login = () => {
    function values(arr) {
        console.log(arr);
    }
    return (
        <>
            <div className="center h75 column">
                <h1 className='t-center mb-1' style={{ color: "var(--color-secondary)" }}>Login</h1>
                <Forms onSubmit={values} className={'column center w30 loginForm'}>
                    <Forms.Input name={"username"} type={'text'} placeholder="USERNAME" />
                    <Forms.Input name={'password'} type={'password'} placeholder="PASSWORD" />
                    <div className="w100">
                        <div className="float-right">
                            <Link className="ws-nowrap fs1-5" to={'/forget'} >Forget password?</Link>
                        </div>
                    </div>
                    <div className="row w100">
                        <button className="btn primary t-center row">Login
                            <img src={loginImg} alt="Login" style={{ margin: "0 1rem", width: '2rem' }} />
                        </button>
                        {/* <button type="reset" className="btn secondary">Reset</button> */}
                    </div>
                    {/* <button className='btn primary ws-nowrap w100 p20'>Forgot Password?</button> */}
                </Forms>
            </div>
        </>
    );
}

export default Login;