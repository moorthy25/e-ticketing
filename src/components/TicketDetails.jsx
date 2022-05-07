import './TicketDetails.css'
import rightArr from '../assets/rarr.svg'
import downImg from '../assets/download.svg'
const TicketDetails = () => {
    return (
        <div className="center">
            <div className="tiketDetailsContainer">
                {/* <div className="downImg">
                    <img src={downImg} alt="Download Ticket" />
                </div> */}
                <div className="li-row">
                    <div className="li-column">
                        #1654
                        <span>
                            TN 69 N 4655
                        </span>
                    </div>
                    <div className="li-column">
                        25/04/2022
                    </div>
                    <div className="li-column">
                        ₹645
                    </div>
                </div>
                <div className="bookedBy">
                    <div className="left">
                        <p className="detail">No of passenger : <span>4</span></p>
                        <p className="detail">No of Luggages : <span>5</span></p>
                    </div>
                    <div className="right">
                        <div className="head">Booked by</div>
                        <div className="body">
                            Mr. Kumaran
                            <br />
                            9876543210
                            <br />
                            me@mumaran.me
                        </div>
                    </div>
                </div>
                <section className='priceDetails'>
                    <div className="head">Price Details</div>
                    <div className="prow">
                        <div className="pclm">
                            Passenger
                        </div>
                        <div className="pclm">
                            5
                        </div>
                        <div className="pclm">
                            x
                        </div>
                        <div className="pclm">
                            4
                        </div>
                        <div className="pclm">
                            =
                        </div>
                        <div className="pclm">
                            20
                        </div>
                    </div>
                    <div className="prow">
                        <div className="pclm">
                            Luggage
                        </div>
                        <div className="pclm">
                            5
                        </div>
                        <div className="pclm">
                            x
                        </div>
                        <div className="pclm">
                            4
                        </div>
                        <div className="pclm">
                            =
                        </div>
                        <div className="pclm">
                            20
                        </div>
                    </div>
                    <div className="grandTotal">
                        <span>
                            ₹{"645"}
                        </span>
                    </div>
                </section>
                <section className='travelDirection'>Tiruchendur(005) <img src={rightArr} alt="Right arrow" /> Nagarcovil(018)</section>
            </div>
        </div>
    );
}

export default TicketDetails;