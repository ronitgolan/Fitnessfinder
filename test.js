import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export function moveToSignUp() {
  window.location.assign("register.html");
}
