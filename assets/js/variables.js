// Cart Page Variables
const shopCartsBtns = document.querySelectorAll('.the-cart');
const theCart = document.querySelector('.cart');
const closeCartBtn = document.getElementById('close-cart');
const addBtn = document.querySelector('.add-to-cart');

// Shop Page Variables
const navText = document.getElementById('nav-text');
const navBars = document.getElementById('bars');
const navXmark = document.getElementById('x-mark');
const mainLinks = document.getElementById('main-links');
const fixedNavbar = document.getElementById('fixed-nav');
const scrollLeftBtn = document.getElementById('scroll-right');
const scrollRightBtn = document.getElementById('scroll-left');
const shopSlider = document.getElementById('shop-slider');
const subCart = document.getElementById('sub-cart');
const hideCart = document.getElementById('hide-cart');
const productsEl = document.getElementById('all-content');

// Product Page Variables
const closePageBtn = document.getElementById('close-btn-div');
const imagesTabs = document.querySelectorAll('#images-container ul li');
const imagesContent = document.querySelectorAll('#content > div');
const sizesLi = document.querySelectorAll('#sizes li');
const sizeText = document.querySelector('#text span');
const addToCartBtn = document.querySelector('.add-to-cart');
const cartSubtotalInfo = document.querySelector('.cart-subtotal-info');
const preText = document.querySelector('.pre-text');
const cartItemsEl = document.querySelector('.cart-products');

// Some Common Variables
let cart;
let cartNumber = document.querySelector('.number');
let fixedNavCartNumber = document.getElementById('number');