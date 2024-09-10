'use strict';
document.querySelectorAll('.account-status-select').forEach((select) => {
  select.addEventListener('change', function () {
    const returnId = this.getAttribute('data-return-id');
    const return_status = this.value;
    const endpoint = `/admin/all-return`;

    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ returnId, return_status }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          alert(data.message);
          location.reload();
        } else {
          alert('Error updating return status');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Error updating return status');
      });
  });
});
