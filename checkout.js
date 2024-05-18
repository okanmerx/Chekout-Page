const cart = [];

document.querySelector("form").addEventListener("submit", addProduct);
document.addEventListener('click', clickHandler)

function clickHandler(e){
     if(e.target.nodeName==='BUTTON'){
        if(e.target.className.includes('btn-danger'))
            deleteProduct(e.target)
        if(e.target.className.includes('increase'))
            increaseQty(e.target)
        if(e.target.className.includes('decrease'))
            decreaseQty(e.target)
    }
}

function addProduct(e) {
  e.preventDefault();
  const nameElement = document.getElementById("add-name");
  const priceElement = document.getElementById("add-price");
  const qtyElement = document.getElementById("add-quantity");
  const imgElement = document.getElementById("add-image");

  const salePrice= (Number(priceElement.value) * 0.7).toFixed(2);
  const product = {
    id: Date.now(),
    name: nameElement.value,
    originalPrice: priceElement.value,
    salePrice: salePrice,
    Image: imgElement.value,
    qty: qtyElement.value,
    totalPrice: Number(qtyElement.value)*Number(salePrice)
  };

  cart.unshift(product);

  nameElement.value = "";
  priceElement.value = "";
  qtyElement.value = "";
  imgElement.value="";

  displayCart();
  calculateTotal();
}

function displayCart() {
  const productPanel = document.getElementById("product-panel");
  productPanel.innerHTML = "";
  const html = cart
    .map(
      (product) =>
        `<div class="card d-flex flex-row m-3 shadow bg-light" id=${product.id} >
    <img class="img-fluid" style="object-fit: contain; width: 40%" src="${product.Image}"/>
                  <div clas="product details w-100 m-2">
                    <h6>${product.name}</h6>
                    <h3 class="text-warning">
                      $ ${product.salePrice}
                      <small class="text-decoration-line-through text-dark fs-6">$${product.originalPrice} </small
                      >
                    </h3>
                    <div
                      class="bg-white w-100 border border-2 border-dark p-2 d-flex justify-content-center align-items-center"
                    >
                      <button class="btn btn-secondary btn-sm decrease" >-</button>
                      <input
                        type="text"
                        class="form-control border-0"
                        style="width: 50px; background-color: white"
                        readonly
                        value="${product.qty}">
                      <button class="btn btn-secondary btn-sm increase" >+</button>
                    </div>
                      <div class="d-grid my-2">
                        <button class="btn btn-danger btn-sm"> Remove </button>
                    </button>
                  </div>
                  <small class="fs-6">Product Total: <span id="product-total" class="fw-bold" >$ ${product.totalPrice} </span>
                  </small>
                </div>
    </div>`
    )
    .join("");


  productPanel.innerHTML = html;
}

function increaseQty(el){
console.log('Increase')
}

function decreaseQty(el){
    console.log('Decrease')
}

function deleteProduct(el){
  const productId = el.parentElement.parentElement.parentElement.id
  const productIndex = cart.findIndex(prod=> prod.id == productId)  
  cart.splice(productIndex, 1)
  // cart = cart.filter(prod=> prod.id !=productId)
  displayCart()
  
  calculateTotal()
}

function calculateTotal () {
    const shippingElement = document.querySelector('.shipping')
    const subtotalElement = document.querySelector('.subtotal')
    const taxElement = document.querySelector('.tax');
    const totalElement = document.querySelector('.total');

    
    const taxes = 8;
    const subtotal = cart.reduce((acc, item)=> acc+item.totalPrice, 0)
    const shippingPrice = subtotal? 15: 0;
    const total = subtotal? Number(subtotal)*(1+(taxes/100))+ shippingPrice : 0;
    const taxAmount = Number(subtotal)*(taxes/100)

    shippingElement.textContent = shippingPrice.toFixed(2)
    subtotalElement.textContent = subtotal.toFixed(2)
    taxElement.textContent = taxAmount.toFixed(2)
    totalElement.textContent = total.toFixed(2)
}