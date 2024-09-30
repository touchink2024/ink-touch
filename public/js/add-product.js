'use strict';

document.addEventListener('DOMContentLoaded', function () {
  const categorySelect = document.getElementById('category');
  const sizeSelect = document.getElementById('size');
  const newCategoryInput = document.getElementById('newCategoryInput');
  const newSizeInput = document.getElementById('newSizeInput');

  categorySelect.addEventListener('change', function () {
    const selectedCategory = this.value;

    if (selectedCategory === 'new-category') {
      newCategoryInput.style.display = 'block';
      sizeSelect.innerHTML = '';
      newSizeInput.style.display = 'block';
    } else {
      newCategoryInput.style.display = 'none';
      newSizeInput.style.display = 'none';

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

      sizeSelect.innerHTML =
        '<option value="" disabled selected>Select a size</option>';
      sizes.forEach(function (size) {
        const option = document.createElement('option');
        option.value = size.toLowerCase();
        option.textContent = size;
        sizeSelect.appendChild(option);
      });

      const newSizeOption = document.createElement('option');
      newSizeOption.value = 'new-size';
      newSizeOption.textContent = 'Add New Size';
      sizeSelect.appendChild(newSizeOption);
    }
  });

  sizeSelect.addEventListener('change', function () {
    if (this.value === 'new-size') {
      newSizeInput.style.display = 'block';
    } else {
      newSizeInput.style.display = 'none';
    }
  });
});
