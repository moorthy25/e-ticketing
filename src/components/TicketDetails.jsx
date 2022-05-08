import './TicketDetails.css'
import rightArr from '../assets/rarr.svg'
import downImg from '../assets/download.svg'
import { getLocal } from './locals';
import moment from 'moment';
const TicketDetails = () => {

    const data = getLocal('trans')
    return (
        <div className="center">
            <div className="tiketDetailsContainer">
                {/* <div className="downImg">
                    <img src={downImg} alt="Download Ticket" />
                </div> */}
                <div className="li-row">
                    <div className="li-column">
                        {data.paymentno}
                        <span>
                            {data.vehivleno}
                        </span>
                    </div>
                    <div className="li-column">
                        {/* {moment(data.date.seconds).format("DD/MM/YYYY")} */}
                        {data.date}
                    </div>
                    <div className="li-column">
                        ₹{data.amt}
                    </div>
                </div>
                <div className="bookedBy">
                    <div className="left">
                        <p className="detail">No of passenger : <span>{data.passenger}</span></p>
                        <p className="detail">No of Luggages : <span>{data.luggage}</span></p>
                    </div>
                    <div className="right">
                        <div className="head">Booked by</div>
                        <div className="body">
                            {data.user.name}
                            <br />
                            {data.user.phone}
                            {/* <br />
                            me@mumaran.me */}
                        </div>
                    </div>
                </div>
                {/* <section className='priceDetails'>
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
                </section> */}
                <section className='travelDirection'>{data.from} <img src={rightArr} alt="Right arrow" /> {data.to}</section>
            </div>
        </div>
    );
}

export default TicketDetails;