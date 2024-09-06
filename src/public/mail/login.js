'use strict';
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const submitButton = document.getElementById('submitButtons');

  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    submitButton.innerHTML =
      '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Verifying...';
    submitButton.disabled = true;

    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');

    const loginUrl = loginForm.getAttribute('data-url');

    // Clear any previous error messages
    document.getElementById('emailError').textContent = '';
    document.getElementById('passwordError').textContent = '';
    const generalError = document.getElementById('generalError');
    if (generalError) {
      generalError.textContent = '';
      generalError.style.display = 'none';
    }

    try {
      // Handle login via fetch API
      const response = await fetch(loginUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const responseData = await response.json();

      if (response.ok && responseData.success) {
        // Redirect on success
        window.location.href = responseData.redirectUrl;
      } else {
        // Check if there are specific field validation errors
        const errors = responseData.errors || [];
        if (errors.length > 0) {
          errors.forEach((error) => {
            const errorElement = document.getElementById(`${error.key}Error`);
            if (errorElement) {
              errorElement.textContent = error.msg;
            }
          });
        } else if (responseData.message) {
          // Handle general error message (e.g., invalid credentials)
          const generalError = document.getElementById('generalError');
          if (generalError) {
            generalError.textContent = responseData.message;
            generalError.style.display = 'block';
          } else {
            alert(responseData.message); // Fallback if no general error element
          }
        }
      }
    } catch (error) {
      console.error('An error occurred. Please try again later.');
      displayErrorMessage('An error occurred. Please try again later.');
    } finally {
      submitButton.disabled = false;
      submitButton.innerHTML = 'Sign In';
    }
  });

  // Clear error messages when input changes
  const inputFields = document.querySelectorAll('input');
  inputFields.forEach((inputField) => {
    inputField.addEventListener('input', () => {
      const errorElement = document.getElementById(`${inputField.name}Error`);
      if (errorElement) {
        errorElement.innerText = '';
      }

      const generalError = document.getElementById('generalError');
      if (generalError) {
        generalError.textContent = '';
        generalError.style.display = 'none';
      }
    });
  });
});
