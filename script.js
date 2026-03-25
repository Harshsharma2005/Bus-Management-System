// Light/Dark Mode Toggle
document.getElementById('modeToggle').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    this.textContent = document.body.classList.contains('dark-mode') ? '☀' : '🌙';
});

// Login System
document.getElementById('loginForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    if (username === "admin" && password === "admin123") {
        window.location.href = "admin.html";
    } else {
        alert("Invalid Credentials");
    }
});

// Booking System
document.getElementById('bookingForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    let busNumber = document.getElementById('busNumber').value;
    let studentName = document.getElementById('studentName').value;

    let bookingRef = ref(db, 'bookings/' + busNumber);
    get(bookingRef).then(snapshot => {
        let bookedSeats = snapshot.val() ? snapshot.val().seatsBooked : 0;
        let availableSeats = 20 - bookedSeats;

        if (availableSeats > 0) {
            set(bookingRef, { seatsBooked: bookedSeats + 1 });
            document.getElementById('bookingMessage').innerHTML = <p>Seat booked for ${studentName} on bus ${busNumber}. Seats left: ${availableSeats - 1}</p>;
        } else {
            document.getElementById('bookingMessage').innerHTML = <p>Bus ${busNumber} is full.</p>;
        }
    });
});



// Import and configure Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, set, get, child, update } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// Firebase Config (Replace with your Firebase config)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();
const auth = getAuth();

// User Registration
document.getElementById('registerForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    let email = document.getElementById('registerEmail').value;
    let password = document.getElementById('registerPassword').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            alert("User registered successfully!");
        })
        .catch(error => {
            alert(error.message);
        });
});

// User Login
document.getElementById('loginForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    let email = document.getElementById('loginEmail').value;
    let password = document.getElementById('loginPassword').value;

    signInWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            window.location.href = "booking.html"; // Redirect after login
        })
        .catch(error => {
            alert(error.message);
        });
});