'use strict';

document.addEventListener('DOMContentLoaded', function () {
  const addProductForm = document.getElementById('addProductForm');

  addProductForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    const addProductUrl = addProductForm.getAttribute('data-url');
    const submitButton = document.getElementById('sbtns');

    submitButton.innerHTML =
      '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Submitting...';
    submitButton.disabled = true;

    try {
      const formData = {
        category: document.getElementById('category').value,
        newCategory: document.getElementById('newCategoryInput').value,
        size: document.getElementById('size').value,
        newSize: document.getElementById('newSizeInput').value,
        totalQuantity: document.querySelector('input[name="totalQuantity"]')
          .value,
        narration: document.querySelector('input[name="narration"]').value,
      };

      const response = await fetch(addProductUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        alert(data.message);
        setTimeout(() => {
          window.location.href = data.redirectUrl;
        }, 100);
      } else {
        const generalErrorElement = document.getElementById('generalError');
        if (generalErrorElement) {
          generalErrorElement.textContent = data.message;
          generalErrorElement.style.display = 'block';
        }

        const errors = data.errors || [];
        errors.forEach((error) => {
          const errorElement = document.getElementById(`${error.key}Error`);
          if (errorElement) {
            errorElement.textContent = error.msg;
          }
        });
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while processing your request.');
    } finally {
      submitButton.innerHTML = 'Submit';
      submitButton.disabled = false;
    }
  });
});
