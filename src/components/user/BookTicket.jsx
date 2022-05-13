import Forms from "../../generalComponent/Forms";
import logo from '../../assets/logo.svg'
import payIcon from '../../assets/payIcon.svg'
import rightArrow from '../../assets/rarr.svg'
import './BookTicket.css'
import { useEffect, useState } from "react";
import { addDoc, collection, doc, Firestore, getDoc, getDocs, getFirestore, query, setDoc, Timestamp, where } from "firebase/firestore";
import app from "../../firebase";
import { getLocal, setLocal } from "../locals";
import { useNavigate } from "react-router-dom";
// import Razorpay from 'razorpay'



const db = getFirestore(app)

const BookTicket = ({ vnum = "" }) => {
    console.log("vnum", vnum);
    const [location, setLocation] = useState({ from: {}, to: {} });
    const [details, setDetails] = useState({ passenger: 1, luggage: 0 });

    const [croute, setCroute] = useState({ routename: "", stops: [] });
    // const [show, setShow] = useState(false);
    const [listVehicles, setListVehicles] = useState([]);
    const [selectedVehicle, setSelectedVehicle] = useState({ text: vnum, value: "" });
    const [price, setPrice] = useState(0);
    // console.log("price", price);
    // const [passenger, setPassenger] = useState(1);
    // const [luggage, setLuggage] = useState(0);
    const localUser = getLocal('user')
    const [phone, setPhone] = useState(localUser?.phone || "");
    const [name, setName] = useState(localUser?.name || "");
    const changeIDs = (d, field) => setLocation(p => ({ ...p, [field]: d }));

    const navigate = useNavigate()
    console.log(croute, location);



    const getRoutes = async (v = { text: "" }) => {
        console.log(" selectedVehicle.text", selectedVehicle);
        const docs = await getDocs(query(collection(db, 'vehicle'), where('vehicleno', "==", selectedVehicle.text || v.text)))
        console.log("docs", docs);
        if (!docs.empty) {
            const vehicle = docs.docs[0].data()
            console.log("vehicle", vehicle);
            const route = await getDoc(doc(db, "route", vehicle.currentRoute.value))
            setCroute(route.data())
        }
        else {
            setCroute({ routename: "", stops: [] })
            // setShow(true)
            const docs = await getDocs(query(collection(db, 'vehicle')))
            const li = []
            docs.forEach(d => li.push({ ...d.data(), id: d.id }))
            setSelectedVehicle({ text: "", value: "" })
            setListVehicles(li)
        }
    }


    const getPrice = () => {
        console.log("from get price");
        const { passenger, luggage } = details
        if (location.from.value < location.to.value) {

            console.log("from get price inside if");
            // console.log('price cal', croute.stops[location.to.value].price[location.from.value]);
            setPrice((parseInt(croute.stops[location.to.value].price[location.from.value]) * passenger) + (parseInt(croute.stops[location.to.value].price[location.from.value]) * 0.5 * luggage))
        }
        else if (location.to.value < location.from.value) {
            console.log("from get price inside else if");
            setPrice((parseInt(croute.stops[location.from.value].price[location.to.value]) * passenger) + (parseInt(croute.stops[location.from.value].price[location.to.value]) * 0.5 * luggage))
        }
    }
    useEffect(() => {
        getPrice()
    }, [details, location]);

    useEffect(() => {
        getRoutes()
    }, []);





    return (
        <div className="center h90 column">
            <Forms.Select className={'w-max mb-1'} placeholder="Bus Number" onChange={v => {
                setSelectedVehicle(v)
                getRoutes(v)
            }} defaultValue={selectedVehicle} >
                {listVehicles.map(v => <Forms.Option key={v.id} value={v.id}>{v.vehicleno}</Forms.Option>)}
            </Forms.Select>
            <Forms className={"BookTicket"} onSubmit={d => console.log(d)}>
                <div className="row">
                    <Forms.Select
                        placeholder="Depart"
                        value={location.from}
                        className={'locationSelection'}
                        name={'depart'}
                        onChange={(e, v) => {
                            // console.log(e, v, "depart");
                            if (e.value !== location.to.value) {
                                console.log("inside if ");
                                changeIDs(e, "from")
                            }
                            else
                                alert("Can't select same destinations")
                            // getPrice()
                        }}>
                        {croute.stops.map((s, i) => <Forms.Option key={i} value={i}>{s.stopName}</Forms.Option>)}
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
                            if (e.value !== location.from.value)
                                changeIDs(e, "to")
                            else
                                alert("Can't select same destinations")
                            // getPrice()
                        }}>
                        {croute.stops.map((s, i) => <Forms.Option key={i} value={i}>{s.stopName}</Forms.Option>)}
                        {/* {stops..map(s => <Forms.Option key={s.id} value={s.id}>{s.name}</Forms.Option>)} */}
                    </Forms.Select>
                </div>
                <div className="PassengerLuggage row">
                    <div className="column">
                        Passenger
                        <Forms.Input
                            type={'number'}
                            name="passNos"
                            onChange={(e, v) => {
                                setDetails(p => ({ ...p, passenger: parseInt(v) || 0 }))
                                // getPrice()
                            }
                            }
                            placeholder="No of Passenger"
                            value={details.passenger}
                        />
                    </div>
                    <div className="column">
                        Luggage
                        <Forms.Input
                            type={'number'}
                            name="luggNos"
                            onChange={(e, v) => {
                                setDetails(p => ({ ...p, luggage: parseInt(v) || 0 }))
                                // getPrice()
                            }
                            }
                            value={String(details.luggage)}
                            placeholder="No of Luggage" />
                    </div>
                </div>
                <div className="amtDisplay">
                    Amount <span>₹ {price}</span>
                </div>
                <Forms.Input required
                    onChange={(v, e) => setPhone(e)}
                    value={parseInt(phone)}
                    name={'phone number'} type="number" placeholder={'phone number'} />
                <Forms.Input required
                    onChange={(v, e) => setName(e)}
                    value={name}
                    name={'Name'} placeholder={'Name'} />
                <button type="submit" onClick={() => {
                    async function paymentResponse(res) {
                        console.log(res);
                        console.log(location, details, price, name, phone, selectedVehicle);
                        await addDoc(collection(db, 'transaction'), {
                            "amt": price,
                            "paymentno": res.razorpay_payment_id,
                            "user": {
                                "phone": phone,
                                "name": name
                            },
                            "passenger": details.passenger,
                            "luggage": details.luggage,
                            "date": Timestamp.now(),
                            "from": location.from.text,
                            "to": location.to.text,
                            "vehicleno": selectedVehicle.text
                        })
                        setDoc(doc(db, `users/${phone}`), {
                            "phone": phone,
                            "name": name
                        })
                        setLocal('user', { userType: "user", phone: phone,phoneNumber:phone, name })
                        navigate('/user')
                    }
                    var options = {
                        "key": "rzp_test_gGL8rDnl6Cic1b",
                        "amount": price + "00",
                        "currency": "INR",
                        "name": "E-Ticketing",
                        "description": "Get ticket without hassle",
                        "image": logo,
                        "order_id": "",
                        "handler": paymentResponse,
                        "prefill": {
                            "name": "",
                            // "email": "gaurav.kumar@example.com",
                            "contact": phone
                        },
                        "notes": {
                            "address": "Razorpay Corporate Office"
                        },
                        "theme": {
                            "color": "#212529"
                        },
                        // callback_url: 'https://your-server/callback_url',
                        // redirect: true
                    };
                    var rzp1 = new window.Razorpay(options);
                    rzp1.on('payment.failed', function (response) {
                        alert(response.error.reason);
                    });
                    rzp1.open();
                }} className="btn primary">
                    <img src={payIcon} className="payIcon" alt="Pay" />
                    Pay</button>
            </Forms>
        </div >
    );
}

export default BookTicket;