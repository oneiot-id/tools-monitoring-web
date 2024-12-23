import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
    apiKey: "AIzaSyAdhprs141GzMI-ZbeX7V_5GR_JZSvocvw",
    authDomain: "monitoringperalatanlistrik.firebaseapp.com",
    databaseURL: "https://monitoringperalatanlistrik-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "monitoringperalatanlistrik",
    storageBucket: "monitoringperalatanlistrik.firebasestorage.app",
    messagingSenderId: "656687196989",
    appId: "1:656687196989:web:f29e3d8729a748cb687354",
    measurementId: "G-TEVXT6Y02N"
  };

  export const app = initializeApp(firebaseConfig);
  export const db = getFirestore(app);