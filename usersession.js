// ---------------- Global User Session Handler ----------------

// Check current logged-in user (localStorage or sessionStorage)
const currentUser =
  JSON.parse(localStorage.getItem("loggedInUser")) ||
  JSON.parse(sessionStorage.getItem("loggedInUser"));

// Utility: floating alert message
function showAlert(message, type = "success") {
  const alert = document.createElement("div");
  alert.textContent = message;
  alert.style.position = "fixed";
  alert.style.top = "20px";
  alert.style.right = "20px";
  alert.style.padding = "12px 20px";
  alert.style.zIndex = "9999";
  alert.style.borderRadius = "6px";
  alert.style.fontWeight = "500";
  alert.style.color = "#fff";
  alert.style.backgroundColor =
    type === "success" ? "#28a745" : type === "error" ? "#dc3545" : "#ffc107";
  alert.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";
  document.body.appendChild(alert);
  setTimeout(() => alert.remove(), 3000);
}

// Function to update navbar
function updateNavbarUser() {
  const navList = document.querySelector(".navbar nav ul");
  if (!navList) return;

  // Remove old user elements if any
  document.querySelectorAll("#userWelcome, #logoutBtn").forEach(el => el.remove());

  if (currentUser) {
    const userItem = document.createElement("li");
    userItem.id = "userWelcome";
    userItem.innerHTML = `<a href="#" style="font-weight:600;">👋 ${currentUser.username}</a>`;

    const logoutItem = document.createElement("li");
    logoutItem.innerHTML = `<a href="#" id="logoutBtn" style="color:red;font-weight:600;">Logout</a>`;

    navList.appendChild(userItem);
    navList.appendChild(logoutItem);

    // Logout handler
    logoutItem.addEventListener("click", () => {
      localStorage.removeItem("loggedInUser");
      sessionStorage.removeItem("loggedInUser");
      showAlert("Logged out successfully!", "success");
      setTimeout(() => (window.location.href = "account.html"), 1000);
    });
  }
}

// Run once DOM is ready
document.addEventListener("DOMContentLoaded", updateNavbarUser);
