import { async } from "@firebase/util";
import { collection, getDocs, getFirestore, query } from "firebase/firestore";
import { QRCodeCanvas } from "qrcode.react";
import { useEffect, useRef, useState } from "react";
import busIcon from '../../assets/bus.png'
import app from "../../firebase";
import Forms from "../../generalComponent/Forms";
import './QRGenarator.css'
const db = getFirestore(app)
const QRGenarator = () => {
    const [vehno, setVehno] = useState("");
    console.log(vehno.replace(/[ ]/g, ""));
    const qr = useRef()
    // console.log("qr",qr);
    // const vehicleList = ['TN69N1234', "TN47H4563"]
    const [vehicleList, setVehicleList] = useState([]);
    const getVehicleList = async () => {
        const li = await getDocs(query(collection(db, 'vehicle')))
        const lis = [];
        li.forEach(v => lis.push(v.data().vehicleno))
        setVehicleList(lis)
    }
    useEffect(() => {
        getVehicleList()
    }, []);
    return (<div className="center">
        <div className="qrContainer">
            {/* <Forms.Input    */}
            <Forms.Select defaultValue={{ text: vehno, value: vehno }} onChange={(e, v) => setVehno(e.value)} placeholder="Vehicle Number">
                {vehicleList.map(v => <Forms.Option key={v} value={v}>{v}</Forms.Option>)}
            </Forms.Select>
            {/* <button className="btn primary w100">Genarate</button> */}
            <div className="qrColumn" ref={r => qr.current = r}>
                <QRCodeCanvas
                    size={250}
                    includeMargin
                    // imageSettings={{ src: busIcon ,width:50,height:50}}
                    value={`${window.location.origin}/vehicle/${vehno.replace(/[ ]/g, "")}`}
                />
            </div>
            <button onClick={() => {
                const a = document.createElement('a')
                a.href = qr.current.firstChild.toDataURL('image/png')
                a.download = vehno.replace(/[ ]/g, "")
                a.click()
            }} className="btn primary w100">Download</button>
        </div>
    </div >);
}

export default QRGenarator;