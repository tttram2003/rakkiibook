// Function to load the XML file
function loadXMLDoc(filename) {
    if (window.XMLHttpRequest) {
        xhttp = new XMLHttpRequest();
    } else {
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhttp.open("GET", filename, false);
    xhttp.send();
    return xhttp.responseXML;
}

// Load the product data from product.xml
var xmlDoc = loadXMLDoc("admin-front-end/stored/product.xml");


// Generate product cards
function generateProductCards(data, quantity, destination) {
  var productCardTemplate = document.getElementById("productCardTemplate");
  var productContainer = document.getElementById(destination);

  if (productContainer) {
    // Clear existing product cards
    productContainer.innerHTML = "";
  }

  // Get all the product data
  var products = data.getElementsByTagName("product");

  // Generate the appropriate number of product cards
  for (var i = 0; i < quantity; i++) {
    // Clone the product card template
    var productCard = productCardTemplate.content.cloneNode(true);

    // Get the product data for the current index
    var product = products[i % products.length];
    var productName = product.getElementsByTagName("productname")[0].textContent;
    var productPrice = product.getElementsByTagName("price")[0].textContent;
    var productCategory = product.getElementsByTagName("tag")[0].textContent;
    var productImage = "admin-front-end/stored/" + product.getElementsByTagName("productimg")[0].textContent;

    // Set product data
    productCard.querySelector(".item_name").textContent = productName;
    productCard.querySelector(".item_price").textContent = productPrice;
    productCard.querySelector(".product-o__price").innerHTML = productPrice;
    productCard.querySelector(".product-o__category a").textContent = productCategory;
    productCard.querySelector(".aspect__img").src = productImage;

    if (productContainer) {
      // Append the product card to the container
      productContainer.appendChild(productCard);
    } else {
      console.error("Product container not found.");
    }
  }
}

// Generate random product cards with chosen template
function generateProductCardsR(template, data, quantity, destination) {
  var productCardTemplate = document.getElementById(template);
  var productContainer = document.getElementById(destination);

  if (productContainer) {
    // Clear existing product cards
    productContainer.innerHTML = "";
  }

  // Get all the product data
  var products = data.getElementsByTagName("product");

  // Generate the appropriate number of product cards
  for (var i = 0; i < quantity; i++) {
    // Clone the product card template
    var productCard = productCardTemplate.content.cloneNode(true);
    var randomIndex = Math.floor(Math.random() * products.length);

    // Get the product data for the current index
    var product = products[randomIndex];
    var productName = product.getElementsByTagName("productname")[0].textContent;
    var productPrice = product.getElementsByTagName("price")[0].textContent;
    var productCategory = product.getElementsByTagName("tag")[0].textContent;
    var productImage = "admin-front-end/stored/" + product.getElementsByTagName("productimg")[0].textContent;

    // Set product data
    productCard.querySelector(".item_name").textContent = productName;
    productCard.querySelector(".item_price").textContent = productPrice;
    productCard.querySelector(".product-o__price").innerHTML = productPrice;
    productCard.querySelector(".product-o__category a").textContent = productCategory;
    productCard.querySelector(".aspect__img").src = productImage;

    if (productContainer) {
      // Append the product card to the container
      productContainer.appendChild(productCard);
    } else {
      console.error("Product container not found.");
    }
  }
}

// Format price string
document.addEventListener("DOMContentLoaded", function() {
  // Format price string
  var productPrices = document.getElementsByClassName("product-o__price");

  // Iterate over the elements and format the inner content
  for (var i = 0; i < productPrices.length; i++) {
    var priceElement = productPrices[i];
    var price = priceElement.innerHTML.trim();

    // Check if the content is a number
    if (!isNaN(price)) {
      // Format the price with a space as a thousand separator
      var formattedPrice = parseFloat(price).toLocaleString("en-US", {
        minimumFractionDigits: 0
      });

      // Update the inner content with the formatted price
      priceElement.innerHTML = formattedPrice + '<span> đ</span>';
    } else {
      console.log("Price formatting failed:", priceElement.innerHTML);
    }
  }
});


// Add to cart
function addToCart() {
  try {
    // Get the button element that triggered the function
    var button = event.target;
    // Traverse up the DOM tree to find the parent product item
    var productItem = button.closest('.simpleCart_shelfItem');
    var item = {};
    // Retrieve the item information from HTML elements within the product item
    item.name = productItem.querySelector('.item_name').innerHTML;
    item.quantity = parseInt(productItem.querySelector('.item_Quantity').value);
    if (isNaN(item.quantity) || item.quantity === null) {
        item.quantity = 1;
    }
    item.price = parseFloat(productItem.querySelector('.item_price').innerHTML);
    item.image = productItem.querySelector('img').getAttribute('src');

    // Add the item to the cart
    simpleCart.add(item);

    // Save the cart data
    simpleCart.save();
    console.log("Item added to cart:", item);

    // Update the modal with the product information
    var modalProductName = document.querySelector(".success__name");
    var modalQuantity = document.querySelector(".success__quantity");
    var modalPrice = document.querySelector(".success__price");
    var getmodalPrice = document.querySelector(".product-o__price").innerHTML;
    modalProductName.textContent = item.name;
    modalQuantity.textContent = "Số lượng: " + item.quantity;
    modalPrice.innerHTML = getmodalPrice;

  } catch (error) {
    console.error("An error occurred while adding the item to the cart:", error);
    }
}