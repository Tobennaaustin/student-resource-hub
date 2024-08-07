document.getElementById('signup-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('signup-name').value;
    const level = document.getElementById('signup-level').value;
    const matric = document.getElementById('signup-matric').value;

    // Fetch the list of valid matric numbers
    const response = await fetch('http://localhost:3000/authmatric');
    const data = await response.json();

    // Fetch the list of registered users
    const usersResponse = await fetch('http://localhost:3000/users');
    const users = await usersResponse.json();

    // Check if the matric number is valid
    if (data.matricNumbers.includes(matric)) {
        // Check if the matric number is already registered
        if (users.some(user => user.matric === matric)) {
            document.getElementById('message').textContent = 'Matric Number Already Registered!';
            document.getElementById('message').style.color = "red";
            window.location.href = 'login.html';
        } else {
            // Create a new user object
            const newUser = { name, level, matric };

            // Save the new user to the database
            await fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            });

            // Redirect to the main app page
            window.location.href = 'main.html?matric=' + encodeURIComponent(matric);
        }
    } else {
        document.getElementById('message').textContent = 'Invalid Matric Number!';
        document.getElementById('message').style.color = "red";                             }
});
