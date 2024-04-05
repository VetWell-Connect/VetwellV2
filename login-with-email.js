// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";


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


//get the email and password values
const register = document.getElementById("submit-button");
//create account
register.addEventListener("click", function () {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Check if both email and password are not empty
    if (email.trim() === "" || password.trim() === "") {
        alert("Please fill in both email and password fields.");
        return; // Do not proceed with registration if fields are empty
    }

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            alert("Logging In..");
            window.location.href = "dashboard.html";
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
        });
});