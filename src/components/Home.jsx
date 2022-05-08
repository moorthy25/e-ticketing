import { useNavigate, useParams } from 'react-router-dom';
import Header from './Header'
import { getLocal } from "./locals";
import LoginCheck from './loginCheck';
import BookTicket from './user/BookTicket';
const Home = () => {
    LoginCheck({ login: true })
    const { vnum } = useParams()

    return (
        <>
            <Header home />
            <BookTicket vnum={vnum} />
        </>
    );
}

export default Home;