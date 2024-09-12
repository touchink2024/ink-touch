'use strict';
document.addEventListener('DOMContentLoaded', function () {
  const categoryField = document.getElementById('category');
  const sizeField = document.getElementById('size');
  const remainingQuantityField = document.getElementById('remainingQuantity');

  categoryField.addEventListener('change', updateRemainingQuantity);
  sizeField.addEventListener('change', updateRemainingQuantity);

  function updateRemainingQuantity() {
    const category = categoryField.value;
    const size = sizeField.value;

    if (category && size) {
      fetch(`/user/product-quantity?category=${category}&size=${size}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.remainingQuantity !== undefined) {
            remainingQuantityField.value = data.remainingQuantity;
          } else {
            remainingQuantityField.value = 'Not available';
          }
        })
        .catch((error) => {
          console.error('Error fetching remaining quantity:', error);
          remainingQuantityField.value = 'Error';
        });
    }
  }
});
