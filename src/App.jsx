import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import './firebase'
import Login from './components/Login';
import Home from './components/Home';
import NotFound from './NotFound';
import Admin from './route/Admin';
import Conductor from './route/Conductor';
import User from './route/User';
import History from './components/History';
import TicketDetails from './components/TicketDetails';
import BookTicket from './components/user/BookTicket';
import Buses from './components/admin/Buses';
import RoutePrice from './components/admin/RoutePrice';
import HistoryVerification from './components/HistoryVerification';
import QRGenarator from './components/admin/QRGenarator';
import Staff from './components/admin/Staff';
import LoginAdmin from './components/Login Admin';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/vehicle/:vnum' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/login/admin' element={<LoginAdmin />} />
        <Route path='/user' element={<User />} >
          <Route path='BookTicket' index element={<BookTicket />} />
          <Route path='history' element={<History />} />
          <Route path='history/:ticketID' element={<TicketDetails />} />
        </Route>
        <Route path='/admin' element={<Admin />} >
          <Route path='transaction' element={<HistoryVerification admin />} />
          <Route path='transaction/ticket/:id' element={<TicketDetails admin />} />
          <Route path='buses' element={<Buses />} />
          <Route path='QR' element={<QRGenarator />} />
          <Route path='staff' element={<Staff />} />
          <Route path='routes' element={<RoutePrice />} />
        </Route>
        <Route path='/conductor' element={<Conductor />} >
          <Route path='' element={<HistoryVerification />} />
          <Route path='ticket/:id' element={<TicketDetails />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
