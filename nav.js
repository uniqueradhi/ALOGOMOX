function toggleNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburgerMenu = document.getElementById('hamburger-menu');

  
  navbar.classList.toggle('show');

  
  hamburgerMenu.classList.toggle('open');
}

let slideIndex = 0;

function showSlides() {
  let slides = document.querySelectorAll(".mySlides");
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  slides[slideIndex - 1].style.display = "block";
  setTimeout(showSlides, 5000); 
}
showSlides();

document.addEventListener("DOMContentLoaded", function () {
  const themeToggleButton = document.getElementById('theme-toggle-btn');
  const body = document.body;

  
  let currentTheme = localStorage.getItem('theme') || 'light-theme';
  body.classList.add(currentTheme);

  
  const themeDependentElements = () => {
    const cards = document.querySelectorAll(".offer-card");
    const navbar = document.getElementById('navbar');
    const slides = document.querySelectorAll(".mySlides");
    const footer = document.querySelector("footer");

    
    if (body.classList.contains('dark-theme')) {
      navbar.style.backgroundColor = "#1e1e1e";
      navbar.style.color = "#f1f1f1";
      footer.style.backgroundColor = "#1e1e1e";
      footer.style.color = "#f1f1f1";
      slides.forEach(slide => slide.style.backgroundColor = "#121212");
      cards.forEach(card => card.style.backgroundColor = "#1e1e1e");
      cards.forEach(card => card.style.color = "#f1f1f1");
    } else {
      navbar.style.backgroundColor = "#f1f1f1";
      navbar.style.color = "#000000";
      footer.style.backgroundColor = "#f1f1f1";
      footer.style.color = "#000000";
      slides.forEach(slide => slide.style.backgroundColor = "#ffffff");
      cards.forEach(card => card.style.backgroundColor = "#ffffff");
      cards.forEach(card => card.style.color = "#000000");
    }
  };

  
  themeDependentElements();

  
  themeToggleButton.addEventListener('click', () => {
    if (body.classList.contains('light-theme')) {
      body.classList.remove('light-theme');
      body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark-theme');
    } else {
      body.classList.remove('dark-theme');
      body.classList.add('light-theme');
      localStorage.setItem('theme', 'light-theme');
    }
    
    themeDependentElements();
  });

  
  const cards = document.querySelectorAll(".offer-card");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateX(0)";
        }
      });
    },
    { threshold: 0.2 }
  );
  cards.forEach((card) => observer.observe(card));
});

document.addEventListener("DOMContentLoaded", () => {
  const brandItems = document.querySelectorAll(".brand-item");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1 } 
  );

  brandItems.forEach((item) => observer.observe(item));
});
document.querySelector('.view-all').addEventListener('click', function (event) {
  event.preventDefault(); 
  window.location.href = "viewAll.html"; 
});

function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return rect.top >= 0 && rect.bottom <= window.innerHeight;
}


document.addEventListener("scroll", () => {
  const productCards = document.querySelectorAll(".product-card");
  productCards.forEach((card) => {
    if (isInViewport(card)) {
      card.classList.add("active"); 
    }
  });
});








document.addEventListener("DOMContentLoaded", function () {
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  if (isMobile) {
    document.body.classList.add("native-mobile");
  }
});




const sliderTrack = document.querySelector('.slider-track');
const slides = document.querySelectorAll('.slide');
const prevButton = document.getElementById('prev-btn');
const nextButton = document.getElementById('next-btn');

let currentIndex = 0; 
const totalSlides = slides.length;


function updateSliderPosition() {
  const slideWidth = slides[0].clientWidth; 
  sliderTrack.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}


prevButton.addEventListener('click', () => {
  currentIndex = (currentIndex === 0) ? totalSlides - 1 : currentIndex - 1; 
  updateSliderPosition();
});

nextButton.addEventListener('click', () => {
  currentIndex = (currentIndex === totalSlides - 1) ? 0 : currentIndex + 1; 
  updateSliderPosition();
});


