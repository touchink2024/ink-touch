'use strict';
document.addEventListener('DOMContentLoaded', function () {
  const categorySelect = document.getElementById('category');
  const sizeSelect = document.getElementById('size');
  const remainingQuantityInput = document.getElementById('remainingQuantity');
  let currentProducts = [];

  function capitalizeWords(str) {
    return str
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  async function fetchCategories() {
    try {
      const response = await fetch('/user/categories');
      if (!response.ok) throw new Error('Failed to fetch categories');
      const categories = await response.json();
      return [...new Set(categories.map((cat) => cat.toLowerCase()))];
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  }

  async function fetchProducts(category) {
    try {
      const response = await fetch(`/user/products?category=${category}`);
      if (!response.ok) throw new Error('Failed to fetch products');
      const products = await response.json();
      return products;
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  }

  async function initializeCategories() {
    const categories = await fetchCategories();
    categorySelect.innerHTML =
      '<option value="" disabled selected>Select a category</option>';
    categories.forEach((category) => {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = capitalizeWords(category);
      categorySelect.appendChild(option);
    });
  }

  function updateSizeOptions(products) {
    sizeSelect.innerHTML =
      '<option value="" disabled selected>Select a size</option>';
    const sizes = [...new Set(products.map((product) => product.size))];
    sizes.forEach((size) => {
      if (size) {
        const option = document.createElement('option');
        option.value = size;
        option.textContent = size;
        sizeSelect.appendChild(option);
      }
    });
    sizeSelect.disabled = sizes.length === 0;
  }

  function updateRemainingQuantity(selectedSize) {
    const product = currentProducts.find((p) => p.size === selectedSize);
    remainingQuantityInput.value = product ? product.totalQuantity : 0;
  }

  categorySelect.addEventListener('change', async function () {
    const selectedCategory = this.value;
    if (!selectedCategory) return;

    sizeSelect.innerHTML =
      '<option value="" disabled selected>Select a size</option>';
    remainingQuantityInput.value = 0;

    currentProducts = await fetchProducts(selectedCategory);
    updateSizeOptions(currentProducts);
  });

  sizeSelect.addEventListener('change', function () {
    updateRemainingQuantity(this.value);
  });

  initializeCategories();
});
