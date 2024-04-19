import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAGnGQ5tAX6KEHL1RyqAf6VII7X4MacZmg",
  authDomain: "are-we-cooking.firebaseapp.com",
  projectId: "are-we-cooking",
  storageBucket: "are-we-cooking.appspot.com",
  messagingSenderId: "776897844103",
  appId: "1:776897844103:web:76cb639bf2a3683b953922"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export default firebaseConfig;
export {app, auth, db};
