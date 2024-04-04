// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC2uncXK-a4JRnQdcZuwfgjzz0jET0BZh0",
    authDomain: "vetwell-connect.firebaseapp.com",
    projectId: "vetwell-connect",
    storageBucket: "vetwell-connect.appspot.com",
    messagingSenderId: "173129071010",
    appId: "1:173129071010:web:b5a25a1f1d0b4d8bb75afb",
    measurementId: "G-40M3DKLS1X"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
auth.languageCode = 'it';



const login = document.getElementById("google-login")
login.addEventListener("click", function () {
    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;

            alert("Login Successful :)" + user.email);
            window.location.href = "dashboard.html";

        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;

            const email = error.customData.email;

            const credential = GoogleAuthProvider.credentialFromError(error)

            alert(errorMessage)

        });
})