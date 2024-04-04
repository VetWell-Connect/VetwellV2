// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithPopup, TwitterAuthProvider } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
    
    // Your web app's Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyC2uncXK-a4JRnQdcZuwfgjzz0jET0BZh0",
        authDomain: "vetwell-connect-707e1.firebaseapp.com",
        projectId: "vetwell-connect-707e1",
        storageBucket: "vetwell-connect-707e1.appspot.com",
        messagingSenderId: "604264259574",
        appId: "1:604264259574:web:23ed93cb7067783d7871d7",
        measurementId: "G-HJ484F0S0Q"
      };
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  // Twitter login code
  const twitterProvider = new TwitterAuthProvider();

  document.getElementById("twitter-login").addEventListener("click", function () {
    auth.signInWithPopup(twitterProvider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        alert("Welcome " + user.displayName);
        console.log(user);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  });