window.addEventListener('resize', updateSliderPosition);



document.addEventListener("DOMContentLoaded", () => {
  const searchBar = document.getElementById("search-bar");
  const suggestionsList = document.getElementById("suggestions");
  const addItemBtn = document.getElementById("add-item-btn");
  const budgetInput = document.getElementById("budget");
  const totalSpent = document.getElementById("total");
  const remainingBudget = document.getElementById("remaining-budget");
  const finalizeButton = document.getElementById("finalize-btn");
  const categoryElements = {
    vegetables: document.getElementById("vegetables-items"),
    fruits: document.getElementById("fruits-items"),
    dairy: document.getElementById("dairy-items"),
    snacks: document.getElementById("snacks-items"),
    spices: document.getElementById("spices-items"),
    dryFruits: document.getElementById("dry-fruits-items"),
    grains: document.getElementById("grains-items"),
    others: document.getElementById("others-items"),
  };

  const defaultPrices = {
    tomato: 20, potato: 30, onion: 40, spinach: 25, carrot: 35,
    apple: 50, banana: 10, orange: 30, grape: 60, watermelon: 100,
    milk: 50, cheese: 80, butter: 90, yogurt: 40, cream: 100,
    chips: 20, cookies: 30, chocolate: 50, popcorn: 40, biscuits: 25,
    almonds: 150, cashews: 200, walnuts: 250, pistachios: 300, raisins: 100,
    "wheat flour": 50, "rice flour": 60, "corn flour": 40, besan: 50, "sorghum flour": 70,
    rice: 60, wheat: 50, barley: 40, maize: 30, oats: 70,
    turmeric: 20, cumin: 30, coriander: 25, "garam masala": 50, cardamom: 100,
    "toor dal": 90, "moong dal": 80, "masoor dal": 70, "chana dal": 60, "urad dal": 100,
    "curry powder": 40, "tandoori masala": 60, "biryani masala": 80, "chat masala": 50,
  };

  let totalAmountSpent = 0;
  const shoppingList = [];
  let selectedItems = [];

  function updateBudgetDisplay() {
    const budget = parseFloat(budgetInput.value) || 0;
    totalSpent.textContent = totalAmountSpent.toFixed(2);
    remainingBudget.textContent = (budget - totalAmountSpent).toFixed(2);

    
    highlightOverBudgetItems(budget - totalAmountSpent);

    if (totalAmountSpent > budget) {
      alert(`Budget exceeded! Overspending: ₹${(totalAmountSpent - budget).toFixed(2)}`);
    }
  }

  function highlightOverBudgetItems(remainingBudget) {
    const items = document.querySelectorAll(".item-box");
    items.forEach(item => {
      const priceText = item.querySelector("br + span")?.textContent || "0";
      const price = parseFloat(priceText.replace("₹", "")) || 0;
      if (price > remainingBudget) {
        item.style.borderColor = "red"; 
        item.style.backgroundColor = "#ffcccc"; 
      } else {
        item.style.borderColor = ""; 
        item.style.backgroundColor = ""; 
      }
    });
  }

  function addItemToList(item, quantity) {
    const lowerCaseItem = item.toLowerCase();
    const price = defaultPrices[lowerCaseItem] || 0;
    const totalPrice = price * quantity;

    shoppingList.push({ item, quantity, totalPrice });
    totalAmountSpent += totalPrice;
    updateBudgetDisplay();

    const category = getCategory(lowerCaseItem);
    const itemDiv = createItemElement(item, quantity, totalPrice);
    categoryElements[category].appendChild(itemDiv);

    addSelectionHandler(itemDiv, item);
  }

  function getCategory(item) {
    const categories = {
      vegetables: ["tomato", "potato", "onion", "spinach", "carrot"],
      fruits: ["apple", "banana", "orange", "grape", "watermelon"],
      dairy: ["milk", "cheese", "butter", "yogurt", "cream"],
      snacks: ["chips", "cookies", "chocolate", "popcorn", "biscuits"],
      spices: ["turmeric", "cumin", "coriander", "garam masala", "cardamom"],
      dryFruits: ["almonds", "cashews", "walnuts", "pistachios", "raisins"],
      grains: ["wheat flour", "rice flour", "corn flour", "besan", "sorghum flour"],
    };

    for (const [category, items] of Object.entries(categories)) {
      if (items.includes(item)) return category;
    }
    return "others";
  }

  function createItemElement(item, quantity, totalPrice) {
    const div = document.createElement("div");
    div.className = "item-box";
    div.innerHTML = `
      <strong>${item}</strong><br>
      Quantity: ${quantity}<br>
      <span>₹${totalPrice.toFixed(2)}</span>
      <button class="remove-btn">Remove</button>
    `;

    const removeButton = div.querySelector(".remove-btn");
    removeButton.addEventListener("click", () => {
      removeItem(div, item, quantity, totalPrice);
    });

    return div;
  }

  function removeItem(div, item, quantity, totalPrice) {
    div.remove();
    totalAmountSpent -= totalPrice;
    updateBudgetDisplay();

    const index = shoppingList.findIndex(i => i.item === item && i.quantity === quantity);
    shoppingList.splice(index, 1);

    selectedItems = selectedItems.filter(selected => selected !== item);
  }

  function addSelectionHandler(itemDiv, item) {
    itemDiv.addEventListener("click", () => {
      if (selectedItems.includes(item)) {
        selectedItems = selectedItems.filter(selected => selected !== item);
        itemDiv.style.backgroundColor = ""; 
      } else {
        selectedItems.push(item);
        itemDiv.style.backgroundColor = "#c0ffc0"; 
      }
    });

    
    if (!selectedItems.includes(item)) {
      selectedItems.push(item);
      itemDiv.style.backgroundColor = "#c0ffc0"; 
    }
  }

  addItemBtn.addEventListener("click", () => {
    const item = searchBar.value.trim();
    if (!item) {
      alert("Please enter an item name!");
      return;
    }

    const quantity = parseInt(prompt("Enter quantity:", 1)) || 1;
    if (quantity <= 0) {
      alert("Invalid quantity. Please enter a positive number.");
      return;
    }

    addItemToList(item, quantity);
    searchBar.value = "";
    suggestionsList.innerHTML = "";
    suggestionsList.style.display = "none";
  });

  finalizeButton.addEventListener("click", () => {
    if (selectedItems.length === 0) {
      alert("Please select at least one item.");
      return;
    }

    
    localStorage.setItem("finalizedShoppingList", JSON.stringify(selectedItems));
    window.location.href = "aisle-map.html"; 
  });

  searchBar.addEventListener("input", () => {
    const searchText = searchBar.value.toLowerCase();
    suggestionsList.innerHTML = "";
    suggestionsList.style.display = "none";

    if (searchText) {
      const filteredItems = Object.keys(defaultPrices).filter(item =>
        item.toLowerCase().includes(searchText)
      );

      if (filteredItems.length > 0) {
        suggestionsList.style.display = "block";
        filteredItems.forEach(item => {
          const li = document.createElement("li");
          li.textContent = item;
          li.addEventListener("click", () => {
            searchBar.value = item;
            suggestionsList.innerHTML = "";
            suggestionsList.style.display = "none";
          });
          suggestionsList.appendChild(li);
        });
      }
    }
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const themeToggleButton = document.getElementById("theme-toggle");

  
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
    themeToggleButton.textContent =
      savedTheme === "dark" ? "Switch to Light Theme" : "Switch to Dark Theme";
  }

  
  themeToggleButton.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    themeToggleButton.textContent =
      newTheme === "dark" ? "Switch to Light Theme" : "Switch to Dark Theme";
  });
});


