import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import app from '../firebase';
import './history.css'
import { getLocal, setLocal } from './locals';
import moment from 'moment';

const db = getFirestore(app)

const HistoryVerification = ({ admin }) => {
    // const data = [
    //     {
    //         place: "Tiruchendur-Madurai",
    //         amt: 456,
    //         date: "25/04/2022",
    //         regNO: "TN 64 N 4564",
    //         name: "Mr.Kumaran",
    //         phoneNO: "9876543210"
    //     },
    //     {
    //         place: "Tiruchendur-Tirunelveli",
    //         amt: 456,
    //         date: "25/04/2022",
    //         regNO: "TN 64 N 4564",
    //         name: "Mr.Kumaran",
    //         phoneNO: "9876543210"
    //     },
    //     {
    //         place: "Tiruchendur-Tiruvannamalai",
    //         amt: 456,
    //         date: "25/04/2022",
    //         regNO: "TN 64 N 4564",
    //         name: "Mr.Kumaran",
    //         phoneNO: "9876543210"
    //     },
    //     {
    //         place: "trichy-Madurai",
    //         amt: 456,
    //         date: "25/04/2022",
    //         regNO: "TN 64 N 4564",
    //         name: "Mr.Kumaran",
    //         phoneNO: "9876543210"
    //     },
    //     {
    //         place: "Tiruchendur-Megnanapuram",
    //         amt: 456,
    //         date: "25/04/2022",
    //         regNO: "TN 64 N 4564",
    //         name: "Mr.Kumaran",
    //         phoneNO: "9876543210"
    //     },
    // ]




    const [data, setData] = useState([]);
    console.log(data);
    useEffect(() => {
        getTransactions()
    }, []);
    const getTransactions = async () => {
        const q = admin ? query(collection(db, 'transaction')) : query(collection(db, 'transaction'), where("vehicleno", "==", getLocal('user').currentVehicle))
        const docs = await getDocs(q)
        const li = []
        docs.forEach(d => li.push({ ...d.data(), id: d.id }))
        setData(li)
    }

    const navigate = useNavigate()



    return (
        <div className="center bookHistory">
            <div className="list">
                {data.map(
                    (d, i) =>
                        // <Link to={`ticket/${d.paymentno}`}>
                        <div className="li-container" onClick={() => {
                            d.date = moment(d.date.toDate()).format("DD/MM/YYYY")
                            setLocal('trans', d)
                            navigate(`ticket/${d.paymentno}`)
                        }}>
                            <div className="li-row">
                                <div className="li-column">
                                    {d.paymentno}
                                    <span>
                                        {moment(d.date.toDate()).format("DD/MM/YYYY")}
                                    </span>
                                </div>
                                <div className="li-column">
                                    {d.user.name} - {d.user.phone}
                                </div>
                                <div className="li-column">
                                    ₹{d.amt}
                                </div>
                            </div>
                            <div className="li-row">
                                <div className="li-column">
                                    {d.from} - {d.to}
                                </div>
                            </div>
                        </div>
                    // </Link>
                )}
            </div>
        </div>
    );
}

export default HistoryVerification;