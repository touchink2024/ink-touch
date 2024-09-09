'use strict';
document.getElementById('category').addEventListener('change', function () {
  const sizeSelect = document.getElementById('size');
  const selectedCategory = this.value;

  // Clear the existing options
  sizeSelect.innerHTML =
    '<option value="" disabled selected>Select a size</option>';

  let sizes = [];

  if (selectedCategory === 'Flex') {
    sizes = [
      '3 ft',
      '4 ft',
      '5 ft',
      '6 ft',
      '7 ft',
      '8 ft',
      '10 ft',
      'Blacklit 10 ft',
      'Mesh 10 ft',
      'Relf flex 10 ft',
    ];
  } else if (selectedCategory === 'Sav') {
    sizes = [
      '4 ft',
      '5 ft',
      '4/5 ft',
      'Relf sav 4/5 ft',
      'pvc',
      'Clear sticker 4&5 ft',
      'Paper 3 ft',
      'Paper 4 ft',
      'Paper 5 ft',
      'Fabric 4 ft',
      'Fabric 5 ft',
    ];
  }

  sizes.forEach(function (size) {
    const option = document.createElement('option');
    option.value = size.toLowerCase();
    option.textContent = size;
    sizeSelect.appendChild(option);
  });
});

// Handle size change
document.getElementById('size').addEventListener('change', function () {
  const selectedCategory = document.getElementById('category').value;
  const selectedSize = this.value;
  const selectedMaterial = document.querySelector(
    'input[name="material"]'
  ).value;

  if (selectedCategory && selectedSize && selectedMaterial) {
    fetch(
      `/product-details?category=${selectedCategory}&size=${selectedSize}&material=${selectedMaterial}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.totalQuantity !== undefined) {
          document.getElementById(
            'quantityDisplay'
          ).textContent = `Remaining Quantity: ${data.totalQuantity}`;
        } else {
          document.getElementById('quantityDisplay').textContent =
            'Product not found';
        }
      })
      .catch((error) => {
        console.error('Error fetching product details:', error);
        document.getElementById('quantityDisplay').textContent =
          'Error fetching product details';
      });
  }
});
