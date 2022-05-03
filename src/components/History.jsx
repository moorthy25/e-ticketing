import './history.css'

const History = () => {
    const data = [
        {
            place: "Tiruchendur-Madurai",
            amt: 456,
            date: "25/04/2022",
            regNO: "TN 64 N 4564"
        },
        {
            place: "Tiruchendur-Tirunelveli",
            amt: 456,
            date: "25/04/2022",
            regNO: "TN 64 N 4564"
        },
        {
            place: "Tiruchendur-Tiruvannamalai",
            amt: 456,
            date: "25/04/2022",
            regNO: "TN 64 N 4564"
        },
        {
            place: "trichy-Madurai",
            amt: 456,
            date: "25/04/2022",
            regNO: "TN 64 N 4564"
        },
        {
            place: "Tiruchendur-Megnanapuram",
            amt: 456,
            date: "25/04/2022",
            regNO: "TN 64 N 4564"
        },
    ]
    return (
        <div className="center bookHistory">
            <div className="list">
                {data.map(
                    (d, i) =>
                        <div className="li-container">
                            <div className="li-row">
                                <div className="li-column">
                                    #{i + 1}654
                                    <span>
                                        {d.regNO}
                                    </span>
                                </div>
                                <div className="li-column">
                                    {d.date}
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
                )}
            </div>
        </div>
    );
}

export default History;