importScripts("https://www.gstatic.com/firebasejs/9.20.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.20.0/firebase-messaging-compat.js");
firebase.initializeApp({
 apiKey: "AIzaSyCMb94W_pueOdTVEvAWvr_nhlSKW0-W028",
 authDomain: "flashcards-79b8b.firebaseapp.com",
 projectId: "flashcards-79b8b",
 storageBucket: "flashcards-79b8b.appspot.com",
 messagingSenderId: "692722538213",
 appId: "1:692722538213:web:2583c20d8e68c52ada260c",
//  measurementId: "config data from general tab"
});
const messaging = firebase.messaging();