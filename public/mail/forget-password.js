'use strict';
document
  .getElementById('forgetPasswordForm')
  .addEventListener('submit', async (event) => {
    event.preventDefault();

    const forgetPswdUrl = event.target.getAttribute('data-url');
    const email = document.getElementsByName('email')[0].value;
    const submitButton = document.getElementById('submitBtn');

    submitButton.innerHTML =
      '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Submitting...';
    submitButton.disabled = true;

    try {
      const response = await fetch(forgetPswdUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const responseData = await response.json();

      document.getElementById('emailError').textContent = '';

      if (response.ok) {
        displayMessage(responseData.message, 'alert alert-success');
      } else {
        const errors = responseData.errors || [];
        errors.forEach((error) => {
          const errorElement = document.getElementById(`${error.key}Error`);
          if (errorElement) {
            errorElement.textContent = error.msg;
          }
        });
      }
    } catch (error) {
      console.error('Error:', error);
      displayMessage(
        'An error occurred. Please try again later.',
        'alert alert-danger'
      );
    } finally {
      submitButton.innerHTML = 'Forget Password';
      submitButton.disabled = false;
    }

    const inputFields = document.querySelectorAll('input');
    inputFields.forEach((inputField) => {
      inputField.addEventListener('input', () => {
        const errorElement = document.getElementById(`${inputField.name}Error`);
        if (errorElement) {
          errorElement.innerText = '';
        }
      });
    });
  });

function displayMessage(message, alertClass) {
  const messageElement = document.getElementById('message');
  messageElement.textContent = message;
  messageElement.className = `text-center mt-3 ${alertClass}`;
}
