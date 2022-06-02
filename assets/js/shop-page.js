// Render Products at Shop Cart
function renderProdcuts() {
  products.forEach((product) => {
    if (product.oldPrice === undefined) {
      productsEl.innerHTML += `
      <div class="shop-item">
        <a href="${product.href}">
          <div class="image">
            <img src="${product.img}" alt="${product.alt}">
          </div>
          <div class="content">
            <h2>${product.name}</h2>
            <span class="price">LE ${product.price}</span>
          </div>
        </a>
      </div>
      `
    } else {
      productsEl.innerHTML += `
        <div class="shop-item">
            <a href="${product.href}">
              <div class="image">
                <img src="${product.img}" alt="${product.alt}">
              </div>
              <div class="content">
                <h2>${product.name}</h2>
                <span class="old-price">LE ${product.oldPrice}</span>
                <span class="price special-color">LE ${product.price}</span>
              </div>
              <div class="discount">
                <span class="special-color">${product.discount}</span>
              </div>
            </a>
        </div>
      `
    }
  });
}
renderProdcuts();

// Show and Hide Fixed Navbar
window.onscroll = function () {
  if (window.scrollY >= 200) {
    if (fixedNavbar.classList.contains('move-to-bottom')) {
    } else {
      fixedNavbar.classList.add('move-to-bottom');
    }
  } else {
    fixedNavbar.classList.remove('move-to-bottom');
  }
  if (mainLinks.classList.contains('move-to-top')) {
    if (!fixedNavbar.classList.contains('move-to-bottom')) {
      fixedNavbar.classList.add('move-to-bottom');
    }
  }
};

// Fixed Navbar Functions
function subNavbarHandler() {
  navBarsHandler();
  navXmarkHandler();
  mainLinksHandler();
  fixedNavbarHandler();
  this.classList.toggle('special-style-two');
  subCartHandler();
  hideCartHindler();
}

function navBarsHandler() {
  navBars.classList.toggle('display-none');
}
function navXmarkHandler() {
  navXmark.classList.toggle('display-block');
}
function mainLinksHandler() {
  mainLinks.classList.toggle('move-to-top');
  mainLinks.classList.toggle('special-style-one');
}
function fixedNavbarHandler() {
  fixedNavbar.classList.toggle('visible');
}
function subCartHandler() {
  subCart.classList.toggle('sub-cart');
}
function hideCartHindler() {
  hideCart.classList.toggle('display-none');
}

// Fade Out Right
function scrollToLeftHandler() {
  shopSlider.classList.add('scroll-to-left');
  shopSlider.classList.remove('scroll-to-left-again');
  mainLinks.classList.add('scroll-to-right');
  mainLinks.classList.remove('scroll-to-right-again');
  shopSlider.classList.toggle('special-style-one');
}

// Fade in Right
function scrollToRightHandler() {
  shopSlider.classList.add('scroll-to-left-again');
  shopSlider.classList.remove('scroll-to-left');
  mainLinks.classList.add('scroll-to-right-again');
  mainLinks.classList.remove('scroll-to-right');
  shopSlider.classList.toggle('special-style-one');
}

navText.addEventListener('click', subNavbarHandler);
scrollLeftBtn.addEventListener('click', scrollToLeftHandler);
scrollRightBtn.addEventListener('click', scrollToRightHandler);
