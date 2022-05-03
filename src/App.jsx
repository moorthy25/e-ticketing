import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Login from './components/Login';
import Home from './components/Home';
import NotFound from './NotFound';
import Admin from './route/Admin';
import Conductor from './route/Conductor';
import User from './route/User';
import History from './components/History';
import TicketDetails from './components/TicketDetails';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/user' element={<User />} >
          <Route path='history' element={<History />} />
          <Route path='history/:ticketID' element={<TicketDetails />} />
        </Route>
        <Route path='/admin' element={<Admin />} />
        <Route path='/conductor' element={<Conductor />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
