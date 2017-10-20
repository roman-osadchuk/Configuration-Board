import firebase from 'firebase';

const configFireBase = {
    apiKey: "AIzaSyBirmosAIvIT9zSwRRuD93Cqsz-vu77Hoc",
    authDomain: "epam-dw-rd-lab.firebaseapp.com",
    databaseURL: "https://epam-dw-rd-lab.firebaseio.com",
    projectId: "epam-dw-rd-lab",
    storageBucket: "epam-dw-rd-lab.appspot.com",
    messagingSenderId: "55833954833"
};

firebase.initializeApp(configFireBase);

const ref = firebase.database().ref();

export default ref;
