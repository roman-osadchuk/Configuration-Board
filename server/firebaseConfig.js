import firebase from 'firebase';

let configFireBase = {
    apiKey: "AIzaSyBirmosAIvIT9zSwRRuD93Cqsz-vu77Hoc",
    authDomain: "epam-dw-rd-lab.firebaseapp.com",
    databaseURL: "https://epam-dw-rd-lab.firebaseio.com",
    projectId: "epam-dw-rd-lab",
    storageBucket: "epam-dw-rd-lab.appspot.com",
    messagingSenderId: "55833954833"
};

firebase.initializeApp(configFireBase);

let ref = firebase.database().ref();

export default ref; 
