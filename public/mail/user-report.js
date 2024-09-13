// 'use strict';

// document.addEventListener('DOMContentLoaded', function () {
//   const operatorSelect = document.getElementById('operatorSelect');
//   const eventSelect = document.getElementById('eventSelect');
//   const reportTableBody = document.querySelector('#datatable-buttons tbody');
//   const searchBtn = document.getElementById('searchBtn');

//   searchBtn.addEventListener('click', function () {
//     const operator = operatorSelect.value;
//     const event = eventSelect.value;

//     if (!operator || !event) {
//       alert('Please select both an operator and an event.');
//       return;
//     }

//     // Clear previous table data
//     reportTableBody.innerHTML = '';

//     // Send AJAX request to fetch report data
//     fetch(`/admin/operator-report?operator=${operator}&event=${event}`)
//       .then((response) => response.json())
//       .then((data) => {
//         if (data && data.length > 0) {
//           data.forEach((report, index) => {
//             // Handle quantity and status fields dynamically based on event type
//             let quantityField = 'N/A';
//             let statusField = 'N/A';

//             if (event === 'Requests') {
//               quantityField = report.quantity_requested || 'N/A';
//               statusField = report.request_status || 'N/A';
//             } else if (event === 'Wastages') {
//               quantityField = report.waste_quantity || 'N/A';
//               statusField = report.waste_status || 'N/A';
//             } else if (event === 'Returns') {
//               quantityField = report.return_quantity || 'N/A';
//               statusField = report.return_status || 'N/A';
//             }

//             const row = `
//                 <tr>
//                   <td>${index + 1}</td>
//                   <td>${new Date(report.createdAt).toLocaleString()}</td>
//                   <td>${report.ref || 'N/A'}</td>
//                   <td>${report.category || 'N/A'}</td>
//                   <td>${report.size || 'N/A'}</td>
//                   <td>${quantityField}</td>
//                   <td>${report.narration || 'N/A'}</td>
//                   <td style="color:${
//                     statusField === 'Accepted' || statusField === 'Approved'
//                       ? 'green'
//                       : 'red'
//                   };">
//                     <h6>${statusField}</h6>
//                   </td>
//                 </tr>`;
//             reportTableBody.insertAdjacentHTML('beforeend', row);
//           });
//         } else {
//           reportTableBody.innerHTML =
//             '<tr><td colspan="8">No data found for the selected operator and event.</td></tr>';
//         }
//       })
//       .catch((error) => {
//         console.error('Error fetching report:', error);
//       });
//   });
// });

'use strict';

document.addEventListener('DOMContentLoaded', function () {
  const operatorSelect = document.getElementById('operatorSelect');
  const eventSelect = document.getElementById('eventSelect');
  const reportTableBody = document.querySelector('#datatable-buttons tbody');
  const searchBtn = document.getElementById('searchBtn');
  let currentPage = 1;

  searchBtn.addEventListener('click', function () {
    const operator = operatorSelect.value;
    const event = eventSelect.value;

    if (!operator || !event) {
      alert('Please select both an operator and an event.');
      return;
    }

    currentPage = 1; // Reset to the first page
    fetchData(operator, event, currentPage);
  });

  // Fetch paginated data
  function fetchData(operator, event, page) {
    console.log(`Fetching data for ${operator}, ${event}, page ${page}`);
    fetch(
      `/admin/operator-report?operator=${operator}&event=${event}&page=${page}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log('Data received:', data); // Debugging line
        if (data && data.results.length > 0) {
          populateTable(data.results);
          updatePagination(data.currentPage, data.totalPages);
        } else {
          reportTableBody.innerHTML =
            '<tr><td colspan="8">No data found for the selected operator and event.</td></tr>';
          document.getElementById('pagination').innerHTML = '';
        }
      })
      .catch((error) => {
        console.error('Error fetching report:', error);
      });
  }

  function populateTable(data) {
    reportTableBody.innerHTML = '';

    data.forEach((report, index) => {
      let quantityField = 'N/A';
      let statusField = 'N/A';

      if (eventSelect.value === 'Requests') {
        quantityField = report.quantity_requested || 'N/A';
        statusField = report.request_status || 'N/A';
      } else if (eventSelect.value === 'Wastages') {
        quantityField = report.waste_quantity || 'N/A';
        statusField = report.waste_status || 'N/A';
      } else if (eventSelect.value === 'Returns') {
        quantityField = report.return_quantity || 'N/A';
        statusField = report.return_status || 'N/A';
      }

      const row = `
        <tr>
          <td>${index + 1}</td>
          <td>${new Date(report.createdAt).toLocaleString()}</td>
          <td>${report.ref || 'N/A'}</td>
          <td>${report.category || 'N/A'}</td>
          <td>${report.size || 'N/A'}</td>
          <td>${quantityField}</td>
          <td>${report.narration || 'N/A'}</td>
          <td style="color:${
            statusField === 'Accepted' || statusField === 'Approved'
              ? 'green'
              : 'red'
          };">
            <h6>${statusField}</h6>
          </td>
        </tr>`;
      reportTableBody.insertAdjacentHTML('beforeend', row);
    });
  }

  function updatePagination(currentPage, totalPages) {
    console.log(
      `Updating pagination: currentPage=${currentPage}, totalPages=${totalPages}`
    );
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = '';

    if (totalPages > 1) {
      for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.innerText = i;
        pageButton.disabled = i === currentPage;
        pageButton.classList.add('btn', 'btn-sm', 'btn-primary', 'mr-2');
        pageButton.addEventListener('click', () => {
          fetchData(operatorSelect.value, eventSelect.value, i);
        });
        paginationContainer.appendChild(pageButton);
      }
    }
  }
});
