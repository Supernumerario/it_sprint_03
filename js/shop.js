// If you have time, you can move this variable "products" to a json or js file and load the data in this js. It will look more professional
var productsList = [];
async function fetchProducts() {
    const response = await fetch('./js/products.json');
    const productsJson = await response.json();
    return productsJson;
}
fetchProducts().then(productsJson => {
    productsList = productsJson;
});

// Array with products (objects) added directly with push(). Products in this array are repeated.
// var cartList = [];

// Improved version of cartList. Cart is an array of products (objects), but each one has a quantity field to define its quantity, so these products are not repeated.
var cart = [];

// var total = 0;

// Exercise 1
// function buy(id) {
//     // 1. Loop for to the array products to get the item to add to cart
//     for (item in productsList) {
//         if (productsList[item].id == id) {
//             // 2. Add found product to the cartList array
//             cartList.push(productsList[item]);
//         }
//     }
//     document.getElementById('count_product').textContent = cartList.length;
// }

// Exercise 2
function cleanCart() {
    cart.length = 0;
    document.getElementById('count_product').textContent = cart.length;
    // Reset the table
    document.getElementById('cart_list').innerHTML = '';
    // Reset the total price
    document.getElementById('total_price').innerHTML = '';
}

// Exercise 3
var totalPrice = 0;
function calculateTotal() {
    // Reset totalPrice
    totalPrice = 0;
    // Calculate total price of the cart using the "cartList" array
    for (item in cart) {
        if ('subtotalWithDiscount' in cart[item]) {
            totalPrice += cart[item].subtotalWithDiscount;
        } else {
            totalPrice += cart[item].subtotal;
        } 
    }
    document.getElementById('total_price').innerHTML = totalPrice;
}

// Exercise 4
// function generateCart() {
//     // Reset cart array
//     cart.length = 0;
//     // Using the "cartlist" array that contains all the items in the shopping cart, 
//     // generate the "cart" array that does not contain repeated items, instead each item of this array "cart" shows the quantity of product.
//     for (item in cartList) {
//         if (cart.includes(cartList[item])) {
//             var itemId = cartList[item].id;
//             var cartIndex = cart.findIndex(elem => elem['id'] === itemId);
//             ++cart[cartIndex].quantity;
//             cart[cartIndex].subtotal = cartList[item].price * cartList[item].quantity; 
//         } else {
//             cartList[item].quantity = 1;
//             cartList[item].subtotal = cartList[item].price;
//             cart.push(cartList[item]);
//         }
//     }
// }

// Exercise 5
function applyPromotionsCart() {
    for (item in cart) {
        if ('offer' in cart[item] && cart[item].offer.number < cart[item].quantity) {
            var discount = (cart[item].subtotal * cart[item].offer.percent) / 100;
            cart[item].subtotalWithDiscount = cart[item].subtotal - discount;
        }
    }
}

// Exercise 6
function printCart() {
    // Fill the shopping cart modal manipulating the shopping cart dom
    // Reset the table
    document.getElementById('cart_list').innerHTML = '';
    // Add cart products
    for (item in cart) {
        var cartTable = document.getElementById('cart_list').appendChild(document.createElement('tr'));
        cartTable.appendChild(document.createElement('th')).textContent = cart[item].name;
            // .setAttribute('scope', 'row');
        cartTable.appendChild(document.createElement('td')).textContent = "$" + cart[item].price;
        cartTable.appendChild(document.createElement('td')).textContent = cart[item].quantity;
        if ('subtotalWithDiscount' in cart[item]) {
            cartTable.appendChild(document.createElement('td')).textContent = "$" + cart[item].subtotalWithDiscount;
        } else {
            cartTable.appendChild(document.createElement('td')).textContent = "$" + cart[item].subtotal;
        }  
    }
}


// ** Nivell II **

// Exercise 7
function addToCart(id) {
    // Refactor previous code in order to simplify it
    // 1. Loop for to the array products to get the item to add to cart
    // 2. Add found product to the cart array or update its quantity in case it has been added previously.

    // Locate if the item is present in the cart and, if it is, save the position in it
    var itemInCart = false;
    var itemPosition;
    for (item in cart) {
        if (cart[item].id == id) {
            itemInCart = true;
            itemPosition = item;
        }
    }

    // Save or update the item in the cart
    if (itemInCart) {
        // Update the item quantity
        ++cart[itemPosition].quantity;
        cart[itemPosition].subtotal = cart[itemPosition].price * cart[itemPosition].quantity; 
    } else {
        var itemToPush = productsList[id-1];
        itemToPush.quantity = 1;
        itemToPush.subtotal = itemToPush.price;
        cart.push(itemToPush);
    }

    // Update the cart button counter
    var cartButtonCounter = document.getElementById('count_product');
    var amountOfItems = 0;
    for (item in cart) {
        amountOfItems = amountOfItems + cart[item].quantity;
    }
    cartButtonCounter.textContent = amountOfItems;
}

// Exercise 8
// As they are very similar, could this be merged in the previous addToCart function?
// Maybe passing an extra boolean parameter to switch add/remove?
function removeFromCart(id) {
}

function open_modal(){
    // Auto execute generateCart function, without the need to click the extra button
    // generateCart();
    // Apply promotions before opening the cart
    applyPromotionsCart();
    calculateTotal();
	printCart();
}