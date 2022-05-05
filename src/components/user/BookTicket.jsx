import Forms from "../../generalComponent/Forms";
import payIcon from '../../assets/payIcon.svg'
import rightArrow from '../../assets/rarr.svg'
import './BookTicket.css'
import { useState } from "react";
const BookTicket = () => {
    const [location, setLocation] = useState({ from: "", to: "" });
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
            <Forms className={"BookTicket"}>
                <div className="row">
                    <Forms.Select placeholder="Depart" className={'locationSelection'} name={'depart'} onChange={e => changeIDs(e.target.value, "from")}>
                        {stops.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                    </Forms.Select>
                    {/* right arrow */}
                    <img src={rightArrow} className="rightArrow" alt="Right arrow" />
                    <Forms.Select placeholder="Arrival" className={'locationSelection'} name={'arrival'} onChange={e => changeIDs(e.target.value, "to")}>
                        {stops.reverse().map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                    </Forms.Select>
                </div>
                <div className="amtDisplay">
                    Amount <span>₹ {"544"}</span>
                </div>
                <Forms.Input name={'phone number'} placeholder={'phone number'} />
                <Forms.Input name={'Name'} placeholder={'Name'} />
                <button type="submit" className="btn primary">
                    <img src={payIcon} className="payIcon" alt="Pay" />
                    Pay</button>
            </Forms>
        </div>
    );
}

export default BookTicket;