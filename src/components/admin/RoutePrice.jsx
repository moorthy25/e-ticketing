import Forms from "../../generalComponent/Forms";
import './RoutePrice.css'
import upload from '../../assets/upload.svg'
import plus from '../../assets/plus.svg'
import { useState } from "react";

const RoutePrice = () => {
    const routes = [
        { id: "Tir-Aru", value: "Tiruchendur - Aruppukottai" },
        { id: "Tho-Kad", value: "Thoothukudi - Kadalur" },
        { id: "Aru-Kan", value: "Aruppukottai - Kancheepuram" },
        { id: "Mad-Koy", value: "Madurai - Koyampedu" },
        { id: "Ram-Mad", value: "Ramanathapuram - Madurai" },
        { id: "Put-Put", value: "Puthuchery - Puthuchery" },
        { id: "Kad-Ram", value: "Kadalur - Ramanathapuram" },
        { id: "Kan-Tha", value: "Kancheepuram - Thambaram" },
        { id: "Tha-Tho", value: "Thambaram - Thoothukudi" },
        { id: "Koy-Tir", value: "Koyampedu - Tiruchendur" },
        { id: "Tir-Tir", value: "Tiruchendur - Tiruchendur" },
        { id: "Tho-Tho", value: "Thoothukudi - Thoothukudi" },
        { id: "Aru-Tha", value: "Aruppukottai - Thambaram" },
        { id: "Mad-Ram", value: "Madurai - Ramanathapuram" },
        { id: "Ram-Put", value: "Ramanathapuram - Puthuchery" },
        { id: "Put-Mad", value: "Puthuchery - Madurai" },
        { id: "Kad-Koy", value: "Kadalur - Koyampedu" },
        { id: "Kan-Kan", value: "Kancheepuram - Kancheepuram" },
        { id: "Tha-Kad", value: "Thambaram - Kadalur" },
        { id: "Koy-Aru", value: "Koyampedu - Aruppukottai" },
    ]
    const [routeList, setRouteList] = useState([
        {
            "price": [],
            "stopName": "tiruchendur"
        },
        {
            "price": [
                "10"
            ],
            "stopName": "paramankurichi"
        },
        {
            "price": [
                "13",
                "10"
            ],
            "stopName": "megnanapuram"
        },
        {
            "price": [
                "16",
                "14",
                "11"
            ],
            "stopName": "sathankulam"
        },
        {
            "price": [
                "25",
                "20",
                "18",
                "12"
            ],
            "stopName": "ittamzli"
        }
    ]);
    const addRouteLine = () => setRouteList(p => [...p, { price: new Array(p.length).fill(""), stopName: "" }])
    const save = () => console.log(routeList);
    const [noSuggText, setNoSuggText] = useState("");
    return (
        <div className="center w100">
            <div className="routePrice routePriceContainer">
                <h2 className="routeHead">Route :
                    <Forms.Select className={'routePicker'} onChange={(e) => console.log(e)} noSuggestion={(text) => setNoSuggText(text)} name="routePicker">
                        {routes.map(d => <Forms.Option key={d.id} value={d.id}>{d.value}</Forms.Option>)}
                    </Forms.Select>
                    <div className="addRoute">
                        {noSuggText && <button className="btn primary w-max ml-1 ">{`create ${noSuggText} route`}</button>}
                    </div>
                    <button onClick={save} className="btn primary w-max">
                        <img src={upload} alt="Upload" /> SAVE
                    </button>
                </h2>
                <div className="routePriceMapContainer">
                    {routeList.map((d, rli) =>
                        <div key={rli} className="routeLine">
                            <div className="routeLineContainer">
                                {d.price.map((rp, rpi) => <Forms.Input key={rpi} type={'number'} placeholder="Price" onChange={(e, v) => setRouteList(p => p.map((d, i) => i === rli ? { ...d, price: d.price.map((p, i) => i === rpi ? v : p) } : d))} value={rp} />)}
                            </div>
                            <Forms.Input placeholder="Bus stop" onChange={(e, v) => setRouteList(p => p.map((d, i) => i === rli ? { ...d, stopName: v } : d))} value={d.stopName} className={'w-max'} />
                            <button className="w-max btn mh-1" onClick={() => setRouteList(p => p.filter((v, i) => i !== rli).map((v, i) => ({ ...v, price: v.price.filter((pri, priIndex) => priIndex !== rli) })))}>Remove</button>
                        </div>
                    )}
                </div>
                <button className="btn primary w100" onClick={addRouteLine}><img src={plus} alt="Add" title="Add stop" /></button>
            </div>
        </div >
    );
}

export default RoutePrice;