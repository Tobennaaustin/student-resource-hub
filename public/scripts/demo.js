document.addEventListener('DOMContentLoaded', async () => {
    // Get matric number from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const matric = urlParams.get('matric');

    // Fetch users to find the logged-in user
    const response = await fetch('http://localhost:3000/users');
    const users = await response.json();

    const user = users.find(user => user.matric === matric);
    if (user) {
        const usernameElement = document.getElementById('username');
        const matricNumberElement = document.getElementById('matric-number');
        const profilePictureElement = document.getElementById('profile-picture');
        const levelElement = document.getElementById('level');

        usernameElement.textContent = `Hello, ${user.name}!`;
        matricNumberElement.textContent = `Matric Number: ${user.matric}`;
        profilePictureElement.textContent = user.name.charAt(0).toUpperCase();
        if (levelElement) {
            levelElement.textContent = user.level;
        }
    }

    // code to handle navigtion
    
    function openTab(tabName) {
        // Hide all content
        const contents = document.querySelectorAll('.content');
        contents.forEach(content => content.style.display = 'none');
      
        // Show the selected tab content
        const activeContent = document.getElementById(tabName);
        activeContent.style.display = 'block';
      
        // Highlight the active tab
        const tabs = document.querySelectorAll('.tab');
        tabs.forEach(tab => tab.classList.remove('active'));
        document.querySelector(`[onclick="openTab('${tabName}')"]`).classList.add('active');
      }
      
      // Initialize the first tab as active
      document.addEventListener('DOMContentLoaded', () => {
        document.querySelector('.tab').classList.add('active');
        document.querySelector('.content').style.display = 'block';
      });
});