const searchInput = document.getElementById("search-input");
const suggestionsList = document.getElementById("suggestions");


const categories = {
  Fruits: [
    "Apple", "Banana", "Cherry", "Date", "Elderberry", "Fig", "Grapes", "Honeydew",
    "Indian Fig", "Jackfruit", "Kiwi", "Lemon", "Mango", "Nectarine", "Orange", 
    "Papaya", "Quince", "Raspberry", "Strawberry", "Tangerine", "Ugli Fruit", 
    "Watermelon", "Xigua", "Yellow Passionfruit", "Zucchini (as fruit)"
  ],
  Vegetables: [
    "Artichoke", "Broccoli", "Carrot", "Daikon", "Eggplant", "Fennel", "Garlic", 
    "Horseradish", "Iceberg Lettuce", "Jalapeno", "Kale", "Leek", "Mushroom", 
    "Napa Cabbage", "Onion", "Parsnip", "Quinoa Greens", "Radish", "Spinach", 
    "Turnip", "Upland Cress", "Vegetable Marrow", "Watercress", "Yam", "Zucchini"
  ],
  Snacks: [
    "Chips", "Cookies", "Popcorn", "Pretzels", "Candy", "Nachos", "Trail Mix", 
    "Peanuts", "Granola Bar", "Rice Cakes", "Chocolate Bar", "Fruit Snacks", 
    "Crackers", "Biscuits", "Cheese Sticks", "Potato Wedges", "Corn Nuts", 
    "Veggie Sticks", "Peanut Butter Cups", "Energy Bar", "Brownie Bites", 
    "Mini Muffins", "Donuts", "Gummy Bears", "Marshmallows"
  ],
  
};


searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  suggestionsList.innerHTML = ""; 

  if (query) {
    Object.keys(categories).forEach(category => {
      const matchingItems = categories[category].filter(item =>
        item.toLowerCase().includes(query)
      );

      if (matchingItems.length > 0) {
        
        matchingItems.forEach(item => {
          const itemLi = document.createElement("li");
          itemLi.textContent = item;
          itemLi.addEventListener("click", () => {
            searchInput.value = item; 
            suggestionsList.innerHTML = ""; 
            navigateToCategory(item); 
          });
          suggestionsList.appendChild(itemLi);
        });
      }
    });
  }
});


searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const query = searchInput.value.toLowerCase().trim();

    
    const matchedCategory = findCategoryByItem(query);

    if (matchedCategory) {
      
      window.location.href = `/category/${matchedCategory.toLowerCase()}`;
    } else {
      alert("No matching item or category found. Please refine your search.");
    }
  }
});


function findCategoryByItem(item) {
  item = item.toLowerCase(); 
  for (const category in categories) {
    if (categories[category].map(i => i.toLowerCase()).includes(item)) {
      return category;
    }
  }
  return null; 
}


function navigateToCategory(item) {
  const category = findCategoryByItem(item);
  if (category) {
    
    window.location.href = `/category/${category.toLowerCase()}`;
  }
}



function loadShoppingListNavbar() {
  const shoppingListDisplay = document.getElementById('shoppingListDisplay');
  const storedList = localStorage.getItem('shoppingList');

  if (storedList) {
      const shoppingList = JSON.parse(storedList);

      shoppingListDisplay.innerHTML = ''; 
      shoppingList.forEach(item => {
          const li = document.createElement('li');
          li.textContent = item;
          shoppingListDisplay.appendChild(li);

          
          if (item.toLowerCase() === 'mango') {
              suggestCategory('Fruits');
          }
      });
  } else {
      shoppingListDisplay.innerHTML = '<li>No items added yet.</li>';
  }
}


function suggestCategory(category) {
  const msg = new SpeechSynthesisUtterance(`We noticed you added Mango. You might want to check the ${category} category.`);
  window.speechSynthesis.speak(msg);
}


function goToCategory() {
  window.location.href = 'categories.html'; 
}


window.onload = loadShoppingListNavbar;
