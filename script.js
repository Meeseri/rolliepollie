


//Mood Tracker app

const moodButtons = document.querySelectorAll('.mood-button');
const currentMoodDisplay = document.getElementById('current-mood');

moodButtons.forEach(button => {
    button.addEventListener('click', () => {
        const mood = button.getAttribute('data-mood');
        currentMoodDisplay.textContent = mood;
    });
});


// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";

import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-analytics.js";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyCjO5VGCil8M3C8Qcq1pU3a2lmRksSNkmc",

  authDomain: "rollie-pollie-a89c9.firebaseapp.com",

  databaseURL: "https://rollie-pollie-a89c9-default-rtdb.firebaseio.com",

  projectId: "rollie-pollie-a89c9",

  storageBucket: "rollie-pollie-a89c9.firebasestorage.app",

  messagingSenderId: "620125294506",

  appId: "1:620125294506:web:a8935c1216d12bdb57e5d3",


};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

const db = firebaseConfig.firestore(app);


// Guestbook


const guestbookForm = document.getElementById('guestbook-form');
const guestbookEntries = document.getElementById('guestbook-entries');

//loading up entries from firestore!

db.collection('guestbook').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
    guestbookEntries.innerHTML = ''; //clear existing entries
    snapshot.forEach(doc => {
    const entry = doc.data();
    addGuestbookEntry(entry.name, entry.message);
    });
});

//handling submissions~

guestbookForm.addEventListener('submit', (e) => {
    e.preventDefault(); //prevent form submission

    const name = document.getElementById('guest-name').ariaValueMax;
    const message = document.getElementById('guest-message').ariaValueMax;

    //save entry to firestore db!

    db.collection('guestbook').add({
        name,
        message,
        timestamp: frebase.firestore.FieldValue.serverTimestamp()
    });

    guestbookForm.reset();
});
//fujnction for adding guestbook input to web page!
function addGuestbookEntry(name, message) {
    const entry = document.createElement('div');
    entry.classList.add('guestbook-entry');
    entry.innerHTML = `<p><strong>${name}:</strong> ${message}</p>`;
    guestbookEntries.appendChild(entry);
}