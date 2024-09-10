document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('userForm');
    const userTable = document.getElementById('userTable');
    const passwordField = document.getElementById('password');
    const errorMessages = document.getElementById('errorMessages');

    // Fetch users on page load and populate the table
    fetch('/api/users')
    .then(response => response.json())
    .then(data => {
        data.forEach(user => {
            addUserToTable(user);
        });
    })
    .catch(error => console.error('Error:', error));

    // Add event listener to the form for submission
    form.addEventListener('submit', function (event) {
        // const password = passwordField.value;

        // Clear any existing error messages
        errorMessages.innerHTML = '';


        // Check form validation
        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();

            const formData = new FormData(form);

            fetch('/api/user', {
                method: 'POST',
                body: formData,
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.errors) {
                    displayErrors(data.errors);
                    const modalElement = document.getElementById('userModal');
                    const modalInstance = bootstrap.Modal.getOrCreateInstance(modalElement); // Ensure the modal instance exists
                    modalInstance.hide();
                } else {
                    addUserToTable(data);
                    form.reset();
                    form.classList.remove('was-validated');
                    const modalElement = document.getElementById('userModal');
                    const modalInstance = bootstrap.Modal.getOrCreateInstance(modalElement); // Ensure the modal instance exists
                    modalInstance.hide();
                }
            })
            .catch(error => {
                console.error('Error:', error)
                const modalElement = document.getElementById('userModal');
                const modalInstance = bootstrap.Modal.getOrCreateInstance(modalElement); // Ensure the modal instance exists
                modalInstance.hide();
            });
        }
        form.classList.add('was-validated');
    });

    // Display error messages in the error container
    function displayErrors(errors) {
        const errorContainer = document.getElementById('errorMessages');
        errorContainer.innerHTML = '';
        for (const key in errors) {
            const errorDiv = document.createElement('div');
            errorDiv.classList.add('alert', 'alert-danger');
            errorDiv.textContent = errors[key][0];
            errorContainer.appendChild(errorDiv);
        }
    }

    // Add a new user to the table dynamically
    function addUserToTable(user) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.phone}</td>
            <td>${user.description}</td>
            <td>${user.role.name}</td>
            <td><img src="/uploads/${user.profile_image}" alt="Profile Image" width="50"></td>
        `;
        userTable.querySelector('tbody').appendChild(row);
    }
});
