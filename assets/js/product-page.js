// Close Product Page and Back to Shop Page
closePageBtn.addEventListener('click', function () {
  window.location = './../../index.html';
});

// Change Images Tabs
imagesTabs.forEach((tab) => {
  tab.addEventListener('click', function (e) {
    imagesTabs.forEach((tab) => {
      tab.classList.remove('active');
      this.classList.add('active');
    });
    imagesContent.forEach((div) => {
      div.style.display = 'none';
    });
    document.querySelector(this.dataset.click).style.display = 'block';
  });
});

// Select Product Size
sizesLi.forEach((element) => {
  element.addEventListener('click', function () {
    sizesLi.forEach((el) => {
      el.classList.remove('active');
      this.classList.add('active');
    });
    sizeText.textContent = this.textContent;
  });
});