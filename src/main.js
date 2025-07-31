const shop = document.getElementById("shop");
let basket = JSON.parse(localStorage.getItem("data")) || [];

const generateShop = () => {
  shop.innerHTML = shopItemsData
    .map((item) => {
      const { id, name, price, desc, img } = item;
      const search = basket.find((x) => x.id === id);

      return `
        <div class="item" id="product-id-${id}">
          <img width="220" src="${img}" alt="" />
          <div class="details">
            <h3>${name}</h3>
            <p>${desc}</p>
            <div class="price-quantity">
              <h2>$ ${price}</h2>
              <div class="buttons">
                <i class="bi bi-dash-lg" onclick="decrement('${id}')"></i>
                <div class="quantity" id=${id}>${search ? search.item : 0}</div>
                <i class="bi bi-plus-lg" onclick="increment('${id}')"></i>
              </div>
            </div>
          </div>
        </div>
      `;
    })
    .join("");
};

generateShop();

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

const calculation = () => {
  const cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();
