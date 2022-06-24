const productsEl = document.querySelector(".products");
const cartItemsEl = document.querySelector(".cart-items");
const subtotalEl = document.querySelector(".subtotal");
const totalItemsInCartEl = document.querySelector(".total-items-in-cart");

//PRODUCTS LIST
function renderProducts() {
    products.forEach((product) => {
        productsEl.innerHTML += `
            <div class="item">
                <div class="item-container">
                    <div class="item-img">
                        <img src="${product.imgSrc}" alt="${product.name}">
                    </div>
                    
                    <div class="desc">
                        <h2 class="product_name">${product.name}</h2>
                    
                        <h2><small>$</small>${product.price}</h2>
                    </div>
                   
                    <div class="add-to-cart" style="margin-top: 1em;" onclick="addToCart(${product.id})">
                    <button class="btn" type="button">ADD TO CART</button>
                    </div>
                </div>
            </div>
        `;
    });
}
renderProducts();

// cart array
let cart = JSON.parse(localStorage.getItem("CART")) || [];
updateCart();

// ADD ITEM
function addToCart(id) {
    if (cart.some((item) => item.id === id)) {
        changeNumberOfUnits("plus", id);
    } else {
        const item = products.find((product) => product.id === id);

        cart.push({
            ...item,
            numberOfUnits: 1,
        });
    }
    // console.log(cart)
    updateCart();
}

// update cart
function updateCart() {
    renderCartItems();
    renderSubtotal();

    // save cart to local storage
    localStorage.setItem("CART", JSON.stringify(cart));
}

// calculate and render subtotal
function renderSubtotal() {
    let totalPrice = 0,
        totalItems = 0;

    cart.forEach((item) => {
        totalPrice += item.price * item.numberOfUnits;
        totalItems += item.numberOfUnits;
    });

    // subtotalEl.innerHTML = `Product Cart (${totalItems})`;
    subtotalEl.innerHTML = `$${totalPrice.toFixed(2)}`;
    totalItemsInCartEl.innerHTML = totalItems;
}
// : $${totalPrice.toFixed(2)}
// render cart items
function renderCartItems() {
    cartItemsEl.innerHTML = ""; // clear cart element
    cart.forEach((item) => {
        cartItemsEl.innerHTML += `
        <div class="cart-item" >
            <div class="item-info" "${item.id}">
                <img src="${item.imgSrc}" alt="${item.name}">
               
            </div>
            <div class="unit-price">
            <h4>${item.name}</h4>
            </div>
           
            <div class="units">
                <div class="btn minus" onclick="changeNumberOfUnits('minus', ${item.id})">-</div>
                <div class="number">${item.numberOfUnits}</div>
                <div class="btn plus" onclick="changeNumberOfUnits('plus', ${item.id})">+</div>           
            </div>

            <div class="unit-price">
            <small>$</small>${item.price}
        </div>
        <div class="unit-price"  onclick="removeItemFromCart(${item.id})">
        <button class="danger" type="button">REMOVE</button>
    </div>
        </div>
      `;
    });
}

// remove item from cart
function removeItemFromCart(id) {
    cart = cart.filter((item) => item.id !== id);

    updateCart();
}

// change number of units for an item
function changeNumberOfUnits(action, id) {
    cart = cart.map((item) => {
        let numberOfUnits = item.numberOfUnits;

        if (item.id === id) {
            if (action === "minus" && numberOfUnits > 1) {
                numberOfUnits--;
            } else if (action === "plus") {
                numberOfUnits++;
            }
        }

        return {
            ...item,
            numberOfUnits,
        };
    });

    updateCart();
}















/* <p>
${product.description}
</p> */


/* <div class="add-to-wishlist">
<img src="./icons/heart.png" alt="add to wish list">
</div> */