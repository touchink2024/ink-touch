'use strict';
document.addEventListener('DOMContentLoaded', function () {
  const updateProfileForm = document.getElementById('updateProfileForm');

  updateProfileForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    const updateUrl = updateProfileForm.getAttribute('data-url');
    const submitButton = document.getElementById('subProfile');
    const generalErrorElement = document.getElementById('generalError');

    submitButton.innerHTML =
      '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Updating...';
    submitButton.disabled = true;

    try {
      const formData = Object.fromEntries(new FormData(updateProfileForm));
      const response = await fetch(updateUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        alert('Profile updated successfully');
        setTimeout(() => {
          window.location.href = data.redirectUrl;
        }, 100);
      } else {
        if (data.message) {
          generalErrorElement.style.display = 'block';
          generalErrorElement.textContent = data.message;
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
      generalErrorElement.style.display = 'block';
      generalErrorElement.textContent =
        'An error occurred while processing your request.';
    } finally {
      submitButton.innerHTML = 'Update Profile';
      submitButton.disabled = false;
    }
  });

  const inputFields = document.querySelectorAll('input');
  inputFields.forEach((inputField) => {
    inputField.addEventListener('input', () => {
      const errorElement = document.getElementById(`${inputField.name}Error`);
      if (errorElement) {
        errorElement.innerText = '';
      }

      const generalErrorElement = document.getElementById('generalError');
      if (generalErrorElement) {
        generalErrorElement.innerText = '';
        generalErrorElement.style.display = 'none';
      }
    });
  });
});
