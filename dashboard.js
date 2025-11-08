// Check if user is logged in
window.addEventListener('DOMContentLoaded', function() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    const username = sessionStorage.getItem('username');
    const registrationNo = sessionStorage.getItem('registrationNo');
    const section = sessionStorage.getItem('section');
    
    if (!isLoggedIn) {
        window.location.href = 'index.html';
        return;
    }
    
    // Display user information
    if (username) {
        document.getElementById('userName').textContent = username;
        const studentName = document.getElementById('studentName');
        if (studentName) studentName.textContent = username;
    }
    
    if (registrationNo) {
        document.getElementById('userReg').textContent = 'Reg. No: ' + registrationNo;
        const studentReg = document.getElementById('studentReg');
        if (studentReg) studentReg.textContent = registrationNo;
    }
    
    if (section) {
        const studentSection = document.getElementById('studentSection');
        if (studentSection) studentSection.textContent = section;
    }
    
    // Initialize pages - make sure home is visible by default
    showPage('home');
});

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');

menuToggle.addEventListener('click', function() {
    sidebar.classList.toggle('active');
});

// Close sidebar when clicking outside on mobile
document.addEventListener('click', function(e) {
    if (window.innerWidth <= 768) {
        if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
            sidebar.classList.remove('active');
        }
    }
});

// Navigation functionality
const navItems = document.querySelectorAll('.nav-item');
const pageTitle = document.getElementById('pageTitle');

// Page titles
const pageTitles = {
    'home': 'Dashboard',
    'attendance': 'My Attendance',
    'subjects': 'My Subjects',
    'cgpa': 'Academic Performance',
    'fee': 'Fee Management',
    'reports': 'My Reports',
    'teachers': 'Faculty Directory',
    'about': 'About System',
    'features': 'System Features',
    'settings': 'Settings',
    'profile': 'My Profile',
    'logout': 'Logout'
};

// Function to show specific page
function showPage(pageName) {
    console.log('Showing page:', pageName);
    
    // Hide all page contents
    const allPages = document.querySelectorAll('.page-content');
    console.log('Total pages found:', allPages.length);
    
    allPages.forEach(page => {
        page.classList.add('hidden');
    });
    
    // Show selected page
    const selectedPage = document.getElementById(pageName + '-content');
    console.log('Selected page element:', selectedPage);
    
    if (selectedPage) {
        selectedPage.classList.remove('hidden');
        console.log('Page should now be visible');
    } else {
        console.error('Page not found:', pageName + '-content');
    }
    
    // Update page title
    if (pageTitles[pageName]) {
        pageTitle.textContent = pageTitles[pageName];
    }
}

navItems.forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        
        const page = this.getAttribute('data-page');
        
        // Handle logout
        if (page === 'logout') {
            if (confirm('Are you sure you want to logout?')) {
                sessionStorage.removeItem('isLoggedIn');
                sessionStorage.removeItem('username');
                window.location.href = 'index.html';
            }
            return;
        }
        
        // Update active nav item
        navItems.forEach(nav => nav.classList.remove('active'));
        this.classList.add('active');
        
        // Show the selected page
        showPage(page);
        
        // Close sidebar on mobile after clicking
        if (window.innerWidth <= 768) {
            sidebar.classList.remove('active');
        }
    });
});

// Add animation to cards on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                entry.target.style.transition = 'all 0.5s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards
document.querySelectorAll('.card, .info-card, .feature-item').forEach(card => {
    observer.observe(card);
});

// Add hover effect to dashboard cards
const cards = document.querySelectorAll('.card');
cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Simulate real-time updates for dashboard values
function updateDashboardValues() {
    const cardValues = document.querySelectorAll('.card-value');
    
    setInterval(() => {
        cardValues.forEach((value, index) => {
            if (index === 0) { // Attendance percentage
                const currentValue = parseFloat(value.textContent);
                const newValue = (currentValue + (Math.random() - 0.5) * 0.2).toFixed(1);
                if (newValue >= 90 && newValue <= 100) {
                    value.textContent = newValue + '%';
                }
            }
        });
    }, 5000);
}

// Initialize real-time updates
updateDashboardValues();

// Add notification badge animation
const notifications = document.querySelectorAll('.info-badge.new');
notifications.forEach(badge => {
    setInterval(() => {
        badge.style.transform = 'scale(1.1)';
        setTimeout(() => {
            badge.style.transform = 'scale(1)';
        }, 200);
    }, 3000);
});

// Global Search Functionality
const globalSearch = document.getElementById('globalSearch');
globalSearch.addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    console.log('Searching for:', searchTerm);
    // Add your search logic here
});

// Attendance Page - Load Students Button
const loadAttendanceBtn = document.getElementById('loadAttendance');
if (loadAttendanceBtn) {
    loadAttendanceBtn.addEventListener('click', function() {
        alert('Loading students for the selected class and date...');
    });
}

// Attendance Mark Buttons
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn-small')) {
        const row = e.target.closest('tr');
        const badge = row.querySelector('.badge');
        
        if (e.target.classList.contains('btn-success')) {
            badge.textContent = 'Present';
            badge.className = 'badge badge-success';
        } else if (e.target.classList.contains('btn-danger')) {
            badge.textContent = 'Absent';
            badge.className = 'badge badge-danger';
        }
    }
});

// Report Generation
document.querySelectorAll('.report-category button').forEach(btn => {
    btn.addEventListener('click', function() {
        const reportType = this.closest('.report-category').querySelector('h3').textContent;
        alert(`Generating ${reportType}...`);
    });
});

// Export Buttons
document.querySelectorAll('.export-buttons button').forEach(btn => {
    btn.addEventListener('click', function() {
        const format = this.textContent.trim();
        alert(`Exporting report ${format}...`);
    });
});