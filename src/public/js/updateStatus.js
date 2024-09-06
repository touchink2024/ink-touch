'use strict';
document.querySelectorAll('.account-status-select').forEach((select) => {
  select.addEventListener('change', function () {
    const userId = this.getAttribute('data-user-id');
    const accountStatus = this.value;
    const endpoint = `/admin/updateAccountStatus`;

    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, accountStatus }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          alert(data.message);
        } else {
          alert('Error updating account status');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Error updating account status');
      });
  });
});

// view popup

// jQuery(document).ready(function ($) {
//   //open popup
//   $('.popup-trigger').on('click', function (event) {
//     event.preventDefault();
//     $('.popup').addClass('is-visible');
//   });

//   //close popup
//   $('.popup').on('click', function (event) {
//     if ($(event.target).is('.popup-close') || $(event.target).is('.popup')) {
//       event.preventDefault();
//       $(this).removeClass('is-visible');
//     }
//   });
//   //close popup when clicking the esc keyboard button
//   $(document).keyup(function (event) {
//     if (event.which == '27') {
//       $('.popup').removeClass('is-visible');
//     }
//   });
// });
