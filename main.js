import relatedProductsData from './data/relatedProducts.json' assert {type: 'json'};
import bestSellerProductsData from './data/bestSeller.json' assert {type: 'json'};

//Sliders-------------------------------------------
const swiper1 = new Swiper(".mySwiper1", {
  loop: true,
  slidesPerView: 4,
  spaceBetween: 20,
  centeredSlides: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    0: {
        slidesPerView: 1,
    },
    768: {
        slidesPerView: 3,
    },
    991: {
        slidesPerView: 4,
    },
  },
});

const swiper2 = new Swiper(".mySwiper2", {
  // loop: true,
  slidesPerView: 5,
  // centeredSlides: true,
  navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    0: {
        slidesPerView: 1,
    },
    768: {
        slidesPerView: 3,
    },
    991: {
        slidesPerView: 5,
    },
  },
});

const placeholderImg = './images/placeholder.png';
const relatedProductsContainer = document.querySelector('.related-card-container');
const bestSellerProductsContainer = document.getElementById('bestseller-card-slider');
let firstRender = 10;

window.addEventListener('DOMContentLoaded', function() {
  displayRelatedProducts(relatedProductsData);
  displayBestSellerProducts(bestSellerProductsData);
})

window.addEventListener('click', (e) => {
  if(e.target.classList.contains('more-related')) {
    firstRender = relatedProductsData.length;
    displayRelatedProducts(relatedProductsData);
  }
})

function displayRelatedProducts(relatedCards) {
  let firstTen = relatedCards.map((product, index) => {
    if (index < firstRender) {
      return `
        <div class="product-card">
          <div class="img-holder d-flex">
            <img src=${product.img ? product.img : placeholderImg} alt=${product.title}"class="product-img">
          </div>  
          <div class="info-rating d-flex">
              <i class="fa-solid fa-star"></i>
              <p class="rating">${product.rating}</p>
              <p class="faded">(${product.comment} Yorum)</p>
          </div>
          <div class="info-name d-flex">
              <p class="faded">${product.code}</p>
              <p>${product.title}</p>
          </div>
          <p class="product-price">₺${product.discount == 0 ? product.price : product.dprice}</p>
          <div class="btn-container d-flex">
              <button class="samedayshipping">BUGÜN KARGODA</button>
          </div>
          <div class="hovered-view d-flex">
              <i class="fa-solid fa-right-left"></i>
              <button class="add-cart-btn">SEPETE EKLE</button>
          </div>
        </div>
      `
    };
  });

  firstTen = firstTen.join('');
  relatedProductsContainer.innerHTML = firstTen;
}

function displayBestSellerProducts(bestSellerCards) {
  let bestSellers = bestSellerCards.map((product) => {
      return `
        <div class="swiper-slide best">
          <div class="bestseller-card">
            <div class="img-holder d-flex">
              <img src=${product.img} alt=${product.title} class="product-img">
            </div>
            <div class="info-rating d-flex">
              <i class="fa-solid fa-star"></i>
              <p class="rating">${product.rating}</p>
              <p class="faded">(${product.comment} Yorum)</p>
            </div>
            <div class="info-name d-flex">
                <p class="faded">${product.code}</p>
                <p>${product.title}</p>
            </div>
            <p class="product-price">₺${product.discount == 0 ? product.price : product.dprice}</p>
            <div class="btn-container d-flex">
                <button class="samedayshipping">BUGÜN KARGODA</button>
            </div>
            <div class="hovered-view d-flex">
                <i class="fa-solid fa-right-left"></i>
                <button class="add-cart-btn">SEPETE EKLE</button>
            </div>  
          </div>
        </div>
      `
  });

  bestSellers = bestSellers.join('');
  bestSellerProductsContainer.innerHTML = bestSellers;
}

//Adding to the Cart-------------------------------------------
const cartNotif = document.querySelector('.cart-notif');
let value = localStorage.getItem("cartCounter");
cartNotif.textContent = localStorage.cartCounter;

window.addEventListener('click', (e) => {
  addToCart(e);
});

function addToCart(e) {
  if(e.target.classList.contains('add-cart-btn')) {
    if(value === null) {
      value = 0;
    }
    value++;
    localStorage.setItem("cartCounter", value);
    cartNotif.textContent = localStorage.cartCounter;
    
  }
}
