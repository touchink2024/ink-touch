'use strict';

// VIEW User MODAL
function showViewUserModal(button) {
  // Ensure correct attribute case
  const userId = button.getAttribute('data-user-id');
  const url = button.getAttribute('data-url');

  fetch(`${url}/${userId}`)
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
        const user = data.userInfo;
        const modalContent = document.getElementById('modalContent');

        // Populate modal with user details
        let content = `
            <table class="table table-bordered">
              <tr><th>Full Name</th><td>${user.name}</td></tr>
              <tr><th>Email</th><td>${user.email}</td></tr>
              <tr><th>Number</th><td>${user.phone_number}</td></tr>
              <tr><th>Address</th><td>${user.address}</td></tr>
              <tr><th>City</th><td>${user.city}</td></tr>
              <tr><th>State</th><td>${user.state}</td></tr>
              <tr><th>Role</th><td>${user.role}</td></tr>
              <tr><th>Date Added</th><td>${new Date(
                user.createdAt
              ).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}</td></tr>
            </table>
          `;
        modalContent.innerHTML = content;

        // Display the modal
        const modal = document.getElementById('viewUserModal');
        modal.style.display = 'block';
      } else {
        alert('User details not found');
      }
    })
    .catch((error) => {
      alert('An error occurred while fetching user details.');
    });
}

function closeViewUserModal() {
  const modal = document.getElementById('viewUserModal');
  modal.style.display = 'none';
}

//  EDIT User MODEL
function showEditUserModal(button) {
  const userId = button.getAttribute('data-User-id');
  fetch(`/admin/editUser/${userId}`)
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
        const editUser = data.editUserInfo;
        const formContent = document.getElementById('editUserFormContent');

        let content = `
            <div class="col-12 d-flex main_flex_div">
                <div class="col-4 d-flex flex-column inner_flex_div">
                    <label for="firstName">Full Name:</label>
                    <input type="text" id="name" name="name" value="${
                      editUser.name || ''
                    }">
                    <input type="hidden" name="_id" value="${editUser._id}">
                </div>
      
                <div class="col-4 d-flex flex-column inner_flex_div">
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" value="${
                      editUser.email || ''
                    }">
                </div>
            </div>
            <div class="col-12 d-flex main_flex_div">
                <div class="col-4 d-flex flex-column inner_flex_div">
                    <label for="phone_number">Number:</label>
                    <input type="text" id="phone_number" name="phone_number" value="${
                      editUser.phone_number || ''
                    }">
                </div>
                <div class="col-4 d-flex flex-column inner_flex_div">
                    <label for="password">Password:</label>
                    <input type="text" id="password" name="password" value="${
                      editUser.password || ''
                    }">
                </div>
               
            </div>
              <div class="col-12 d-flex main_flex_div">
               
                <div class="col-4 d-flex flex-column inner_flex_div">
                    <label for="number">Address</label>
                    <input type="text" id="address" name="address" value="${
                      editUser.address || ''
                    }">
                </div>
                 <div class="col-4 d-flex flex-column inner_flex_div">
                    <label for="city">City:</label>
                    <input type="text" id="city" name="city" value="${
                      editUser.city || ''
                    }">
                </div>
            </div>
            <div class="col-12 d-flex main_flex_div">
               
                <div class="col-4 d-flex flex-column inner_flex_div">
                    <label for="state">State</label>
                    <input type="text" id="state" name="state" value="${
                      editUser.state || ''
                    }">
                </div>
                <div class="col-4 d-flex flex-column inner_flex_div">
                    <label for="state">Role:</label>
                    <input type="text" id="role" name="role" value="${
                      editUser.role || ''
                    }">
                </div>
               
            </div>

        `;

        formContent.innerHTML = content;
        const modal = document.getElementById('editUserModal');
        modal.style.display = 'block';
      } else {
        console.log('Fetch data error:', data); // Log data in case of failure
        alert('User details not found');
      }
    })
    .catch((error) => {
      console.error('Fetch Error:', error); // Log the error details
      alert('An error occurred while fetching User details.');
    });
}

function closeEditUserModal() {
  const modal = document.getElementById('editUserModal');
  modal.style.display = 'none';
}

//Submit edit product modal
document
  .getElementById('editUserForm')
  .addEventListener('submit', async function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    const userId = formData.get('_id');

    const formObject = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(`/admin/editUser/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formObject),
      });
      const data = await response.json();
      if (response.ok) {
        showToast('User successfully updated', 'success');
        closeEditUserModal();
        window.location.href = data.redirectUrl;
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  });

// DELETE User MODAL
function showDeleteUserModal(button) {
  const UserId = button.getAttribute('data-User-id');
  const url = button.getAttribute('data-url');

  if (confirm('Are you sure you want to delete this User?')) {
    fetch(`${url}/${UserId}`, {
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
          showToast('User deleted successfully', 'success');
          window.location.href = data.redirectUrl; // Redirect based on received redirectUrl
        } else {
          showToast('Error deleting product', 'error');
        }
      })
      .catch((error) => {
        showToast('Error deleting product: ' + error.message, 'error');
      });
  }
}
