'use strict';

document.addEventListener('DOMContentLoaded', function () {
  const operatorSelect = document.getElementById('operatorSelect');
  const eventSelect = document.getElementById('eventSelect');
  const reportTableBody = document.querySelector('#datatable-buttons tbody');
  const searchBtn = document.getElementById('searchBtn');

  searchBtn.addEventListener('click', function () {
    const operator = operatorSelect.value;
    const event = eventSelect.value;

    if (!operator || !event) {
      alert('Please select both an operator and an event.');
      return;
    }

    // Clear previous table data
    reportTableBody.innerHTML = '';

    // Send AJAX request to fetch report data
    fetch(`/admin/operator-report?operator=${operator}&event=${event}`)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.length > 0) {
          data.forEach((report, index) => {
            const row = `
                <tr>
                  <td>${index + 1}</td>
                  <td>${new Date(report.createdAt).toLocaleString()}</td>
                  <td>${report.ref || 'N/A'}</td>
                  <td>${report.category || 'N/A'}</td>
                  <td>${report.size || 'N/A'}</td>
                  <td>${report.quantity_requested || 'N/A'}</td>
                  <td>${report.narration || 'N/A'}</td>
                  <td style="color:${
                    report.request_status === 'Accepted' ? 'green' : 'red'
                  };">
                    <h6>${report.request_status}</h6>
                  </td>
                </tr>`;
            reportTableBody.insertAdjacentHTML('beforeend', row);
          });
        } else {
          reportTableBody.innerHTML =
            '<tr><td colspan="8">No data found for the selected operator and event.</td></tr>';
        }
      })
      .catch((error) => {
        console.error('Error fetching report:', error);
      });
  });
});
