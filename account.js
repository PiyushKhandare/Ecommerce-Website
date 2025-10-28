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

// ----------- Floating Popup Message Utility -----------
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

// ----------- User Registration -----------
const regFormEl = document.getElementById("RegForm");
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
  if (users.some((user) => user.email === email)) {
    showAlert("User already registered!", "error");
    return;
  }

  users.push({ username, email, password });
  localStorage.setItem("users", JSON.stringify(users));
  showAlert("Registration successful! Please log in.", "success");
  setTimeout(() => login(), 700);
});

// ----------- Login + Remember Me -----------
const loginFormEl = document.getElementById("LoginForm");
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
    if (rememberMe) {
      localStorage.setItem("loggedInUser", JSON.stringify(validUser));
    } else {
      sessionStorage.setItem("loggedInUser", JSON.stringify(validUser));
    }
    showAlert(`Welcome back, ${validUser.username}!`, "success");
    setTimeout(() => (window.location.href = "index.html"), 1200);
  } else {
    showAlert("Invalid credentials. Try again!", "error");
  }
});

// ----------- Check Login Status -----------
const currentUser =
  JSON.parse(localStorage.getItem("loggedInUser")) ||
  JSON.parse(sessionStorage.getItem("loggedInUser"));

// ----------- Prevent Sticky Popup on Return -----------
if (currentUser && window.location.pathname.includes("account.html")) {
  // Don’t show the popup every time — just auto-redirect quietly
  window.location.replace("index.html");
}


// ----------- Responsive Menu Toggle -----------
const MenuItems = document.getElementById("MenuItems");
if (MenuItems) {
  MenuItems.style.maxHeight = "0px";
  function menutoggle() {
    MenuItems.style.maxHeight =
      MenuItems.style.maxHeight === "0px" ? "200px" : "0px";
  }
  window.menutoggle = menutoggle;
}

// ----------- Dynamic Year Update -----------
const copyrightText = document.getElementById("copyright-text");
if (copyrightText) {
  const year = new Date().getFullYear();
  copyrightText.innerHTML = `&copy; ${year} Red Store`;
}
