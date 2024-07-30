const ADMIN_PASSWORD = 'tobenna';

// Function to check the entered password
function checkPassword() {
    const enteredPassword = document.getElementById('admin-password').value;
    if (enteredPassword === ADMIN_PASSWORD) {
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('admin-section').style.display = 'block';
        fetchUsers();
    } else {
        document.getElementById('login-message').textContent = 'Wrong Password!';
        document.getElementById('login-message').style.color = 'red';
    }
}

// Function to fetch and display users
async function fetchUsers() {
    const response = await fetch('http://localhost:3000/users');
    const users = await response.json();
    const usersTable = document.getElementById('users-table').getElementsByTagName('tbody')[0];

    // Counting the Total number of signed up persons
    const userCountElement = document.getElementById('user-count');
    userCountElement.textContent = users.length;

    users.forEach(user => {
        const row = usersTable.insertRow();
        row.insertCell(0).textContent = user.name;
        row.insertCell(1).textContent = user.level;
        row.insertCell(2).textContent = user.matric;
        const deleteCell = row.insertCell(3);
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = `<i class='bx bxs-trash'></i>`;
        deleteButton.style.backgroundColor = "red";
        deleteButton.style.color = "white";
        deleteButton.style.padding = "10px";
        deleteButton.style.width = "70px";
        deleteButton.style.borderRadius = "5px";
        deleteButton.style.border = "none";
        deleteButton.style.fontSize = "17px";
        deleteButton.onclick = () => deleteUser(user.id);

        deleteCell.appendChild(deleteButton);
    });
}

// Function to delete a user
async function deleteUser(userId) {
    await fetch(`http://localhost:3000/users/${userId}`, {
        method: 'DELETE',
    });
    location.reload(); // Reload the page to update the user list cause I don't know how to make it update without reloading
}

// Function to search users by matric number
function searchUsers() {
    const searchValue = document.getElementById('search-bar').value.toLowerCase();
    const usersTable = document.getElementById('users-table').getElementsByTagName('tbody')[0];
    let found = false;

    for (let i = 0; i < usersTable.rows.length; i++) {
        const row = usersTable.rows[i];
        const matricNumber = row.cells[2].textContent.toLowerCase();
        if (matricNumber.includes(searchValue)) {
            row.style.display = '';
            found = true;
        } else {
            row.style.display = 'none';
        }
    }

    document.getElementById('search-message').textContent = found ? '' : 'User Not Found';
}

// Function to add a matric number to the authmatric array
async function addMatricNumber() {
    const newMatric = document.getElementById('new-matric').value;

    // Fetch current authmatric numbers
    const response = await fetch('http://localhost:3000/authmatric');
    const data = await response.json();

    // check if the matric number input is empty
    if(newMatric == ""){
        document.getElementById('add-message').textContent = 'Please Enter A Matric Number!';
        document.getElementById('add-message').style.color = 'red';
    }else if(data.matricNumbers.includes(newMatric)) {
        // Check if the matric number already exists
        document.getElementById('add-message').textContent = 'Matric Number Already Exists!';
        document.getElementById('add-message').style.color = 'red';
    } else {
        // Add the new matric number to the array
        data.matricNumbers.push(newMatric);

        // Update the authmatric array on the server
        await fetch('http://localhost:3000/authmatric', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        document.getElementById('add-message').textContent = 'Matric Number Added Successfully!';
        document.getElementById('add-message').style.color = 'green';
        document.getElementById('new-matric').value = '';
    }
}

// Function to count the number of matric numbers in authmatric
async function countAuthMatric() {
    try {
        // Fetch the authmatric data from the JSON server
        const response = await fetch('http://localhost:3000/authmatric');
        const data = await response.json();

        // Count the number of matric numbers in the authmatric array
        const count = data.matricNumbers.length;

        const countElement = document.getElementById('authmatric-count');
        if (countElement) {
            countElement.textContent =count;
        }
        return count;

    } catch (error) {
        console.error('Error fetching authmatric data:', error);
    }
}

countAuthMatric();
