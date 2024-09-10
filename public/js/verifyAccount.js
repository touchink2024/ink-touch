'use strict';
document.querySelectorAll('.account-verify-select').forEach((select) => {
  select.addEventListener('change', function () {
    const userId = this.getAttribute('data-verify-id');
    const verifyStatus = this.value;
    const endpoint = `/admin/verifyAccount`;

    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, verifyStatus }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          alert(data.message);
          location.reload();
        } else {
          alert('Error updating account status');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Error updating account status');
      });
  });
});
