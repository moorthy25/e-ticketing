import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import app from '../firebase';
import './history.css'
import { getLocal, setLocal } from './locals';

const db = getFirestore(app)
const History = () => {
    // const data = [
    //     {
    //         place: "Tiruchendur-Madurai",
    //         amt: 456,
    //         date: "25/04/2022",
    //         regNO: "TN 64 N 4564"
    //     },
    //     {
    //         place: "Tiruchendur-Tirunelveli",
    //         amt: 456,
    //         date: "25/04/2022",
    //         regNO: "TN 64 N 4564"
    //     },
    //     {
    //         place: "Tiruchendur-Tiruvannamalai",
    //         amt: 456,
    //         date: "25/04/2022",
    //         regNO: "TN 64 N 4564"
    //     },
    //     {
    //         place: "trichy-Madurai",
    //         amt: 456,
    //         date: "25/04/2022",
    //         regNO: "TN 64 N 4564"
    //     },
    //     {
    //         place: "Tiruchendur-Megnanapuram",
    //         amt: 456,
    //         date: "25/04/2022",
    //         regNO: "TN 64 N 4564"
    //     },
    // ]


    const [data, setData] = useState([]);
    console.log(data);
    useEffect(() => {
        getTransactions()
    }, []);
    const getTransactions = async () => {
        const docs = await getDocs(query(collection(db, 'transaction'), where("user.phone", "==", getLocal('user').phone)))
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
                        <div className="li-container" onClick={() => {
                            d.date = moment(d.date.toDate()).format("DD/MM/YYYY")
                            setLocal('trans', d)
                            navigate(`${d.paymentno}`)
                        }}>
                            <div className="li-row">
                                <div className="li-column">
                                    {d.paymentno}
                                    <span>
                                        {d.vehicleno}
                                    </span>
                                </div>
                                <div className="li-column">
                                    {/* {d.date.toStri} */}
                                    {moment(d.date.toDate()).format("DD/MM/YYYY")}
                                    {/* {console.log(d.date)} */}
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
                )}
            </div>
        </div>
    );
}

export default History;