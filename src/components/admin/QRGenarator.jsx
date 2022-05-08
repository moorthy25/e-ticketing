import { QRCodeCanvas } from "qrcode.react";
import { useRef, useState } from "react";
import busIcon from '../../assets/bus.png'
import Forms from "../../generalComponent/Forms";
import './QRGenarator.css'
const QRGenarator = () => {
    const [vehno, setVehno] = useState("");
    console.log(vehno.replace(/[ ]/g, ""));
    const qr = useRef()
    // console.log("qr",qr);
    return (<div className="center">
        <div className="qrContainer">
            <Forms.Input placeholder="Vehicle Number" value={vehno} onChange={(e, v) => setVehno(v)} />
            {/* <button className="btn primary w100">Genarate</button> */}
            <div className="qrColumn" ref={r => qr.current = r}>
                <QRCodeCanvas
                    size={250}
                    includeMargin
                    imageSettings={{ src: busIcon ,width:50,height:50}}
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
    </div>);
}

export default QRGenarator;