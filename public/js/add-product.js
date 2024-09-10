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
      '4_5 ft',
      'Relf sav 4_5 ft',
      'pvc',
      'Clear sticker 4_5 ft',
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
