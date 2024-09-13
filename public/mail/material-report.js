'use strict';
document
  .querySelector('select[name="operator"]')
  .addEventListener('change', function () {
    const reportType = this.value;

    fetch(`/admin/get-material-report?type=${reportType}`)
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched Data:', data);
        populateMaterialTables(data);
      })
      .catch((error) => {
        console.error('Error fetching material report:', error);
      });
  });

function populateMaterialTables(data) {
  const flexTableBody = document.getElementById('flex-table-body');
  const savTableBody = document.getElementById('sav-table-body');

  flexTableBody.innerHTML = '';
  savTableBody.innerHTML = '';

  let flexRow = `
<tr>
  <td>${data.Flex['3 ft'] || 0}</td>
  <td>${data.Flex['4 ft'] || 0}</td>
  <td>${data.Flex['5 ft'] || 0}</td>
  <td>${data.Flex['6 ft'] || 0}</td>
  <td>${data.Flex['7 ft'] || 0}</td>
  <td>${data.Flex['8 ft'] || 0}</td>
  <td>${data.Flex['10 ft'] || 0}</td>
  <td>${data.Flex['blacklit 10 ft'] || 0}</td>
  <td>${data.Flex['mesh 10 ft'] || 0}</td>
  <td>${data.Flex['relf flex 10 ft'] || 0}</td>
</tr>`;
  flexTableBody.insertAdjacentHTML('beforeend', flexRow);

  let savRow = `
<tr>
  <td>${data.SAV['4 ft'] || 0}</td>
  <td>${data.SAV['5 ft'] || 0}</td>
  <td>${data.SAV['4_5 ft'] || 0}</td>
  <td>${data.SAV['relf sav 4_5 ft'] || 0}</td>
  <td>${data.SAV['pvc'] || 0}</td>
  <td>${data.SAV['clear sticker 4_5 ft'] || 0}</td>
  <td>${data.SAV['paper 3 ft'] || 0}</td>  
  <td>${data.SAV['paper 4 ft'] || 0}</td>
  <td>${data.SAV['paper 5 ft'] || 0}</td> 
  <td>${data.SAV['fabric 4 ft'] || 0}</td>
  <td>${data.SAV['fabric 5 ft'] || 0}</td>
</tr>`;
  savTableBody.insertAdjacentHTML('beforeend', savRow);
}
