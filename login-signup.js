let toastBox = document.querySelector(".toast-box");
function showToast(msg) {
  let toast = document.createElement("div");
  toast.innerHTML = msg;
  const errorMessages = [
    "Invalid Credentials!",
    "Please Fill All The Fields!",
    "Unable to Create User!",
    "Email Address Already Exists!",
    "Account Not Found!",
  ];
  errorMessages.forEach((errorMessage) => {
    if (msg.includes(errorMessage)) {
      toast.classList.add("toast-error");
    } else {
      toast.classList.add("toast");
    }
  });

  toastBox.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import {
  getAuth,
  updateProfile,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import {
  getFirestore,
  setDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAJPACpm-uY0OfDIwWeotrXhsawKTNPbqk",
  authDomain: "ash-bot-login-form.firebaseapp.com",
  projectId: "ash-bot-login-form",
  storageBucket: "ash-bot-login-form.firebasestorage.app",
  messagingSenderId: "470812864379",
  appId: "1:470812864379:web:63d27c9211d82f5e6b97de",
  measurementId: "G-PE222N4TQ0",
};

initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();
const signUpButton = document.getElementById("signUpButton");
const loginButton = document.getElementById("loginButton");

if (signUpButton != null) {
  signUpButton.addEventListener("click", async (event) => {
    event.preventDefault();
    let email = document.querySelector("#signup-email").value;
    let password = document.querySelector("#signup-pass").value;
    let username = document.querySelector("#signup-username").value;
    if (email == "" || password == "" || username == "") {
      showToast(
        `<img class="img-toast" src="https://cdn-icons-png.flaticon.com/128/5610/5610967.png">Please Fill All The Fields!`
      );
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        await updateProfile(user, { displayName: username });
        const userData = {
          email: email,
          password: password,
        };

        const docRef = doc(db, "Users", user.uid);
        setDoc(docRef, userData);
      })
      .then(() => {
        showToast(
          '<img class="img-toast" src="https://cdn-icons-png.flaticon.com/128/2550/2550322.png">Account Created Successfully'
        );
      }) 
      setTimeout(() => {
        window.location.href = "http://localhost:5500"
      }, 3000);
    })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === "auth/email-already-in-use") {
          showToast(
            `<img class="img-toast" src="https://cdn-icons-png.flaticon.com/128/5610/5610967.png">Email Address Already Exists!`
          );
        } else {
          showToast(
            `<img class="img-toast" src="https://cdn-icons-png.flaticon.com/128/5610/5610967.png">Unable to Create User!`
          );
        }
      });
  };


if (loginButton != null) {
  loginButton.addEventListener("click", (event) => {
    event.preventDefault();
    let email = document.querySelector("#login-email").value;
    let password = document.querySelector("#login-pass").value;
    if (!email || !password) {
      showToast(
        `<img class="img-toast" src="https://cdn-icons-png.flaticon.com/128/5610/5610967.png">Please Fill All The Fields!`
      );
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        showToast(
          '<img class="img-toast" src="https://cdn-icons-png.flaticon.com/128/2550/2550322.png">Logging In Successfully'
        );
        localStorage.setItem("loggedInUserId", user.uid)
        setTimeout(() => {
          window.location.href = "http://localhost:5500"
        }, 3000);
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === "auth/invalid-credentials") {
          showToast(
            `<img class="img-toast" src="https://cdn-icons-png.flaticon.com/128/5610/5610967.png"> Invalid Credentials!`
          );
        } else {
          showToast(
            `<img class="img-toast" src="https://cdn-icons-png.flaticon.com/128/5610/5610967.png">Account Not Found!`
          );
        }
      });
  });
}
