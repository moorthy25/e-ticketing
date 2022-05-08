import Forms from "../../generalComponent/Forms";
import './RoutePrice.css'
import upload from '../../assets/upload.svg'
import plus from '../../assets/plus.svg'
import { addDoc, collection, doc, getDocs, getFirestore, query, updateDoc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import app from "../../firebase";
import { async } from "@firebase/util";

const db = getFirestore(app)

const RoutePrice = () => {

    const [routes, setRoutes] = useState([]);

    //  backup from firestore
    const [listRoutes, setListRoutes] = useState([]);

    const [selectedRoute, setSelectedRoute] = useState({});

    const [routeList, setRouteList] = useState([
        { stopName: "", price: [] }
    ]);

    const addRouteLine = () => setRouteList(p => [...p, { price: new Array(p.length).fill(""), stopName: "" }])


    const fixRoute = (v) => {
        console.log('inside fix route', listRoutes, v);
        const rote = listRoutes.find(d => d.id === v.value)?.stops
        setRouteList(rote ? rote : [{ price: [], stopName: "" }])
        setSelectedRoute(v)
    }

    const [noSuggText, setNoSuggText] = useState("");
    const getRoutes = async (nroute, docid) => {
        const routes = await getDocs(collection(db, 'route'))
        // console.log(routes);
        const liRote = []
        routes.forEach((r => liRote.push({ ...r.data(), id: r.id })))
        setRoutes(liRote.map(r => ({ id: r.id, value: r.routename })))
        setListRoutes(liRote)
        if (nroute === 'new') {
            setSelectedRoute({ value: docid, text: liRote.find(d => d.id === docid).routename })
        } else
            setSelectedRoute({ value: liRote?.[0]?.id, text: liRote?.[0]?.value })
        fixRoute()
    }
    const save = async () => {
        console.log(routeList);
        const d = await updateDoc(doc(db, `route/${selectedRoute.value}`), {
            stops: routeList
        })
        console.log(d);
        getRoutes()
        alert("Saved successfully")
    }
    useEffect(() => {
        getRoutes()
    }, []);
    const reset = useRef()
    const createRoute = async () => {
        const doc = await addDoc(collection(db, "route"), {
            routename: noSuggText
        })
        reset.current("")
        setNoSuggText("")
        getRoutes("new", doc.id)

    }
    return (
        <div className="center w100">
            <div className="routePrice routePriceContainer">
                <h2 className="routeHead">Route :
                    <Forms.Select className={'routePicker'} reset={ref => reset.current = ref} value={selectedRoute} onChange={(v) => {
                        fixRoute(v)
                    }}
                        // onSearch={(text) => {
                        //     setNoSuggText(text)
                        // }}
                        name="routePicker">
                        {/* noSuggestion= */}
                        {routes.map(d => <Forms.Option key={d.id} value={d.id}>{d.value}</Forms.Option>)}
                    </Forms.Select>
                    <div className="addRoute">
                        <Forms.Input
                            placeholder="new Route Name"
                            className={'ml-2 w50'}
                            value={noSuggText}
                            onChange={(e, v) => setNoSuggText(v)}
                        /><button onClick={createRoute} className="btn primary w-max ml-1 ">{`create route`}</button>
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
                <button className="btn primary w40 float-right" onClick={addRouteLine}><img src={plus} alt="Add" title="Add stop" /></button>
            </div>
        </div >
    );
}

export default RoutePrice;