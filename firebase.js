import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "", // paste your apiKey
  authDomain: "", // paste your authDomain
  projectId: "", // paste your projectId
  storageBucket: "", // paste your storageBucket
  messagingSenderId: "", // paste your messaginSenderId
  appId: "", // paste your appId
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth };
