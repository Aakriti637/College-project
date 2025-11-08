function selectUser(userType) {
    // Store user type in session storage
    sessionStorage.setItem('userType', userType);
    
    // Redirect to login page
    window.location.href = 'index.html';
}

// Add animation on page load
window.addEventListener('load', function() {
    const cards = document.querySelectorAll('.user-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 150);
    });
});