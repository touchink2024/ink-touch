'use strict';

// VIEW User MODAL
function showViewUserModal(button) {
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

        let content = `
            <table class="table table-bordered">
              <tr><th>Full Name</th><td>${user.name || 'N/A'}</td></tr>
              <tr><th>Email</th><td>${user.email || 'N/A'}</td></tr>
              <tr><th>Number</th><td>${user.phone_number || 'N/A'}</td></tr>
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
        const user = data.editUserInfo;
        const formContent = document.getElementById('editUserFormContent');

        let content = `
               <table class="table table-bordered">
    <tr><th>Full Name</th><td> <input style="border:none;width: 100%; padding: 8px; box-sizing: border-box;" type="text" id="name" name="name" value="${
      user.name || ''
    }"></td></tr>
    <tr><th>Email</th><td><input style="border:none;width: 100%; padding: 8px; box-sizing: border-box;" type="email" id="email" name="email" value="${
      user.email || ''
    }"></td></tr>
    <tr><th>Number</th><td><input style="border:none;width: 100%; padding: 8px; box-sizing: border-box;" type="text" id="phone_number" name="phone_number" value="${
      user.phone_number || ''
    }"></td></tr>
    <tr><th>Role</th>
      <td>
        <select id="role" name="role" style="border:none;width: 100%; padding: 8px; box-sizing: border-box;">
          <option value="User" ${
            user.role === 'User' ? 'selected' : ''
          }>User</option>
          <option value="Admin" ${
            user.role === 'Admin' ? 'selected' : ''
          }>Admin</option>
          <option value="Super_Admin" ${
            user.role === 'Super_Admin' ? 'selected' : ''
          }>Super Admin</option>
        </select>
      </td>
    </tr>
    <input type="hidden" name="_id" value="${user._id}">
  </table>
        `;

        formContent.innerHTML = content;
        const modal = document.getElementById('editUserModal');
        modal.style.display = 'block';
      } else {
        alert('User details not found');
      }
    })
    .catch((error) => {
      alert('An error occurred while fetching User details.');
    });
}

function closeEditUserModal() {
  $('#editUserModal').modal('hide');
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
        alert('User successfully updated');
        closeEditUserModal();
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
            throw new Error(data.message || 'Error deleting user');
          });
        }
        return response.json();
      })
      .then((data) => {
        if (data.redirectUrl) {
          alert('User deleted successfully');
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
