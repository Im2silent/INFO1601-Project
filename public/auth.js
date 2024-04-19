import { auth, db } from './fireBaseConfig.js';
import { doc, setDoc, serverTimestamp} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js"; 
import { GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

// Function to sign in with Google
export function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then((result) => {
            // Google sign-in successful
            console.log("Google sign-in successful:", result.user.displayName);
            alert(`Welcome, ${result.user.displayName}! You are now logged in. Redirecting...`);
            // Redirect user to index.html after successful sign-in
            setTimeout(() => {
                window.location.href = "index.html";
            }, 2000);
            
        })
        .catch((error) => {
            // Handle errors
            const code = 2;
            error = code;
            console.error("Google sign-in error:", 'Error Logging in', error);
        });
}

// Function to sign out
export function logOut() {
    auth.signOut()
        .then(() => {
            console.log('User signed out successfully.');
        })
        .catch((error) => {
            console.error('Error signing out:', error.message);
        });
}

export async function submitReview(reviewText, displayName) {
    if (typeof displayName === 'string' && displayName.trim() !== '') {
        // Only store data if displayName is a non-empty string
        const rData = {
            displayName: displayName,
            reviewText: reviewText,
            timestamp: serverTimestamp(),
            userId: auth.currentUser.uid
        };
    
        await setDoc(doc(db, "reviews", auth.currentUser.uid), { [Date.now()]: rData }, { merge: true })
            .then(() => {
                alert('Review submitted successfully!');
                document.getElementById('review-text').value = ''; // Clear the textarea
            })
            .catch((error) => {
                const code = 3;
                error = code;
                console.error('Error adding review: ', error);
                alert('An error occurred while submitting the review.');
            });
    }
}

// Listener for authentication state changes
auth.onAuthStateChanged((user) => {
    // Check if the current page is not the login page
    if (window.location.pathname !== '/login.html' && window.location.pathname !== '/profile.html') {
        const loginButton = document.getElementById('login-btn');
        if (user) {
            // User is signed in
            console.log("User is signed in:", user.displayName);
            // Update UI to show logged-in state with profile picture
            const profilePic = user.photoURL;
            loginButton.innerHTML = `<img src="${profilePic}" alt="Profile Picture" id="pfp">`;
            loginButton.href = "profile.html"; // Link to profile page
        } else {
            // User is signed out
            console.log("User is signed out");
            // Update UI to show logged-out state
            loginButton.textContent = "Login"; // Change back to "Login" text
            loginButton.href = "login.html"; // Link to login page
        }
    }
});
