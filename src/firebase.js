import {initializeApp} from "firebase/app";
import {getDatabase} from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD0hwJ-ICNLro3AdVMEBBNNaZttrSURq8o",
  authDomain: "kintsugi-25897.firebaseapp.com",
  databaseURL: "https://kintsugi-25897-default-rtdb.firebaseio.com",
  projectId: "kintsugi-25897",
  storageBucket: "kintsugi-25897.firebasestorage.app",
  messagingSenderId: "505237392987",
  appId: "1:505237392987:web:d56bfcfe9bae8f5654797e",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export {database};
