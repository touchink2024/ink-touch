'use strict';
document.addEventListener('DOMContentLoaded', function () {
  const addUserForm = document.getElementById('addUserForm');

  addUserForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    const addUserUrl = addUserForm.getAttribute('data-url');
    const submitButton = document.getElementById('subBtns');

    submitButton.innerHTML =
      '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Submitting...';
    submitButton.disabled = true;

    try {
      const formData = Object.fromEntries(new FormData(addUserForm));

      const response = await fetch(addUserUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        alert('User added successfully');
        setTimeout(() => {
          window.location.href = data.redirectUrl;
        }, 100);
      } else {
        if (data.message) {
          const generalErrorElement = document.getElementById('generalError');
          if (generalErrorElement) {
            generalErrorElement.textContent = data.message;
            generalErrorElement.style.display = 'block';
          }
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

  const inputFields = document.querySelectorAll('input, select');
  inputFields.forEach((inputField) => {
    inputField.addEventListener('input', () => {
      const errorElement = document.getElementById(`${inputField.name}Error`);
      if (errorElement) {
        errorElement.innerText = '';
      }

      const generalErrorElement = document.getElementById('generalError');
      if (generalErrorElement) {
        generalErrorElement.style.display = 'none';
        generalErrorElement.innerText = '';
      }
    });
  });
});
