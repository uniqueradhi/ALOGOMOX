
let cart = JSON.parse(localStorage.getItem("cart")) || {};


function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}


function updateCart() {
  let totalSpent = 0;

  
  for (const itemId in cart) {
    totalSpent += cart[itemId].price * cart[itemId].quantity;
  }

  
  const totalElement = document.getElementById("total");
  if (totalElement) {
    totalElement.innerText = `₹${totalSpent.toFixed(2)}`;
  }

  
  saveCart();
}


function initializeProductCard(card) {
  const addToCartBtn = card.querySelector(".add-to-cart");
  const quantityControls = card.querySelector(".quantity-controls");
  const decreaseBtn = card.querySelector(".decrease");
  const increaseBtn = card.querySelector(".increase");
  const quantityDisplay = card.querySelector(".quantity");

  
  const id = card.dataset.id;
  const name = card.dataset.name;
  const price = parseFloat(card.dataset.price);

  
  if (cart[id]) {
    addToCartBtn.style.display = "none";
    quantityControls.style.display = "block";
    quantityDisplay.innerText = cart[id].quantity;
  }

  
  addToCartBtn.addEventListener("click", () => {
    if (!cart[id]) {
      cart[id] = { name, price, quantity: 1 };
      quantityDisplay.innerText = cart[id].quantity;
      addToCartBtn.style.display = "none";
      quantityControls.style.display = "block";
      updateCart();
    }
  });

  
  increaseBtn.addEventListener("click", () => {
    cart[id].quantity++;
    quantityDisplay.innerText = cart[id].quantity;
    updateCart();
  });

  
  decreaseBtn.addEventListener("click", () => {
    if (cart[id].quantity > 1) {
      cart[id].quantity--;
      quantityDisplay.innerText = cart[id].quantity;
      updateCart();
    }
  });
}


function initializeCategories() {
  
  const categories = [
    "dairy", "fruits", "vegetable", "oralcare", "masala", 
    "oils", "snack", "product", "cool-drink", "biscuits", 
    "frozen", "meat"
  ];

  categories.forEach((category) => {
    
    document.querySelectorAll(`.${category}-card`).forEach(initializeProductCard);
  });
}


document.addEventListener('DOMContentLoaded', function () {
  initializeCategories();
  updateCart();
});


document.querySelector(".view-cart-btn")?.addEventListener("click", () => {
  window.location.href = "cart.html";
});





function toggleTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeIcon = document.getElementById('theme-icon');
  const currentTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
  if (currentTheme === 'light') {
    document.body.classList.remove('light-theme');
    document.body.classList.add('dark-theme');
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
    localStorage.setItem('theme', 'dark'); 
  } else {
    document.body.classList.remove('dark-theme');
    document.body.classList.add('light-theme');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
    localStorage.setItem('theme', 'light'); 
  }
}
window.onload = function () {
  const savedTheme = localStorage.getItem('theme');
  const themeIcon = document.getElementById('theme-icon');

  if (savedTheme) {
    document.body.classList.add(savedTheme + '-theme');
    if (savedTheme === 'dark') {
      themeIcon.classList.add('fa-moon');
    } else {
      themeIcon.classList.add('fa-sun');
    }
  } else {
    const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (userPrefersDark) {
      document.body.classList.add('dark-theme');
      themeIcon.classList.add('fa-moon');
    } else {
      document.body.classList.add('light-theme');
      themeIcon.classList.add('fa-sun');
    }
  }
};
document.getElementById('theme-toggle-btn').addEventListener('click', toggleTheme);





