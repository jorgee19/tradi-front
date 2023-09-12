import firebase from 'firebase';


const config = {
    apiKey: "AIzaSyAJcVbIDSy81dNBBRelWAvtedEV9x3NaRk",
    authDomain: "tradimessenger.firebaseapp.com",
    databaseURL: "https://tradimessenger-default-rtdb.firebaseio.com/",
    projectId: "tradimessenger",
    storageBucket: "tradimessenger.appspot.com",
    messagingSenderId: "443898765552",
    appId: "1:443898765552:web:c7dc44a444e89c0f6fe235",
    measurementId: "G-JQBV19QSWX"
  };

firebase.initializeApp(config);


export default firebase;