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
      'blacklit 10 ft',
      'mesh 10 ft',
      'relf flex 10 ft',
    ];
  } else if (selectedCategory === 'Sav') {
    sizes = [
      '4 ft',
      '5 ft',
      '4_5 ft',
      'relf sav 4_5 ft',
      'pvc',
      'clear sticker 4_5 ft',
      'paper 3 ft',
      'paper 4 ft',
      'paper 5 ft',
      'fabric 4 ft',
      'fabric 5 ft',
    ];
  }

  sizes.forEach(function (size) {
    const option = document.createElement('option');
    option.value = size.toLowerCase();
    option.textContent = size;
    sizeSelect.appendChild(option);
  });
});
