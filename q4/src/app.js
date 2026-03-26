// CYSE 411 Exam Application
// WARNING: This code contains security vulnerabilities.
// Students must repair the implementation.

const loadBtn = document.getElementById("loadBtn");
const saveBtn = document.getElementById("saveSession");
const loadSessionBtn = document.getElementById("loadSession");

loadBtn.addEventListener("click", loadProfile);
saveBtn.addEventListener("click", saveSession);
loadSessionBtn.addEventListener("click", loadSession);

let currentProfile = null;


/* -------------------------
   Load Profile
-------------------------- */

function loadProfile() {

    const text = document.getElementById("profileInput").value;

    let profile;
    try {
        profile = JSON.parse(text);

        // Validate required fields
        if (!profile || typeof profile.username !== "string" || !Array.isArray(profile.notifications)) {
            console.warn("Invalid profile data.");
            alert("Failed to load profile: invalid input.");
            return;
        }

        // Keep only expected fields
        profile = {username: profile.username, notifications: profile.notifications};
    } catch (e) {
        console.error("Failed to parse JSON:", e);
        alert("Failed to load profile: Invalid JSON.");
        return;
    }

    currentProfile = profile;

    renderProfile(profile);
}


/* -------------------------
   Render Profile
-------------------------- */

function renderProfile(profile) {
    
    // Safely render username
    const usernameEl = document.getElementById("username");
    usernameEl.textContent = profile.username;

    // Safely render notifications
    const list = document.getElementById("notifications");
    list.innerHTML = ""; // Clear existing notifications

    for (let n of profile.notifications) {
        const li = document.createElement("li");
        li.textContent = n; // Safe insertion
        list.appendChild(li);
    }
}


/* -------------------------
   Browser Storage
-------------------------- */

function saveSession() {
    
    if (!currentProfile) return;

    // Only store expected fields
    const safeProfile = {username: currentProfile.username, notifications: currentProfile.notifications};

    try {
        localStorage.setItem("profile", JSON.stringify(safeProfile));
        alert("Session saved");
    } catch (e) {
        console.error("Failed to save session:", e);
        alert("Unable to save session safely.");
    }
}


function loadSession() {

    const stored = localStorage.getItem("profile");

    if (!stored) return;

    let profile;
    try {
        profile = JSON.parse(stored);

        // Validate required fields
        if (!profile || typeof profile.username !== "string" || !Array.isArray(profile.notifications)) {
            console.warn("Stored session is invalid or corrupted.");
            alert("Stored session is invalid.");
            return;
        }

        // Keep only expected fields
        profile = {username: profile.username, notifications: profile.notifications};

    } catch (e) {
        console.error("Failed to parse stored session:", e);
        alert("Stored session is corrupted.");
        return;
    }

    currentProfile = profile;
    renderProfile(profile);
}
