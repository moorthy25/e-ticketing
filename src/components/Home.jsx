import { useNavigate } from 'react-router-dom';
import Header from './Header'
import { getLocal } from "./locals";
import LoginCheck from './loginCheck';
import BookTicket from './user/BookTicket';
const Home = () => {
    LoginCheck({ login: true })
    // const navigate = useNavigate()
    // if ()
    //     // console.log();
    //     navigate()
    return (
        <>
            <Header home />
            <BookTicket />
        </>
    );
}

export default Home;