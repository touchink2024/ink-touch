'use strict';
// EDIT Product Modal
function showEditProductModal(button) {
  const prodId = button.getAttribute('data-product-id');
  fetch(`/admin/editProduct/${prodId}`)
    .then((response) => {
      if (!response.ok) {
        return response.text().then((text) => {
          throw new Error(text || 'Network response was not ok');
        });
      }
      return response.json();
    })
    .then((data) => {
      if (data.success) {
        const product = data.editProductInfo;
        const formContent = document.getElementById('editProductFormContent');

        let content = `
          <table class="table table-bordered">
            <tr>
              <th>Category</th>
              <td>
                <select id="category" name="category" style="border:none;width: 100%; padding: 8px; box-sizing: border-box;" onchange="handleCategoryChange()">
                  <option value="Flex" ${
                    product.category === 'Flex' ? 'selected' : ''
                  }>Flex</option>
                  <option value="Sav" ${
                    product.category === 'Sav' ? 'selected' : ''
                  }>Sav</option>
                </select>
              </td>
            </tr>
            <tr>
              <th>Size</th>
              <td>
                <select id="size" name="size" style="border:none;width: 100%; padding: 8px; box-sizing: border-box;">
                  <!-- The sizes will be dynamically populated here -->
                </select>
              </td>
            </tr>
            <tr><th>Material</th><td><input style="border:none;width: 100%; padding: 8px; box-sizing: border-box;" type="text" id="material" name="material" value="${
              product.material || ''
            }"></td></tr>
            <tr><th>Quantity</th><td><input style="border:none;width: 100%; padding: 8px; box-sizing: border-box;" type="number" id="quantity" name="quantity" value="${
              product.quantity || ''
            }"></td></tr>
            <tr><th>Narration</th><td><input style="border:none;width: 100%; padding: 8px; box-sizing: border-box;" type="text" id="narration" name="narration" value="${
              product.narration || ''
            }"></td></tr>
            <input type="hidden" name="_id" value="${product._id}">
          </table>
        `;

        // Inject the form content
        formContent.innerHTML = content;

        // Show the correct modal
        const modal = document.getElementById('editProductModal');
        modal.style.display = 'block';

        // Initially populate the size dropdown based on the product's category and size
        populateSizes(product.category, product.size);
      } else {
        alert('Product details not found');
      }
    })
    .catch((error) => {
      alert('An error occurred while fetching product details.');
    });
}

// Function to handle the change event of the category select element
function handleCategoryChange() {
  const categorySelect = document.getElementById('category');
  const selectedCategory = categorySelect.value;

  // Populate the sizes based on the selected category
  populateSizes(selectedCategory);
}

// Populate size options based on the selected category
function populateSizes(category, selectedSize = '') {
  const sizeSelect = document.getElementById('size');

  // Clear the existing options
  sizeSelect.innerHTML = '<option value="" disabled>Select a size</option>';

  let sizes = [];

  if (category === 'Flex') {
    sizes = [
      '3 ft',
      '4 ft',
      '5 ft',
      '6 ft',
      '7 ft',
      '8 ft',
      '10 ft',
      'Blacklit 10 ft',
      'Mesh 10 ft',
      'Relf flex 10 ft',
    ];
  } else if (category === 'Sav') {
    sizes = [
      '4 ft',
      '5 ft',
      '4/5 ft',
      'Relf sav 4/5 ft',
      'pvc',
      'Clear sticker 4&5 ft',
      'Paper 3 ft',
      'Paper 4 ft',
      'Paper 5 ft',
      'Fabric 4 ft',
      'Fabric 5 ft',
    ];
  }

  // Add the sizes to the select dropdown and pre-select the existing size if any
  sizes.forEach(function (size) {
    const option = document.createElement('option');
    option.value = size.toLowerCase();
    option.textContent = size;

    if (size.toLowerCase() === selectedSize.toLowerCase()) {
      option.selected = true;
    }

    sizeSelect.appendChild(option);
  });
}

// Close the edit modal
function closeEditProductModal() {
  const modal = document.getElementById('editProductModal');
  modal.style.display = 'none';
}

// Submit form
document
  .getElementById('editProductForm')
  .addEventListener('submit', async function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    const prodId = formData.get('_id');

    const formObject = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(`/admin/editProduct/${prodId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formObject),
      });
      const data = await response.json();
      if (response.ok) {
        alert('Product successfully updated');
        closeEditProductModal();
        setTimeout(() => {
          window.location.href = data.redirectUrl;
        }, 100);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  });

// DELETE User MODAL
function showDeleteProductModal(button) {
  const prodId = button.getAttribute('data-product-id');
  console.log('Product ID:', prodId);
  const url = button.getAttribute('data-url');

  if (confirm('Are you sure you want to delete this product?')) {
    fetch(`${url}/${prodId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            throw new Error(data.message || 'Error deleting product');
          });
        }
        return response.json();
      })
      .then((data) => {
        if (data.redirectUrl) {
          alert('Product deleted successfully');
          setTimeout(() => {
            window.location.href = data.redirectUrl;
          }, 100);
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        alert('Error deleting user: ' + error.message, 'error');
      });
  }
}
