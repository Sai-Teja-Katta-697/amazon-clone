import { products } from "../data/products.js";

export let cart = [
  {
    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2,
  },
  {
    id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1,
  },
  {
    id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
    quantity: 3,
  },
];

export function addToCart(button) {
  let cartObject;
  const productName = button.dataset.productId;
  console.log("Product Name:", productName);
  cart.forEach((item) => {
    if (productName === item.id) {
      cartObject = item;
      return;
    }
  });
  //getting dropdown value js-quantity-selector-${product.id}
  const quantity = document.querySelector(
    `.js-quantity-selector-${productName}`
  ).value;

  if (cartObject) {
    cartObject.quantity = cartObject.quantity + Number(quantity);
  } else {
    cart.push({
      id: productName,
      quantity: Number(quantity),
    });
  }
}
export function deleteCart(id) {
  cart = cart.filter((item) => item.id !== id);
}
