// Retrieve cart from localStorage or initialize an empty one
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Function to update cart count in navbar
function updateCartCount() {
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartIcons = document.querySelectorAll("a[href='cart.html'] img");

  // Create a badge dynamically next to each cart icon
  cartIcons.forEach(icon => {
    let badge = icon.nextElementSibling;
    if (!badge || !badge.classList.contains("cart-count")) {
      badge = document.createElement("span");
      badge.classList.add("cart-count");
      badge.style.position = "absolute";
      badge.style.top = "-5px";
      badge.style.right = "-10px";
      badge.style.background = "red";
      badge.style.color = "white";
      badge.style.borderRadius = "50%";
      badge.style.fontSize = "12px";
      badge.style.padding = "2px 6px";
      badge.style.fontWeight = "bold";
      icon.parentElement.style.position = "relative";
      icon.after(badge);
    }
    badge.textContent = totalCount;
  });
}

// Add to cart button logic
function setupAddToCart() {
  const buttons = document.querySelectorAll(".add-to-cart-btn");
  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const name = button.dataset.name;
      const price = parseFloat(button.dataset.price);
      const image = button.dataset.image;

      const existing = cart.find(item => item.name === name);
      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({ name, price, image, quantity: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCount();
      alert(`${name} added to cart!`);
    });
  });
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  setupAddToCart();
  updateCartCount();
});
