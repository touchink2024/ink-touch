'use strict';
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
           ${
             product.category === 'Flex' || product.category === 'Sav'
               ? `<select id="category" name="category" style="border:none;width: 100%; padding: 8px; box-sizing: border-box;" onchange="handleCategoryChange()">
                <option value="Flex" ${
                  product.category === 'Flex' ? 'selected' : ''
                }>Flex</option>
                <option value="Sav" ${
                  product.category === 'Sav' ? 'selected' : ''
                }>Sav</option>
              </select>`
               : `<input type="text" id="category" name="category" value="${product.category}" style="border:none;width: 100%; padding: 8px; box-sizing: border-box;">`
           }
                
              </td>
            </tr>
            <tr>
              <th>Size</th>
              <td>
                ${
                  product.category === 'Flex' || product.category === 'Sav'
                    ? `<select id="size" name="size" style="border:none;width: 100%; padding: 8px; box-sizing: border-box;">
                <!-- The sizes will be dynamically populated here if it's Flex or Sav -->
              </select>`
                    : `<input type="text" id="size" name="size" value="${product.size}" style="border:none;width: 100%; padding: 8px; box-sizing: border-box;">`
                }
              </td>
            </tr>
            <tr><th>Quantity</th><td><input style="border:none;width: 100%; padding: 8px; box-sizing: border-box;" type="number" id="totalQuantity" step="0.1" name="totalQuantity" value="${
              product.totalQuantity || ''
            }"></td></tr>
            <tr><th>Narration</th><td><input style="border:none;width: 100%; padding: 8px; box-sizing: border-box;" type="text" id="narration" name="narration" value="${
              product.narration || ''
            }"></td></tr>
            <input type="hidden" name="_id" value="${product._id}">
          </table>
        `;

        formContent.innerHTML = content;

        const modal = document.getElementById('editProductModal');
        modal.style.display = 'block';
        if (product.category === 'Flex' || product.category === 'Sav') {
          populateSizes(product.category, product.size);
        }
      } else {
        alert('Product details not found');
      }
    })
    .catch((error) => {
      alert('An error occurred while fetching product details.');
    });
}

function handleCategoryChange() {
  const categorySelect = document.getElementById('category');
  const selectedCategory = categorySelect.value;

  if (selectedCategory === 'Flex' || selectedCategory === 'Sav') {
    populateSizes(selectedCategory);
  } else {
    document.getElementById('size').innerHTML =
      '<option value="" disabled>Select a size</option>';
  }
}

function populateSizes(category, selectedSize = '') {
  const sizeSelect = document.getElementById('size');

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
      'blacklit 10 ft',
      'mesh 10 ft',
      'relf flex 10 ft',
    ];
  } else if (category === 'Sav') {
    sizes = [
      '4 ft',
      '5 ft',
      '4_5 ft',
      'relf sav 4_5 ft',
      'pvc',
      'clear sticker 4_5 ft',
      'paper 3 ft',
      'paper 4 ft',
      'paper 5 ft',
      'fabric 4 ft',
      'fabric 5 ft',
    ];
  }

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

function closeEditProductModal() {
  const modal = document.getElementById('editProductModal');
  modal.style.display = 'none';
}

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

function showDeleteProductModal(button) {
  const prodId = button.getAttribute('data-product-id');
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
