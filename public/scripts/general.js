document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const matric = urlParams.get('matric');

    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        link.setAttribute('href', `${href}?matric=${encodeURIComponent(matric)}`);
    });
});
