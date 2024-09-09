'use strict';
document.querySelectorAll('.account-status-select').forEach((select) => {
  select.addEventListener('change', function () {
    const wasteId = this.getAttribute('data-waste-id');
    const waste_status = this.value;
    const endpoint = `/admin/all-wastage`;

    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ wasteId, waste_status }),
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
