// load data using fetch +
const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  products.forEach(product => {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h3>${product.title}</h3>
      <p>Category: ${product.category}</p>
      <h5>Ratting: ${product.rating.rate}</h5>
      <h5>Ratting Count: ${product.rating.count}</h5>
      <h2>Price: $ ${product.price}</h2>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
      <button id="btn-${product.id}" class="details-btn btn btn-primary">Details</button>
      `;
    document.getElementById("all-products").appendChild(div); 

    //fetch for single product
      document.getElementById(`btn-${product.id}`).addEventListener('click', function(){
        const url = `https://fakestoreapi.com/products/${product.id}`;
        fetch(url)
        .then((res) => res.json())
        .then((data) => loadData(data));
      })
    
    
  });  
};

// single product content
const loadData = (singleID) => {
  document.getElementById('details').textContent = '';
  const creatDiv = document.createElement('div');
  creatDiv.classList.add('show-detail');
  creatDiv.innerHTML = `
      <div class="parces text-center">
        <img class="product-image" src=${singleID.image}></img>
        <p>Category: ${singleID.category}</p>
        <p>Description: ${singleID.description}</p>
        <p>price: ${singleID.price}</p>
      </div>
  `;
  document.getElementById('details').appendChild(creatDiv);
}





// cart update function 
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();

  document.getElementById("total-Products").innerText = count;

  updateTotal();
};

// get value
const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value.toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = parseFloat(grandTotal.toFixed(2));
};

