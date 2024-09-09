'use strict';
document.querySelectorAll('.account-status-select').forEach((select) => {
  select.addEventListener('change', function () {
    const requestId = this.getAttribute('data-request-id');
    const request_status = this.value;
    const endpoint = `/admin/request`;

    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ requestId, request_status }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          alert(data.message);
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
