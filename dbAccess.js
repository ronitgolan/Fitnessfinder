import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.9.4/firebase-auth.js";
import {
  getDatabase,
  set,
  ref,
  update,
} from "https://www.gstatic.com/firebasejs/9.9.4/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCOIp_f2BkCpSBUU0AcXmUffusxA3DxFis",
  authDomain: "hotelproj-16896.firebaseapp.com",
  databaseURL: "https://hotelproj-16896-default-rtdb.firebaseio.com",
  projectId: "hotelproj-16896",
  storageBucket: "hotelproj-16896.appspot.com",
  messagingSenderId: "171577794479",
  appId: "1:171577794479:web:57e39bf02840ade9f3995a",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase(app);

export function initRegister() {
  document.getElementById("signUp").addEventListener("click", signUp);
  document.getElementById("moveToLogin").addEventListener("click", moveToLogin);
}

export function initLogin() {
  document.getElementById("signIn").addEventListener("click", signIn);
}

export function initEditData() {
  document.getElementById("editData").addEventListener("click", editData);
  document.getElementById("signUp").addEventListener("click", moveToMap);
}

export function signUp() {
  var name = document.getElementById("name").value;
  var familyName = document.getElementById("familyName").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      set(ref(database, "users/" + user.uid), {
        name: name,
        familyName: familyName,
        email: email,
      }).then(() => {
        alert("Registration was successful!");
        moveToLogin();
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
}

export function signIn() {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      if (email == "admin@gmail.com") {
        window.location.assign("adminPage.html");
      } else {
        window.location.replace("map.html");
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
}

export function editData() {
  var hotel = document.getElementById("hotelName");
  var name = document.getElementById("name").value;
  var price = document.getElementById("price").value;
  var city = document.getElementById("city").value;
  var telephone = document.getElementById("telephone").value;

  if (price == "" || city == "" || telephone == "" || name == "") {
    alert("Please fill all the required fields!");
  } else {
    update(ref(database, "hotels/" + hotel.value), {
      Name: name,
      Price: price,
      City: city,
      Telephone: telephone,
    });
    alert("The data was successfully updated!");
  }
}

export function moveToMap() {
  window.location.assign("map.html");
}
export function moveToSignUp() {
  window.location.assign("register.html");
}
export function moveToEdit() {
  window.location.assign("editData.html");
}
export function moveToLogin() {
  window.location.replace("Login.html");
}
