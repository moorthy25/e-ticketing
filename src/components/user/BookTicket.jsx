import Forms from "../../generalComponent/Forms";
import payIcon from '../../assets/payIcon.svg'
import rightArrow from '../../assets/rarr.svg'
import './BookTicket.css'
import { useState } from "react";
const BookTicket = () => {
    const [location, setLocation] = useState({ from: "", to: "" });
    const [details, setDetails] = useState({ passenger: 1, luggage: 0 });
    const changeIDs = (d, field) => setLocation(p => ({ ...p, [field]: d }));
    const stops = [
        { id: 1, name: "Aruppukottai" },
        { id: 2, name: "Madurai" },
        { id: 3, name: "Ramanathapuram" },
        { id: 4, name: "Puthuchery" },
        { id: 5, name: "Kadalur" },
        { id: 6, name: "Kancheepuram" },
        { id: 7, name: "Thambaram" },
        { id: 8, name: "Koyampedu" },
        { id: 9, name: "Tiruchendur" },
        { id: 10, name: "Thoothukudi" }
    ]
    return (
        <div className="center h90">
            <Forms className={"BookTicket"} onSubmit={d => console.log(d)}>
                <div className="row">
                    <Forms.Select
                        placeholder="Depart"
                        value={location.from}
                        className={'locationSelection'}
                        name={'depart'}
                        onChange={(e, v) => {
                            // console.log(e, v, "depart");
                            changeIDs(e.value, "from")
                        }}>
                        {stops.map(s => <Forms.Option key={s.id} value={s.id}>{s.name}</Forms.Option>)}
                    </Forms.Select>
                    {/* right arrow */}
                    <img src={rightArrow} className="rightArrow" alt="Right arrow" />
                    <Forms.Select
                        placeholder="Arrival"
                        value={location.to}
                        className={'locationSelection'}
                        name={'arrival'}
                        onChange={(e, v) => {
                            // console.log(e, v, "arrival");
                            changeIDs(e.value, "to")
                        }}>
                        {stops.reverse().map(s => <Forms.Option key={s.id} value={s.id}>{s.name}</Forms.Option>)}
                    </Forms.Select>
                </div>
                <div className="PassengerLuggage row">
                    <div className="column">
                        Passenger
                        <Forms.Input
                            type={'number'}
                            name="passNos"
                            onChange={(e, v) => setDetails(p => ({ ...p, passenger: v }))}
                            placeholder="No of Passenger"
                            value={details.passenger}
                        />
                    </div>
                    <div className="column">
                        Luggage
                        <Forms.Input
                            type={'number'}
                            name="luggNos"
                            onChange={(e, v) => setDetails(p => ({ ...p, luggage: v }))}
                            value={String(details.luggage)}
                            placeholder="No of Luggage" />
                    </div>
                </div>
                <div className="amtDisplay">
                    Amount <span>₹ {"544"}</span>
                </div>
                <Forms.Input name={'phone number'} type="number" placeholder={'phone number'} />
                <Forms.Input name={'Name'} placeholder={'Name'} />
                <button type="submit" className="btn primary">
                    <img src={payIcon} className="payIcon" alt="Pay" />
                    Pay</button>
            </Forms>
        </div >
    );
}

export default BookTicket;