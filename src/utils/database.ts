import { collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { IThresholdSetting } from "../components/ThresholdSetting";
import { db } from "./firebase";
import { IAlarmData, IMonitoringData } from "../types/IMonitoringData";
import { IUser } from "../types/user";

export const getThresholds = async (): Promise<Map<string, IThresholdSetting>> => {
  const parametersSnapshot = await getDocs(collection(db, "parameter"));

  const parameterData = new Map<string, IThresholdSetting>();

  parametersSnapshot.forEach((doc) => {
    const id = doc.id as string;
    const data = doc.data() as IThresholdSetting;
    parameterData.set(id, data);
  });

  return parameterData;
};

export const getAllDatas = async (dKey: string): Promise<IMonitoringData[]> => {
  const datasSnapshot = await getDocs(collection(db, dKey));

  let data: IMonitoringData[] = [];


  datasSnapshot.forEach((doc) => {
    const d = doc.data() as IMonitoringData;
    data.push(d)
  })

  // console.log(data);
  return data;
}

export const getAllAlarms = async (): Promise<IAlarmData[] | []> => {
  const datasSnapshot = await getDocs(collection(db, 'alarms'));

  const data: IAlarmData[] = [];

  datasSnapshot.forEach((doc) => {
    const d = doc.data() as IAlarmData;

    data.push(d)
  })

  return data;
}

export const deleteData = async (collection: string, documentId: string) => {
  await deleteDoc(doc(db, collection, documentId))
}

export const deleteAlarm = async (documentId: string) => {
  await deleteData('alarms', documentId);
}

export const getUser = async (): Promise<IUser | null> => {
  const docRef = doc(db, 'users', 'admin')
  const docSnap = await getDoc(docRef);

  if(docSnap.exists()){
    return docSnap.data() as IUser;
  }
  
  return null;
}

export const updateUser = async (user: IUser) => {
  await updateDoc(doc(db, 'users', 'admin'), {
    id: 0,
    username: user.username,
    password: user.password,
    fullname: user.fullname,
    picture: user.picture
  })
}



export const deleteAllData = async (collectionName: string) => {
  try {
    const collectionRef = collection(db, collectionName);
    const snapshot = await getDocs(collectionRef);

    if (snapshot.empty) {
      console.log("No documents found in the collection.");
      return;
    }

    snapshot.forEach(async (docSnap) => {
      const docRef = doc(db, collectionName, docSnap.id);
      await deleteDoc(docRef);
      console.log(`Document with ID ${docSnap.id} deleted successfully.`);
    });
  } catch (error) {
    console.error("Error deleting documents:", error);
  }
};
