import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBxFsRYUR5zmmvMIxOJDo1CKS9iVGFtv18",
  authDomain: "e-commerce-clone-9ad30.firebaseapp.com",
  projectId: "e-commerce-clone-9ad30",
  storageBucket: "e-commerce-clone-9ad30.appspot.com",
  messagingSenderId: "543425995465",
  appId: "1:543425995465:web:00fafec2aae1cdb3d3a318",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth };
