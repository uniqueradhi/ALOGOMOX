let shoppingList = [];


function addItem() {
    const itemInput = document.getElementById('itemInput');
    const itemName = itemInput.value.trim();

    if (itemName) {
        shoppingList.push(itemName);
        updateListDisplay();

        itemInput.value = ''; 

        
        document.getElementById('finalizeButton').disabled = false;

        
        provideSuggestions(itemName);
    }
}


function updateListDisplay() {
    const shoppingListElement = document.getElementById('shoppingList');
    shoppingListElement.innerHTML = '';

    shoppingList.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        shoppingListElement.appendChild(li);
    });
}


function finalizeList() {
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
    alert("Your shopping list is finalized!");
}


function provideSuggestions(itemName) {
    const fruitKeywords = ['mango', 'apple', 'banana', 'grape', 'orange'];
    const vegetableKeywords = ['carrot', 'tomato', 'potato', 'spinach', 'onion'];
    const dairyKeywords = ['milk', 'cheese', 'butter', 'yogurt'];

    let category = '';

    if (fruitKeywords.includes(itemName.toLowerCase())) {
        category = 'fruit';
    } else if (vegetableKeywords.includes(itemName.toLowerCase())) {
        category = 'vegetable';
    } else if (dairyKeywords.includes(itemName.toLowerCase())) {
        category = 'dairy';
    }

    const suggestionText = document.getElementById('suggestionText');
    const suggestionBox = document.getElementById('suggestionBox');

    if (category) {
        suggestionText.textContent = `You added "${itemName}". Consider exploring the ${category} category.`;
        suggestionBox.hidden = false;

        
        const speech = new SpeechSynthesisUtterance(`You added ${itemName}. Consider exploring the ${category} category.`);
        window.speechSynthesis.speak(speech);
    } else {
        suggestionBox.hidden = true;
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

            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = item.purchased || false; 
            checkbox.addEventListener('change', () => togglePurchase(item.name, checkbox.checked));

            
            li.appendChild(checkbox);
            li.appendChild(document.createTextNode(item.name));

            
            if (item.purchased) {
                li.classList.add('completed');
            }

            shoppingListDisplay.appendChild(li);
        });
    } else {
        shoppingListDisplay.innerHTML = '<li>No items added yet.</li>';
    }
}


function togglePurchase(itemName, isPurchased) {
    const storedList = localStorage.getItem('shoppingList');
    if (storedList) {
        const shoppingList = JSON.parse(storedList);

        
        const item = shoppingList.find(item => item.name === itemName);
        if (item) {
            item.purchased = isPurchased;
            localStorage.setItem('shoppingList', JSON.stringify(shoppingList)); 
            loadShoppingListNavbar(); 
        }
    }
}


function goToCategory() {
    window.location.href = 'categories.html'; 
}


window.onload = loadShoppingListNavbar;
