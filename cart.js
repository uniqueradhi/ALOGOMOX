
let cart = JSON.parse(localStorage.getItem("cart")) || {};


function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}


function updateCart() {
  let totalSpent = 0;

  
  const cartItemsContainer = document.getElementById("cart-items-container"); 
  if (cartItemsContainer) {
    cartItemsContainer.innerHTML = ""; 

    
    for (const itemId in cart) {
      const item = cart[itemId];
      totalSpent += item.price * item.quantity;

      
      const itemElement = document.createElement("div");
      itemElement.classList.add("cart-item");
      
      
      itemElement.innerHTML = `
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">$${item.price.toFixed(2)}</div>
        <div class="cart-item-quantity">Quantity: ${item.quantity}</div>
      `;
      
      
      cartItemsContainer.appendChild(itemElement);
    }
  }

  
  const totalElement = document.getElementById("total");
  if (totalElement) {
    totalElement.innerText = `$${totalSpent.toFixed(2)}`;
  }

  
  saveCart();
}


document.querySelectorAll(".fruit-card").forEach((card) => {
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
      quantityDisplay.innerText = 1;
    }
    addToCartBtn.style.display = "none";
    quantityControls.style.display = "block";
    updateCart();
  });

  
  decreaseBtn.addEventListener("click", () => {
    if (cart[id] && cart[id].quantity > 1) {
      cart[id].quantity -= 1;
      quantityDisplay.innerText = cart[id].quantity;
    } else if (cart[id] && cart[id].quantity === 1) {
      delete cart[id];
      addToCartBtn.style.display = "block";
      quantityControls.style.display = "none";
    }
    updateCart();
  });

  
  increaseBtn.addEventListener("click", () => {
    if (cart[id]) {
      cart[id].quantity += 1;
      quantityDisplay.innerText = cart[id].quantity;
    }
    updateCart();
  });
});


document.querySelector(".view-cart-btn").addEventListener("click", () => {
  window.location.href = "cart.html";
});


updateCart();
