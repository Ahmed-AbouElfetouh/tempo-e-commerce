// Open The Cart
function cartHandler() {
  theCart.classList.add('move-to');
  pageOverlay();
  hideScrollbar();
}

// Add Overlay To Page Body
function pageOverlay() {
  let overlayDiv = document.createElement('div');
  overlayDiv.className = 'page-overlay';
  document.body.append(overlayDiv);
}

// Disadle Scroll in Page Body
function hideScrollbar() {
  document.body.style.overflow = 'hidden';
}

// Close The Cart
function closeCartHandler() {
  theCart.classList.remove('move-to');
  document.querySelector('.page-overlay').remove();
  document.body.style.overflow = 'visible';
}

// Get Cart Product Informations
function productHandler(e) {
  let button = e.target;
  let mainDiv = button.parentElement.parentElement;
  let image = mainDiv.querySelector(
    '#images-container #content .one .image img',
  ).src;
  let imgTitle = mainDiv.querySelector(
    '#images-container #content .one .image img',
  ).alt;
  let title = mainDiv.querySelector('.info-container > h1').textContent;
  let size = mainDiv.querySelector('.info-container #text > span').textContent;
  let price = +mainDiv.querySelector('.info-container .price > span')
    .textContent;

  addProductsToCartArray(image, title, size, price, imgTitle);
  updateCart();
  cartHandler();
}

// Add Product Informations to Array
function addProductsToCartArray(image, title, size, price, imgTitle) {
  cart = [];
  const cartProducts = {
    productImage: image,
    productTitle: title,
    productSize: size,
    productPrice: price,
    productInCart: 0,
    productImageTitle: imgTitle,
  };
  cart.push(cartProducts);
  cartProductsNumber(cart);
}

// Update Number of Products in UI
function saveCartNumbersInUI() {
  let numberOfProductsInCart = localStorage.getItem('numberOfProductsInCart');
  if (numberOfProductsInCart) {
    cartNumber.textContent = numberOfProductsInCart;
    if (fixedNavCartNumber) {
      fixedNavCartNumber.textContent = numberOfProductsInCart;
    }
  }
}

// Set Number of Products in Local Storage
function cartProductsNumber(products, action) {
  let numberOfProductsInCart = localStorage.getItem('numberOfProductsInCart');
  numberOfProductsInCart = parseInt(numberOfProductsInCart);

  if (action) {
    localStorage.setItem('numberOfProductsInCart', numberOfProductsInCart - 1);
    cartNumber.textContent = numberOfProductsInCart - 1;
    if (fixedNavCartNumber) {
      fixedNavCartNumber.textContent = numberOfProductsInCart - 1;
    }
  } else if (numberOfProductsInCart) {
    localStorage.setItem('numberOfProductsInCart', numberOfProductsInCart + 1);
    cartNumber.textContent = numberOfProductsInCart + 1;
    if (fixedNavCartNumber) {
      fixedNavCartNumber.textContent = numberOfProductsInCart + 1;
    }
  } else {
    localStorage.setItem('numberOfProductsInCart', 1);
    cartNumber.textContent = 1;
    if (fixedNavCartNumber) {
      fixedNavCartNumber.textContent = 1;
    }
  }
  products.forEach((product) => {
    addProductsToLocalStorage(product);
    updateTotalPrice(product);
  });
}

// Add all Products To Local Storage
function addProductsToLocalStorage(product) {
  let cartProducts = JSON.parse(localStorage.getItem('productsInCart'));
  if (cartProducts != null) {
    if (cartProducts[product.productImageTitle] == undefined) {
      cartProducts = {
        ...cartProducts,
        [product.productImageTitle]: product,
      };
    }
    cartProducts[product.productImageTitle].productInCart += 1;
  } else {
    product.productInCart = 1;
    cartProducts = {
      [product.productImageTitle]: product,
    };
  }

  localStorage.setItem('productsInCart', JSON.stringify(cartProducts));
}

