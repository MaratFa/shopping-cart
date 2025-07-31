let label = document.getElementById("label");
let ShoppingCart = document.getElementById("shopping-cart");

let basket = JSON.parse(localStorage.getItem("data")) || [];

const calculation = () => {
  const cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();

let generateCartItems = () => {
  if (basket.length !== 0) {
    ShoppingCart.innerHTML = basket
      .map((x) => {
        const search = shopItemsData.find((y) => y.id === x.id);
        return `
        <div class="cart-item">
          <img width="100" src="${search.img}" alt="" />
          <div class="details">

            <div class="title-price-x">
              <h4 class="title-price">
                <p>${search.name}</p>
                <p class="cart-item-price">$ ${search.price}</p>
              </h4>
              <i class="bi bi-x-lg"></i>
            </div>

            <div class="buttons">
              <i class="bi bi-dash-lg" onclick="decrement('${x.id}')"></i>
              <div class="quantity" id=${x.id}>${x.item}</div>
              <i class="bi bi-plus-lg" onclick="increment('${x.id}')"></i>
            </div>

            <h3></h3>          
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
};

generateCartItems();

const increment = (id) => {
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
  // console.log(basket);
  update(selectedItem.id);

  localStorage.setItem("data", JSON.stringify(basket));
};

const decrement = (id) => {
  const selectedItem = document.getElementById(id);
  const search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) return;
  else if (search.item === 0);
  else {
    search.item -= 1;
  }
  update(selectedItem.id);
  basket = basket.filter((x) => x.item !== 0);
  // console.log(basket);

  localStorage.setItem("data", JSON.stringify(basket));
};


const update = (id) => {
  let search = basket.find((x) => x.id === id);
  // console.log(search.item);
  document.getElementById(id).innerHTML = search.item;
  calculation();
};