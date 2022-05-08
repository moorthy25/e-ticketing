import Forms from "../../generalComponent/Forms";
import delIcon from '../../assets/delete.svg'
import editIcon from '../../assets/edit.svg'
import check from '../../assets/check.svg'
import './Buses.css'
import { useEffect, useState } from "react";
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, updateDoc } from "firebase/firestore";
import app from "../../firebase";

const db = getFirestore(app)


const Buses = () => {
   

    const [regno, setRegno] = useState("");
    const [conduct, setConduct] = useState({ text: "", value: "" });
    const [route, setRoute] = useState({ text: "", value: "" });


    const [busList, setBusList] = useState([]);
    const [updateObj, setUpdateObj] = useState(null);
    const [conductorList, setConductorList] = useState([]);
    const [routes, setRoutes] = useState([]);
    const getRoutes = async () => {
        const routes = await getDocs(collection(db, 'route'))
        const liRote = []
        routes.forEach((r => liRote.push({ ...r.data(), value: r.data().routename, id: r.id })))
        setRoutes(liRote)
    }
    const getConductor = async () => {
        const routes = await getDocs(collection(db, 'conductor'))
        const liRote = []
        routes.forEach((r => liRote.push({ ...r.data(), id: r.id })))
        setConductorList(liRote)
    }
    useEffect(() => {
        getRoutes()
        getConductor()
    }, []);
    const getBus = async () => {
        const docs = await getDocs(collection(db, 'vehicle'))
        const list = []
        docs.forEach(c => list.push({ ...c.data(), id: c.id }))
        setBusList(list)
    }
    useEffect(() => {
        getBus()
    }, []);
    const delBus = async (id) => {
        await deleteDoc(doc(db, 'vehicle', id))
        getBus()
    }

    const updateBus = async (data) => {
        await updateDoc(doc(db, 'vehicle', updateObj.id), {
            currentConducor: conduct,
            currentRoute: route,
            vehicleno: regno.replace(/[ ]/g, "").toUpperCase()
        })
        await updateDoc(doc(db, 'conductor', conduct.value), {
            currentVehicle: regno.replace(/[ ]/g, "").toUpperCase()
        })
        getBus()
        setUpdateObj(null)
    }
    const addBus = async (dList) => {
        console.log(dList);
        console.log(regno, conduct, route);
        const docref = await addDoc(collection(db, 'vehicle'), {
            currentConducor: conduct,
            currentRoute: route,
            vehicleno: regno.replace(/[ ]/g, "").toUpperCase()
        })
        await updateDoc(doc(db, 'conductor', conduct.value), {
            currentVehicle: regno.replace(/[ ]/g, "").toUpperCase()
        })
        getBus()
    }

    return (
        <div className="center">
            <div className="busesDetails">
                <div className="controls">
                    {updateObj && <div className="busList row">
                        <div className="details mh-5">{updateObj.vehicleno}</div>
                        <div className="details mh-5">{updateObj.currentConducor.text}</div>
                        <div className="details mh-5">{updateObj.currentRoute.text}</div>
                        <div className="details mh-5 w100 t-center " title="cancel">
                            <svg width="26" className="btn" height="26" onClick={() => setUpdateObj(null)} viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_79_2)">
                                    <path d="M21.9611 4.55383C17.2309 -0.176326 9.56597 -0.176326 4.83582 4.55383C0.105659 9.28399 0.105659 16.9489 4.83582 21.6791C9.56597 26.4092 17.2309 26.4092 21.9611 21.6791C26.6912 16.9489 26.6912 9.28399 21.9611 4.55383ZM17.4035 19.055C17.1757 19.2829 16.8028 19.2829 16.5749 19.055L13.3984 15.8786L10.222 19.055C9.99411 19.2829 9.62122 19.2829 9.39334 19.055L7.45985 17.1215C7.23197 16.8937 7.23197 16.5208 7.45985 16.2929L10.6363 13.1165L7.45985 9.94C7.23197 9.71212 7.23197 9.33923 7.45985 9.11136L9.39334 7.17786C9.62122 6.94998 9.99411 6.94998 10.222 7.17786L13.3984 10.3543L16.5749 7.17786C16.8028 6.94998 17.1757 6.94998 17.4035 7.17786L19.337 9.11136C19.5649 9.33923 19.5649 9.71212 19.337 9.94L16.1606 13.1165L19.337 16.2929C19.5649 16.5208 19.5649 16.8937 19.337 17.1215L17.4035 19.055Z" fill="white" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_79_2">
                                        <rect width="25" height="25" fill="white" transform="translate(0.898438 0.616455)" />
                                    </clipPath>
                                </defs>
                            </svg>

                        </div>
                    </div>}
                    <Forms className={'dataFields row'} onSubmit={updateObj ? updateBus : addBus}>
                        {/* <Forms.Input placeholder="Driver" name={'driver'} /> */}
                        {/* <Forms.Input placeholder="Conductor" name={'conductor'} /> */}
                        <Forms.Input onChange={(e, v) => setRegno(v)} defaultValue={updateObj?.vehicleno || ""} value={regno} placeholder="Reg No" name={'regno'} />
                        <Forms.Select onChange={(v) => setConduct(v)} defaultValue={updateObj?.currentConducor || conduct} placeholder="Conductor" name={'Conductor'}>
                            {conductorList.map(d =>
                                <Forms.Option key={d.id} value={d.id} >{d.name}</Forms.Option>
                            )}
                        </Forms.Select>
                        <Forms.Select onChange={(v) => setRoute(v)} defaultValue={updateObj?.currentRoute || route} placeholder="Current Route" name={'currentRoute'}>
                            {routes.map(d =>
                                <Forms.Option key={d.id} value={d.id} >{d.value}</Forms.Option>
                            )}
                            {/* <Forms.Option value={'tcr-tnv'} >Tiruchendur - Tirunelveli</Forms.Option>
                            <Forms.Option value={'tcr-tnv'} >Tiruchendur - Tirunelveli</Forms.Option>
                            <Forms.Option value={'tcr-tnv'} >Tiruchendur - Tirunelveli</Forms.Option>
                            <Forms.Option value={'tcr-tnv'} >Tiruchendur - Tirunelveli</Forms.Option>
                            <Forms.Option value={'tcr-tnv'} >Tiruchendur - Tirunelveli</Forms.Option>
                            <Forms.Option value={'tcr-tnv'} >Tiruchendur - Tirunelveli</Forms.Option>
                            <Forms.Option value={'tcr-tnv'} >Tiruchendur - Tirunelveli</Forms.Option>
                            <Forms.Option value={'tcr-tnv'} >Tiruchendur - Tirunelveli</Forms.Option> */}
                        </Forms.Select>
                        <button type="submit" className="btn primary">
                            <img src={check} alt="DONE" />
                        </button>
                    </Forms>
                </div>
                <div className="busList">
                    {busList.map((d, i) =>
                        <div key={i} className="row">
                            <>
                                <div className="details">{d.vehicleno}</div>
                                {/* <div className="details">{d.driver}</div> */}
                                <div className="details">{d.currentConducor.text}</div>
                                <div className="details">{d.currentRoute.text}</div>
                                <div className="details iconCtrl row">
                                    {/* <img src={editIcon} alt="Edit" title="Edit" /> */}
                                    <svg width="50" onClick={() => {
                                        setUpdateObj(d)
                                        setRegno(d.vehicleno)
                                        setRoute(d.currentRoute)
                                        setConduct(d.currentConducor)

                                    }} viewBox="0 0 50 50" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <g>
                                            <path d="M34.9479 9.99992L42.7778 17.8298C43.1076 18.1596 43.1076 18.6978 42.7778 19.0277L23.8194 37.986L15.7639 38.8801C14.6875 39.0017 13.776 38.0902 13.8976 37.0138L14.7917 28.9583L33.75 9.99992C34.0799 9.67006 34.6181 9.67006 34.9479 9.99992ZM49.0104 8.01207L44.7743 3.77596C43.4549 2.45652 41.3108 2.45652 39.9826 3.77596L36.9097 6.84888C36.5799 7.17874 36.5799 7.71693 36.9097 8.04679L44.7396 15.8767C45.0694 16.2065 45.6076 16.2065 45.9375 15.8767L49.0104 12.8037C50.3299 11.4756 50.3299 9.33152 49.0104 8.01207ZM33.3333 32.8298V41.6666H5.55556V13.8888H25.5035C25.7812 13.8888 26.0417 13.776 26.2413 13.585L29.7135 10.1128C30.3733 9.45304 29.9045 8.33325 28.9757 8.33325H4.16667C1.86632 8.33325 0 10.1996 0 12.4999V43.0555C0 45.3558 1.86632 47.2221 4.16667 47.2221H34.7222C37.0226 47.2221 38.8889 45.3558 38.8889 43.0555V29.3576C38.8889 28.4287 37.7691 27.9687 37.1094 28.6197L33.6371 32.0919C33.4462 32.2916 33.3333 32.552 33.3333 32.8298Z" fill="white" />
                                        </g>
                                    </svg>
                                    {/* <img src={delIcon} alt="Delete" title="Delete" /> */}
                                    <svg width="50" onClick={() => {
                                        delBus(d.id)
                                    }} viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g>
                                            <path d="M6.25 45.3125C6.25 46.5557 6.74386 47.748 7.62294 48.6271C8.50201 49.5062 9.6943 50 10.9375 50H39.0625C40.3057 50 41.498 49.5062 42.3771 48.6271C43.2561 47.748 43.75 46.5557 43.75 45.3125V12.5H6.25V45.3125ZM32.8125 20.3125C32.8125 19.8981 32.9771 19.5007 33.2701 19.2077C33.5632 18.9146 33.9606 18.75 34.375 18.75C34.7894 18.75 35.1868 18.9146 35.4799 19.2077C35.7729 19.5007 35.9375 19.8981 35.9375 20.3125V42.1875C35.9375 42.6019 35.7729 42.9993 35.4799 43.2924C35.1868 43.5854 34.7894 43.75 34.375 43.75C33.9606 43.75 33.5632 43.5854 33.2701 43.2924C32.9771 42.9993 32.8125 42.6019 32.8125 42.1875V20.3125ZM23.4375 20.3125C23.4375 19.8981 23.6021 19.5007 23.8951 19.2077C24.1882 18.9146 24.5856 18.75 25 18.75C25.4144 18.75 25.8118 18.9146 26.1049 19.2077C26.3979 19.5007 26.5625 19.8981 26.5625 20.3125V42.1875C26.5625 42.6019 26.3979 42.9993 26.1049 43.2924C25.8118 43.5854 25.4144 43.75 25 43.75C24.5856 43.75 24.1882 43.5854 23.8951 43.2924C23.6021 42.9993 23.4375 42.6019 23.4375 42.1875V20.3125ZM14.0625 20.3125C14.0625 19.8981 14.2271 19.5007 14.5201 19.2077C14.8132 18.9146 15.2106 18.75 15.625 18.75C16.0394 18.75 16.4368 18.9146 16.7299 19.2077C17.0229 19.5007 17.1875 19.8981 17.1875 20.3125V42.1875C17.1875 42.6019 17.0229 42.9993 16.7299 43.2924C16.4368 43.5854 16.0394 43.75 15.625 43.75C15.2106 43.75 14.8132 43.5854 14.5201 43.2924C14.2271 42.9993 14.0625 42.6019 14.0625 42.1875V20.3125ZM45.3125 3.12502H33.5938L32.6758 1.29885C32.4813 0.908429 32.1818 0.58002 31.8109 0.350563C31.4399 0.121105 31.0123 -0.0002957 30.5762 1.71218e-05H19.4141C18.9789 -0.00165578 18.552 0.119293 18.1824 0.349005C17.8128 0.578717 17.5154 0.907902 17.3242 1.29885L16.4062 3.12502H4.6875C4.2731 3.12502 3.87567 3.28964 3.58265 3.58266C3.28962 3.87569 3.125 4.27312 3.125 4.68752L3.125 7.81252C3.125 8.22692 3.28962 8.62434 3.58265 8.91737C3.87567 9.2104 4.2731 9.37502 4.6875 9.37502H45.3125C45.7269 9.37502 46.1243 9.2104 46.4174 8.91737C46.7104 8.62434 46.875 8.22692 46.875 7.81252V4.68752C46.875 4.27312 46.7104 3.87569 46.4174 3.58266C46.1243 3.28964 45.7269 3.12502 45.3125 3.12502Z" fill="white" />
                                        </g>
                                        {/* <defs>
                                            <clipPath id="clip0_6_835">
                                                <rect width="50" height="50" fill="white" />
                                            </clipPath>
                                        </defs> */}
                                    </svg>
                                </div>
                            </>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Buses;