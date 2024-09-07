'use strict';

document
  .getElementById('verifyEmailForm')
  .addEventListener('submit', async function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    const verificationCode = formData.get('verificationCode');
    const submitButton = this.querySelector('button[type="submit"]');
    const errorDiv = document.getElementById('verificationCodeError');

    submitButton.innerHTML =
      '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Verifying...';
    submitButton.disabled = true;

    try {
      const response = await fetch(this.dataset.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputOTP: verificationCode }),
      });

      const data = await response.json();

      if (data.success) {
        alert(data.message);
        setTimeout(() => {
          window.location.href = data.redirectUrl;
        }, 1000);
      } else {
        errorDiv.textContent = data.message;
        errorDiv.style.display = 'block';
      }
    } catch (error) {
      console.error('An error occurred:', error);
      alert('Error verifying email.');
    } finally {
      submitButton.innerHTML = 'Verify';
      submitButton.disabled = false;
    }
  });
