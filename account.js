// ----------- Toggle Between Login & Register Forms -----------
const LoginForm = document.getElementById("LoginForm");
const RegForm = document.getElementById("RegForm");
const Indicator = document.getElementById("indicator");

function register() {
  RegForm.style.transform = "translateX(0px)";
  LoginForm.style.transform = "translateX(0px)";
  Indicator.style.transform = "translateX(100px)";
}

function login() {
  RegForm.style.transform = "translateX(300px)";
  LoginForm.style.transform = "translateX(300px)";
  Indicator.style.transform = "translateX(0px)";
}

// ----------- User Registration and Login System -----------
const regFormEl = document.getElementById("RegForm");
const loginFormEl = document.getElementById("LoginForm");

// Floating message utility
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

// Save user data locally
regFormEl.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = RegForm.querySelector('input[placeholder="Username"]').value.trim();
  const email = RegForm.querySelector('input[placeholder="Email"]').value.trim();
  const password = RegForm.querySelector('input[placeholder="Password"]').value.trim();

  if (!username || !email || !password) {
    showAlert("All fields are required!", "error");
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const userExists = users.some((user) => user.email === email);
  if (userExists) {
    showAlert("User already registered!", "error");
    return;
  }

  users.push({ username, email, password });
  localStorage.setItem("users", JSON.stringify(users));

  showAlert("Registration successful! Please log in.", "success");
  setTimeout(() => login(), 700);
});

// Login + Remember Me
loginFormEl.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = LoginForm.querySelector('input[placeholder="Username or Email"]').value.trim();
  const password = LoginForm.querySelector('input[placeholder="Password"]').value.trim();
  const rememberMe = document.getElementById("rememberMe").checked;

  if (!username || !password) {
    showAlert("Please enter username/email and password!", "error");
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const validUser = users.find(
    (user) =>
      (user.username === username || user.email === username) &&
      user.password === password
  );

  if (validUser) {
    // Save login info
    if (rememberMe) {
      localStorage.setItem("loggedInUser", JSON.stringify(validUser));
    } else {
      sessionStorage.setItem("loggedInUser", JSON.stringify(validUser));
    }

    showAlert(`Welcome back, ${validUser.username}!`, "success");
    setTimeout(() => (window.location.href = "index.html"), 1500);
  } else {
    showAlert("Invalid credentials. Try again!", "error");
  }
});

// ----------- Auto Redirect if Already Logged In -----------
const currentUser =
  JSON.parse(localStorage.getItem("loggedInUser")) ||
  JSON.parse(sessionStorage.getItem("loggedInUser"));

if (currentUser && window.location.pathname.includes("account.html")) {
  showAlert(`You're already logged in as ${currentUser.username}`, "success");
  setTimeout(() => (window.location.href = "index.html"), 1500);
}

// ----------- Logout Button Handling -----------
function createLogoutButton() {
  const nav = document.querySelector(".navbar nav ul");
  if (!nav.querySelector("#logoutBtn")) {
    const li = document.createElement("li");
    li.innerHTML = `<a href="#" id="logoutBtn" style="color:red;font-weight:600;">Logout</a>`;
    nav.appendChild(li);

    li.addEventListener("click", () => {
      localStorage.removeItem("loggedInUser");
      sessionStorage.removeItem("loggedInUser");
      showAlert("Logged out successfully!", "success");
      setTimeout(() => (window.location.href = "account.html"), 1000);
    });
  }
}

if (currentUser) {
  createLogoutButton();
}

// ----------- Responsive Menu Toggle -----------
const MenuItems = document.getElementById("MenuItems");
if (MenuItems) {
  MenuItems.style.maxHeight = "0px";

  function menutoggle() {
    if (MenuItems.style.maxHeight === "0px") {
      MenuItems.style.maxHeight = "200px";
    } else {
      MenuItems.style.maxHeight = "0px";
    }
  }

  window.menutoggle = menutoggle;
}

// ----------- Dynamic Year Update -----------
const copyrightText = document.getElementById("copyright-text");
if (copyrightText) {
  const year = new Date().getFullYear();
  copyrightText.innerHTML = `&copy; ${year} Red Store`;
}
