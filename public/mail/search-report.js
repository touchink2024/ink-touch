'use strict';

let currentPage = 1;
document.getElementById('searchForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const formData = new FormData(this);
  const fromdate = formData.get('fromdate');
  const todate = formData.get('todate');

  const submitButton = document.getElementById('searchBtn');
  currentPage = 1;

  submitButton.innerHTML =
    '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Submitting...';
  submitButton.disabled = true;

  fetchData(fromdate, todate, currentPage);
});

// Fetch paginated data
function fetchData(fromdate, todate, page) {
  fetch(`/admin/material-search?page=${page}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fromdate, todate }),
  })
    .then((response) => response.json())
    .then((data) => {
      populateTable(data.results);
      updatePagination(data.currentPage, data.totalPages);
    })
    .catch((error) => {
      console.error('Error fetching materials:', error);
      alert('An error occurred. Please try again.');
    })
    .finally(() => {
      const submitButton = document.getElementById('searchBtn');
      submitButton.innerHTML = 'Search';
      submitButton.disabled = false;
    });
}

function populateTable(data) {
  const tableBody = document.querySelector('#datatable-buttons tbody');
  tableBody.innerHTML = '';

  if (data.length === 0) {
    const noResultRow = `
      <tr>
        <td colspan="10" class="text-center">No results found for the selected dates.</td>
      </tr>
    `;
    tableBody.insertAdjacentHTML('beforeend', noResultRow);
    return;
  }

  data.forEach((item, index) => {
    const quantity =
      item.waste_quantity ||
      item.quantity_requested ||
      item.return_quantity ||
      0;
    const status =
      item.waste_status || item.request_status || item.return_status || 'N/A';

    const row = `
      <tr>
        <td>${index + 1}</td>
        <td>${item.type}</td>
        <td>${item.operator}</td>
        <td>${new Date(item.createdAt).toLocaleString()}</td>
        <td>${item.ref}</td>
        <td>${item.category}</td>
        <td>${item.size}</td>
        <td>${quantity}</td>
        <td>${item.narration || 'N/A'}</td>
        <td>${status}</td>
      </tr>
    `;
    tableBody.insertAdjacentHTML('beforeend', row);
  });
}

function updatePagination(currentPage, totalPages) {
  const paginationContainer = document.getElementById('pagination');
  paginationContainer.innerHTML = '';

  if (totalPages > 1) {
    for (let i = 1; i <= totalPages; i++) {
      const pageButton = document.createElement('button');
      pageButton.innerText = i;
      pageButton.disabled = i === currentPage;
      pageButton.classList.add('btn', 'btn-sm', 'btn-primary', 'mr-2');
      pageButton.addEventListener('click', () => {
        currentPage = i;
        const fromdate = document.querySelector('[name="fromdate"]').value;
        const todate = document.querySelector('[name="todate"]').value;
        fetchData(fromdate, todate, currentPage);
      });
      paginationContainer.appendChild(pageButton);
    }
  }
}
