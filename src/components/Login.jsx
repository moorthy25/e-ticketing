import './login.css';
import { Link, useNavigate } from "react-router-dom";
import Forms from "../generalComponent/Forms";
import loginImg from '../assets/login.svg';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useState } from 'react';
import LoginCheck from './loginCheck';
import { setLocal } from './locals';

const auth = getAuth();
const Login = () => {
    LoginCheck({ login: true })
    function values(arr) {
        console.log(arr);
    }
    // const phoneNumber = getPhoneNumberFromUserInput();
    const [phoneNumber, setPhoneNumber] = useState("");
    const [OTP, setOTP] = useState("");
    const [disabled, setDisabled] = useState(true);
    const sendOTP = () => {
        window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
            'size': 'invisible',
            'callback': (response) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                console.log("Captcha has done");
                console.log(response);
                // onSignInSubmit();
            }
        }, auth);
        const appVerifier = window.recaptchaVerifier;
        signInWithPhoneNumber(auth, `+91${phoneNumber}`, appVerifier)
            .then((confirmationResult) => {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                window.confirmationResult = confirmationResult;
                console.log(confirmationResult);
                setDisabled(false)
                // ...
            }).catch((error) => {
                // Error; SMS not sent
                // window.recaptchaVerifier.render().then(function (widgetId) {
                //     grecaptcha.reset(widgetId);
                // });
                alert("Something went wrong")
                console.log(error);
                // ...
            });
    }
    const navigate = useNavigate()
    const verifyOTP = () => {
        window.confirmationResult.confirm(OTP).then((result) => {
            // User signed in successfully.
            const user = result.user;
            console.log(user);
            setLocal("user", { userType: "user", phoneNumber: phoneNumber, name: "" })
            navigate('/user')
            // ...
        }).catch((error) => {
            // User couldn't sign in (bad verification code?)
            // ...
        });
    }
    return (
        <>
            <div className="center h75 column">
                <div className="absolute" style={{ top: 30, right: 50 }}>
                    <Link to={'admin'} className="btn primary fs1-5 ws-nowrap p10"> Staff </Link>
                </div>
                <h1 className='t-center mb-1' style={{ color: "var(--color-secondary)" }}>Login</h1>
                <Forms onSubmit={values} className={'column center w30 loginForm'}>
                    <Forms.Input name={"phone"} onChange={(e, v) => v.length <= 10 ? setPhoneNumber(v) : alert("Maximum length of phone number is 10")} value={phoneNumber} type={'number'} placeholder="Phone Number" />
                    <button type='button' disabled={!disabled} onClick={sendOTP} id='sign-in-button' className='btn primary w100'>Send OTP</button>
                    <Forms.Input disabled={disabled} name={'otp'} type={'text'} value={OTP} onChange={(e, v) => v.length <= 6 && setOTP(v)} placeholder="OTP" />
                    {/* <div className="w100">
                        <div className="float-right">
                            <Link className="ws-nowrap fs1-5" to={'/forget'} >Forget password?</Link>
                        </div>
                    </div> */}
                    <div className="row w100">
                        <button onClick={verifyOTP} className="btn primary w100 t-center row" disabled={disabled}>Login
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