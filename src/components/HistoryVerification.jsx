import { Link } from 'react-router-dom';
import './history.css'

const HistoryVerification = () => {
    const data = [
        {
            place: "Tiruchendur-Madurai",
            amt: 456,
            date: "25/04/2022",
            regNO: "TN 64 N 4564",
            name: "Mr.Kumaran",
            phoneNO: "9876543210"
        },
        {
            place: "Tiruchendur-Tirunelveli",
            amt: 456,
            date: "25/04/2022",
            regNO: "TN 64 N 4564",
            name: "Mr.Kumaran",
            phoneNO: "9876543210"
        },
        {
            place: "Tiruchendur-Tiruvannamalai",
            amt: 456,
            date: "25/04/2022",
            regNO: "TN 64 N 4564",
            name: "Mr.Kumaran",
            phoneNO: "9876543210"
        },
        {
            place: "trichy-Madurai",
            amt: 456,
            date: "25/04/2022",
            regNO: "TN 64 N 4564",
            name: "Mr.Kumaran",
            phoneNO: "9876543210"
        },
        {
            place: "Tiruchendur-Megnanapuram",
            amt: 456,
            date: "25/04/2022",
            regNO: "TN 64 N 4564",
            name: "Mr.Kumaran",
            phoneNO: "9876543210"
        },
    ]
    return (
        <div className="center bookHistory">
            <div className="list">
                {data.map(
                    (d, i) =>
                        <Link to={`ticket/${i}`}>
                            <div className="li-container">
                                <div className="li-row">
                                    <div className="li-column">
                                        #{i + 1}654
                                        <span>
                                            {d.date}
                                        </span>
                                    </div>
                                    <div className="li-column">
                                        {d.name}
                                        {d.phoneNO}
                                    </div>
                                    <div className="li-column">
                                        ₹{d.amt}
                                    </div>
                                </div>
                                <div className="li-row">
                                    <div className="li-column">
                                        {d.place}
                                    </div>
                                </div>
                            </div>
                        </Link>
                )}
            </div>
        </div>
    );
}

export default HistoryVerification;