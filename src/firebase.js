// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBB-pvLO9chquaLaRAPNdpP6TqJXd2rHSg",
    authDomain: "e-ticketing-vmm.firebaseapp.com",
    databaseURL: "https://e-ticketing-vmm-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "e-ticketing-vmm",
    storageBucket: "e-ticketing-vmm.appspot.com",
    messagingSenderId: "473883223375",
    appId: "1:473883223375:web:78831a04519a7ce22dd13a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app