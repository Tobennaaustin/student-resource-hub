document.addEventListener("DOMContentLoaded", function() {
    const splash = document.querySelector('.splash');
    const app = document.querySelector('.app');
    const smallDeviceMessage = document.querySelector('.small-device-message');

    // Function to check if the device is small (tablet or mobile)
    function checkDevice() {
        if (window.innerWidth <= 768) {
            // If device is small, display the splash screen
            splash.style.display = 'flex';
            setTimeout(() => {
                splash.style.opacity = '0';
                setTimeout(() => {
                    splash.style.display = 'none';
                    app.style.display = 'block';
                }, 1000); // Duration for fade-out effect
            }, 4000); // Duration to display the splash screen
        } else {
            // If device is not small, display the message
            smallDeviceMessage.style.display = 'flex';
        }
    }

    checkDevice();
    window.addEventListener('resize', checkDevice);
});
