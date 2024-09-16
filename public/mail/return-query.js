'use strict';
document.addEventListener('DOMContentLoaded', () => {
  const refSelect = document.getElementById('ref');
  const categoryInput = document.getElementById('category');
  const sizeInput = document.getElementById('size');

  // Fetch reference numbers for the signed-in user
  fetch('/user/getRefs')
    .then((response) => response.json())
    .then((data) => {
      data.refs.forEach((ref) => {
        const option = document.createElement('option');
        option.value = ref.ref; // Ensure this is the ref value
        option.textContent = ref.ref; // Display ref text
        refSelect.appendChild(option);
      });
    })
    .catch((err) => console.error('Error fetching refs:', err));

  // Fetch category and size details when a ref is selected
  refSelect.addEventListener('change', (event) => {
    const selectedRef = event.target.value; // Should match the ref value
    fetch(`/user/getRefDetails/${selectedRef}`)
      .then((response) => response.json())
      .then((data) => {
        categoryInput.value = data.category || 'N/A'; // Default to 'N/A' if undefined
        sizeInput.value = data.size || 'N/A'; // Default to 'N/A' if undefined
      })
      .catch((err) => console.error('Error fetching ref details:', err));
  });
});
