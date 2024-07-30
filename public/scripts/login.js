document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const matric = document.getElementById('login-matric').value;

    // Fetch the list of registered users
    const usersResponse = await fetch('http://localhost:3000/users');
    const users = await usersResponse.json();

    // Check if the matric number is registered
    const user = users.find(user => user.matric === matric);
    if (user) {
        // Redirect to the main app page
        window.location.href = 'main.html?matric=' + encodeURIComponent(matric);
    } else {
        document.getElementById('message').textContent = 'Matric Number Not Registered!';
        document.getElementById('message').style.color = "red";
    }
});
