'use strict';
document.addEventListener('DOMContentLoaded', () => {
  const refSelect = document.getElementById('ref');
  const categoryInput = document.getElementById('category');
  const sizeInput = document.getElementById('size');

  fetch('/user/getRefs')
    .then((response) => response.json())
    .then((data) => {
      data.refs.forEach((ref) => {
        const option = document.createElement('option');
        option.value = ref.ref;
        option.textContent = ref.ref;
        refSelect.appendChild(option);
      });
    })
    .catch((err) => console.error('Error fetching refs:', err));

  refSelect.addEventListener('change', (event) => {
    const selectedRef = event.target.value;
    fetch(`/user/getRefDetails/${selectedRef}`)
      .then((response) => response.json())
      .then((data) => {
        categoryInput.value = data.category || 'N/A';
        sizeInput.value = data.size || 'N/A';
      })
      .catch((err) => console.error('Error fetching ref details:', err));
  });
});