// Update Total Price
function updateTotalPrice(product, action) {
  let totalPrice = localStorage.getItem('totalPrice');
  if (action) {
    totalPrice = parseInt(totalPrice);
    localStorage.setItem('totalPrice', totalPrice - product.productPrice);
  } else if (totalPrice != null) {
    totalPrice = parseInt(totalPrice);
    localStorage.setItem('totalPrice', totalPrice + product.productPrice);
  } else {
    localStorage.setItem('totalPrice', product.productPrice);
  }
}

// Update Cart (Add Products at Cart in UI)
function updateCart() {
  let cartProducts = JSON.parse(localStorage.getItem('productsInCart'));
  let totalPrice = localStorage.getItem('totalPrice');
  if (cartProducts) {
    cartItemsEl.innerHTML = '';
    preText.classList.add('display-none');
    Object.values(cartProducts).map((product) => {
      cartItemsEl.innerHTML += `
      <div class="product">
        <div class="product-image">
          <img src="${product.productImage}" alt="${product.productImageTitle}">
        </div>
        <div class="product-infos">
          <h3 class="product-title">${product.productTitle}</h3>
          <span class="product-size">${product.productSize}</span>
          <div class="product-quantity-and-price">
            <div class="quantity">
              <span class="minus"><i class="fa-solid fa-minus"></i></span>
              <span class="number">${product.productInCart}</span>
              <span class="plus"><i class="fa-solid fa-plus"></i></span>
            </div>
            <div class="price">
              <span>LE ${product.productPrice}.00</span>
            </div>
          </div>
        </div>
      </div>
      `;
    });
    cartSubtotalInfo.innerHTML = '';
    cartSubtotalInfo.innerHTML += `
        <div class="subtotal">
          <p class="subtotal-title">Subtotal</p>
          <span class="total-price">LE ${totalPrice}.00</span>
        </div>
        <p class="shipping-text">Shipping, taxes, and discount codes calculated at checkout.</p>
        <button class="check-out">Check Out</button>
      `;
  }
  handelQuantity();
}

// Decrease and Increase Quantity
function handelQuantity() {
  let plusBtns = document.querySelectorAll('.plus');
  let minusBtns = document.querySelectorAll('.minus');
  let currentQuantity = 0;
  let currentProduct = '';
  let cartProducts = JSON.parse(localStorage.getItem('productsInCart'));
  for (let i = 0; i < minusBtns.length; i++) {
    minusBtns[i].addEventListener('click', () => {
      cart = [];
      currentQuantity =
        minusBtns[i].parentElement.querySelector('.number').textContent;
      currentProduct =
        minusBtns[
          i
        ].parentElement.parentElement.parentElement.previousElementSibling.querySelector(
          'img',
        ).alt;

      if (cartProducts[currentProduct].productInCart >= 1) {
        cartProducts[currentProduct].productInCart -= 1;
        cartProductsNumber(cart, 'minus');
        updateTotalPrice(cartProducts[currentProduct], 'minus');
        localStorage.setItem('productsInCart', JSON.stringify(cartProducts));
        updateCart();
      } else if (cartProducts[currentProduct].productInCart === 0) {
        delete cartProducts[currentProduct];
        localStorage.setItem('productsInCart', JSON.stringify(cartProducts));
        updateCart();
        if (parseInt(localStorage.getItem('numberOfProductsInCart')) === 0) {
          cartSubtotalInfo.innerHTML = '';
          preText.classList.remove('display-none');
          localStorage.removeItem('productsInCart');
        }
      }
    });

    plusBtns[i].addEventListener('click', () => {
      cart = [];
      currentQuantity =
        plusBtns[i].parentElement.querySelector('.number').textContent;
      currentProduct =
        plusBtns[
          i
        ].parentElement.parentElement.parentElement.previousElementSibling.querySelector(
          'img',
        ).alt;
      cartProducts[currentProduct].productInCart += 1;
      cartProductsNumber(cart);
      updateTotalPrice(cartProducts[currentProduct]);
      localStorage.setItem('productsInCart', JSON.stringify(cartProducts));
      updateCart();
    });
  }
}

saveCartNumbersInUI();
updateCart();
//

shopCartsBtns.forEach((btn) => {
  btn.addEventListener('click', cartHandler);
});

closeCartBtn.addEventListener('click', function () {
  closeCartHandler();
});

if (addToCartBtn) {
  addToCartBtn.addEventListener('click', productHandler);
}
