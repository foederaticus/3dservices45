import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-auth.js";
import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-database.js";

// 🔥 Configuration Firebase
const firebaseConfig = {
    apiKey: "AIzaSyA_E4pTqzqxR7uPpSQ0jqfJFgSLDYdt5lk",
  authDomain: "mmatrx3dconnect.firebaseapp.com",
  projectId: "mmatrx3dconnect",
  storageBucket: "mmatrx3dconnect.firebasestorage.app",
  messagingSenderId: "729919228332",
  appId: "1:729919228332:web:f2addf83992f2165521209",
  measurementId: "G-2S4HS4BYJB"
};

// Initialisation Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

// Sélection des éléments du DOM
const authForm = document.getElementById("authForm");
const fullNameInput = document.getElementById("fullName");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const toggleAuth = document.getElementById("toggleAuth");
const logoutButton = document.getElementById("logoutButton");

let isRegistering = false; // Mode inscription ou connexion

// 🔄 Basculer entre connexion et inscription
toggleAuth.addEventListener("click", (e) => {
    e.preventDefault();
    isRegistering = !isRegistering;

    if (isRegistering) {
        fullNameInput.style.display = "block"; // Afficher le champ Nom et prénom
        authForm.querySelector("button").textContent = "S'inscrire";
        toggleAuth.innerHTML = "Déjà un compte ? <a href='#'>Se connecter</a>";
    } else {
        fullNameInput.style.display = "none";
        authForm.querySelector("button").textContent = "Se connecter";
        toggleAuth.innerHTML = "Pas encore inscrit ? <a href='#'>Créer un compte</a>";
    }
});

// 📩 Gérer l'inscription et la connexion
authForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;
    const fullName = fullNameInput.value;

    if (isRegistering) {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                set(ref(db, 'users/' + user.uid), { fullName, email });
                alert("Compte créé avec succès !");
            })
            .catch((error) => {
                alert(error.message);
            });
    } else {
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                alert("Connexion réussie !");
                window.location.href = "index.html";
            })
            .catch((error) => {
                alert(error.message);
            });
    }
});

// 🚪 Déconnexion utilisateur
logoutButton.addEventListener("click", () => {
    signOut(auth).then(() => {
        alert("Déconnexion réussie !");
    });
});
