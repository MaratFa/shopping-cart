const label = document.getElementById("label");
const ShoppingCart = document.getElementById("shopping-cart");
const cartIcon = document.getElementById("cartAmount");

let basket = JSON.parse(localStorage.getItem("data")) || [];

function calculation() {
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
}

calculation();

function generateCartItems() {
  if (basket.length !== 0) {
    ShoppingCart.innerHTML = basket
      .map((x) => {
        const search = shopItemsData.find((y) => y.id === x.id);
        const { img, name, price } = search;
        return `
        <div class="cart-item">
          <img width="100" src="${img}" alt="" />
          <div class="details">

            <div class="title-price-x">
              <h4 class="title-price">
                <p>${name}</p>
                <p class="cart-item-price">$ ${price}</p>
              </h4>
              <i class="bi bi-x-lg" onclick="removeItem('${x.id}')"></i>
            </div>

            <div class="buttons">
              <i class="bi bi-dash-lg" onclick="decrement('${x.id}')"></i>
              <div class="quantity" id=${x.id}>${x.item}</div>
              <i class="bi bi-plus-lg" onclick="increment('${x.id}')"></i>
            </div>

            <h3>$ ${search.price * x.item}</h3>          
          </div>
        </div>`;
      })
      .join("");
  } else {
    ShoppingCart.innerHTML = ``;
    label.innerHTML = `
    <h2>Cart is Empty</h2>
    <a href="index.html">
      <button class="HomeBtn">Back to home</button>
    </a>
    `;
  }
}

generateCartItems();

function increment(id) {
  const selectedItem = document.getElementById(id);
  const search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) {
    basket.push({
      id: id,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  generateCartItems();
  update(selectedItem.id);

  localStorage.setItem("data", JSON.stringify(basket));
}

function decrement(id) {
  const selectedItem = document.getElementById(id);
  const search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) return;
  else if (search.item === 0);
  else {
    search.item -= 1;
  }
  update(selectedItem.id);
  basket = basket.filter((x) => x.item !== 0);
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
}

function update(id) {
  let search = basket.find((x) => x.id === id);
  // console.log(search.item);
  document.getElementById(id).innerHTML = search.item;
  calculation();
  TotalAmount();
}

function removeItem(id) {
  basket = basket.filter((x) => x.id !== id);
  generateCartItems();
  calculation();
  TotalAmount();
  localStorage.setItem("data", JSON.stringify(basket));
}

function TotalAmount() {
  if (basket.length !== 0) {
    const amount = basket
      .map((x) => {
        const { item, id } = x;
        const search = shopItemsData.find((y) => y.id === id) || [];
        return item * search.price;
      })
      .reduce((total, curVal) => total + curVal, 0);
    // console.log(amount);
    label.innerHTML = `
      <h2>Total Bill : $ ${amount}</h2>
      <button class="checkout">Checkout</button>
      <button class="removeAll" onclick="clearCart()">Clear Cart</button>
    `;
  } else return;
}

function clearCart() {
  basket = [];
  generateCartItems();
  calculation();
  localStorage.setItem("data", JSON.stringify(basket));
}

TotalAmount();
