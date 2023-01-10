import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-app.js";

var firebaseConfig = {
  apiKey: "AIzaSyCOIp_f2BkCpSBUU0AcXmUffusxA3DxFis",
  authDomain: "hotelproj-16896.firebaseapp.com",
  databaseURL: "https://hotelproj-16896-default-rtdb.firebaseio.com",
  projectId: "hotelproj-16896",
  storageBucket: "hotelproj-16896.appspot.com",
  messagingSenderId: "171577794479",
  appId: "1:171577794479:web:57e39bf02840ade9f3995a",
};

const app = initializeApp(firebaseConfig);

export function signUp() {
  var email = document.getElementById("email");
  var password = document.getElementById("password");

  const promise = firebase
    .auth()
    .createUserWithEmailAndPassword(email.value, password.value)
    .then(
      function (user) {
        var user = firebase.auth().currentUser;
        logUser(user); // Optional
      },
      function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(error.message);
      }
    );

  function logUser(user) {
    var ref = firebase.database().ref("users");
    var obj = {
      name: getId("name"),
      familyName: getId("familyName"),
      emaill: getId("email"),
    };
    ref.push(obj);

    function getId(id) {
      return document.getElementById(id).value;
    }
    alert("Registration was successful!");
    moveToLogin();
  }
}

function signIn() {
  var email = document.getElementById("email");
  var password = document.getElementById("password");

  const promise = firebase
    .auth()
    .signInWithEmailAndPassword(email.value, password.value);
  promise
    .then((userCredential) => {
      if (email.value == "df@gmail.com") {
        window.location.assign("adminPage.html");
      } else {
        window.location.replace("map.html");
      }
    })
    .catch((error) => {
      const errorMessage = error.message;
      alert(errorMessage);
    });
}

function editData() {
  var trackType = document.getElementById("trackType").value;
  var price = document.getElementById("price").value;
  var city = document.getElementById("city").value;
  var telephone = document.getElementById("telephone").value;
  var hours = document.getElementById("hours").value;

  if (price == "" || city == "" || telephone == "" || hours == "") {
    alert("Please fill all the required fields!");
  } else {
    firebase.database().ref().child(trackType).update({
      Name: trackType,
      Price: price,
      City: city,
      Telephone: telephone,
      Hours: hours,
    });

    alert("The data was successfully updated!");
  }
}
