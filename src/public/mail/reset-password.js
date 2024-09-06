'use strict';
document.addEventListener('DOMContentLoaded', () => {
  const resetPasswordForm = document.getElementById('resetPasswordForm');
  const resetToken = window.location.pathname.split('/').pop();
  resetPasswordForm.action = `/auth/resetPassword/${resetToken}`;

  resetPasswordForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const submitButton = document.getElementById('submitBtns');
    submitButton.innerHTML =
      '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Submitting...';
    submitButton.disabled = true;

    const password = document.querySelector('input[name="password"]').value;
    const confirmPassword = document.querySelector(
      'input[name="confirmPassword"]'
    ).value;

    try {
      const response = await fetch(resetPasswordForm.action, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password, confirmPassword }),
      });
      const responseData = await response.json();

      if (response.ok) {
        window.location.href = responseData.redirectUrl;
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
      console.error('Error resetting password:', error);
      displayMessage(
        'An error occurred while processing your request.',
        'error',
        'confirmPassword'
      );
    } finally {
      submitButton.innerHTML = 'Reset Password';
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

  function displayMessage(message, type, fieldName) {
    const messageElement = document.getElementById(`${fieldName}Error`);
    messageElement.textContent = message;
    messageElement.className = type;
  }
});
