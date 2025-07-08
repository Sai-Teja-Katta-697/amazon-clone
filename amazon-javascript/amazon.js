import * as cartObj from "../data/cart.js";
import { products } from "../data/products.js";
import { convertCentsToDollars } from "./utils/currencyConversion.js";
let productsHTML = "";
// Generate HTML for each product
products.forEach((product) => {
  productsHTML += `  
  <div class="product-container">
          <div class="product-image-container">
            <img
              class="product-image"
              src="${product.image}"
            />
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img
              class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png"
            />
            <div class="product-rating-count link-primary">87</div>
          </div>

          <div class="product-price">$${convertCentsToDollars(
            product.priceCents
          )}</div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png" />
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${
            product.id
          }">Add to Cart</button>
        </div>
  `;
});

function addedToCart(button) {
  const productContainer = button.closest(".product-container");
  const addedToCartDiv = productContainer.querySelector(".added-to-cart");
  if (addedToCartDiv.hideTimeoutId) {
    clearTimeout(addedToCartDiv.hideTimeoutId);
  }
  if (addedToCartDiv.showTimeoutId) {
    clearTimeout(addedToCartDiv.showTimeoutId);
  }
  addedToCartDiv.showTimeoutId = setTimeout(() => {
    addedToCartDiv.classList.add("show");
    addedToCartDiv.hideTimeoutId = setTimeout(() => {
      addedToCartDiv.classList.remove("show");
    }, 2000);
  }, 500);
}
function updateCartQuantity() {
  let cartQuantity = 0;
  cartObj.cart.forEach((item) => {
    cartQuantity += item.quantity;
  });
  return cartQuantity;
}
document.querySelector(".js-products-grid").innerHTML = productsHTML;
document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    addedToCart(button);
    cartObj.addToCart(button);
    let cartQuantity = updateCartQuantity();
    document.querySelector(".js-cart-quantity").textContent = cartQuantity;
  });
});
