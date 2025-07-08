import { cart, deleteCart } from "../data/cart.js";
import { products } from "../data/products.js";
import { convertCentsToDollars } from "./utils/currencyConversion.js";
let cartHTML = "";
let quantity = 0;
let price = 0;

cart.forEach((item) => {
  let product = products.find((p) => p.id === item.id);
  cartHTML += `
  <div class="cart-item-container js-cart-item-${item.id}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${product.image}"/>

              <div class="cart-item-details">
                <div class="product-name">
                  ${product.name}
                </div>
                <div class="product-price">
                  $${convertCentsToDollars(product.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${
                      item.quantity
                    }</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-cart-delete" data-product-id="${
                    item.id
                  }">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${item.id}"/>
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${item.id}"/>
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${item.id}"/>
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> `;

  quantity += item.quantity;
  price += Number(product.priceCents) * Number(item.quantity);
});
document.querySelectorAll(".js-carted-products").forEach((el) => {
  el.innerHTML = cartHTML;
});

const itemPriceHTml = `<div>Items (${quantity}):</div>
            <div class="payment-summary-money">$${(price / 100).toFixed(
              2
            )}</div>`;
document.querySelector(".js-item-price").innerHTML = itemPriceHTml;

document.querySelectorAll(".js-cart-delete").forEach((button) => {
  button.addEventListener("click", (e) => {
    const productId = e.target.dataset.productId;
    const cartContainer = document.querySelector(`.js-cart-item-${productId}`);
    cartContainer.remove();
    deleteCart(productId);
  });
});
