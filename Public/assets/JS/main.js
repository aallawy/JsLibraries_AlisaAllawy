/* ========================================
   WANDERLUST EXPLORER - JAVASCRIPT
   Interactive functionality and library integrations
   ======================================== */

// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', function() {
    initializeGlideCarousel();
    initializeAOS();
    initializeCharts();
    initializeLeafletMap();
    setupMobileMenu();
    setupSmoothScroll();
});

// ========== 1. GLIDE.JS CAROUSEL INITIALIZATION ==========
/**
 * Initialize Glide.js carousel for destination cards
 * Features: Auto-play, keyboard navigation, touch support
 */
function initializeGlideCarousel() {
  const glide = new Glide('.glide', {
    type: 'carousel',     // ✅ this makes looping seamless
    startAt: 0,
    perView: 1,
    gap: 32,
    autoplay: 5000,
    hoverpause: true,
    animationDuration: 800,
    animationTimingFunc: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
    breakpoints: {
      1024: { perView: 2 },
      768: { perView: 1 }
    }
  });

  glide.mount();

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') glide.go('<');
    if (e.key === 'ArrowRight') glide.go('>');
  });

  console.log('✅ Carousel: true seamless loop (Glide carousel mode)');
}

// ========== 2. AOS (ANIMATE ON SCROLL) INITIALIZATION ==========
/**
 * Initialize AOS for scroll animations
 * Features: Fade, zoom, flip animations triggered on scroll
 */
function initializeAOS() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out-cubic',
        once: false,
        mirror: true,
        offset: 100,
        disable: 'phone'
    });

    // Refresh AOS on window resize
    window.addEventListener('resize', function() {
        AOS.refresh();
    });

    console.log('✅ AOS (Animate On Scroll) initialized successfully');
}

// ========== 3. CHART.JS INITIALIZATION ==========
/**
 * Initialize Chart.js with three different chart types
 * Charts: Bar chart, Doughnut chart, Line chart
 */
function initializeCharts() {
    // Chart 1: Most Visited Regions (Bar Chart)
    const visitCtx = document.getElementById('visitChart');
    if (visitCtx) {
        new Chart(visitCtx, {
            type: 'bar',
            data: {
                labels: ['Europe', 'Asia', 'Americas', 'Africa', 'Oceania'],
                datasets: [{
                    label: 'Visitor Count (Millions)',
                    data: [850, 920, 450, 280, 150],
                    backgroundColor: [
                        'rgba(102, 126, 234, 0.8)',
                        'rgba(245, 87, 108, 0.8)',
                        'rgba(118, 75, 162, 0.8)',
                        'rgba(74, 144, 226, 0.8)',
                        'rgba(255, 159, 64, 0.8)'
                    ],
                    borderColor: [
                        'rgb(102, 126, 234)',
                        'rgb(245, 87, 108)',
                        'rgb(118, 75, 162)',
                        'rgb(74, 144, 226)',
                        'rgb(255, 159, 64)'
                    ],
                    borderWidth: 2,
                    borderRadius: 8,
                    hoverBackgroundColor: [
                        'rgba(102, 126, 234, 1)',
                        'rgba(245, 87, 108, 1)',
                        'rgba(118, 75, 162, 1)',
                        'rgba(74, 144, 226, 1)',
                        'rgba(255, 159, 64, 1)'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        labels: {
                            font: { size: 12, weight: 'bold' },
                            padding: 15,
                            usePointStyle: true
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return value + 'M';
                            }
                        }
                    }
                }
            }
        });
    }

    // Chart 2: Travel Budget Breakdown (Doughnut Chart)
    const budgetCtx = document.getElementById('budgetChart');
    if (budgetCtx) {
        new Chart(budgetCtx, {
            type: 'doughnut',
            data: {
                labels: ['Accommodation', 'Food', 'Transportation', 'Activities', 'Shopping'],
                datasets: [{
                    data: [35, 20, 25, 15, 5],
                    backgroundColor: [
                        'rgba(102, 126, 234, 0.8)',
                        'rgba(245, 87, 108, 0.8)',
                        'rgba(118, 75, 162, 0.8)',
                        'rgba(74, 144, 226, 0.8)',
                        'rgba(255, 159, 64, 0.8)'
                    ],
                    borderColor: 'white',
                    borderWidth: 3,
                    hoverOffset: 10
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            font: { size: 12, weight: 'bold' },
                            padding: 15,
                            usePointStyle: true
                        }
                    }
                }
            }
        });
    }

    // Chart 3: Peak Travel Seasons (Line Chart)
    const seasonCtx = document.getElementById('seasonChart');
    if (seasonCtx) {
        new Chart(seasonCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: 'Travel Activity Index',
                    data: [65, 70, 75, 80, 85, 90, 95, 92, 88, 82, 75, 70],
                    borderColor: 'rgba(102, 126, 234, 1)',
                    backgroundColor: 'rgba(102, 126, 234, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: 'rgba(245, 87, 108, 1)',
                    pointBorderColor: 'white',
                    pointBorderWidth: 2,
                    pointRadius: 5,
                    pointHoverRadius: 7,
                    hoverBackgroundColor: 'rgba(245, 87, 108, 1)'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        labels: {
                            font: { size: 12, weight: 'bold' },
                            padding: 15
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                }
            }
        });
    }

    console.log('✅ Chart.js initialized with 3 charts successfully');
}

// ========== 4. LEAFLET.JS MAP INITIALIZATION ==========
/**
 * Initialize Leaflet.js interactive map
 * Features: Multiple markers, popups, map controls
 */
function initializeLeafletMap() {
    // Create map centered on world
    const map = L.map('map-container').setView([20, 0], 2);

    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
        minZoom: 2
    }).addTo(map);

    // Define destinations with coordinates
    const destinations = [
        {
            name: 'Paris, France',
            coords: [48.8566, 2.3522],
            description: 'The City of Light - Iconic landmarks and world-class museums',
            rating: '4.8/5',
            color: '#667eea'
        },
        {
            name: 'Tokyo, Japan',
            coords: [35.6762, 139.6503],
            description: 'Modern metropolis blending tradition and innovation',
            rating: '4.9/5',
            color: '#f5576c'
        },
        {
            name: 'Bali, Indonesia',
            coords: [-8.6705, 115.2126],
            description: 'Tropical paradise with beaches and ancient temples',
            rating: '4.7/5',
            color: '#4facfe'
        },
        {
            name: 'Barcelona, Spain',
            coords: [41.3851, 2.1734],
            description: 'Gothic architecture and Mediterranean beaches',
            rating: '4.6/5',
            color: '#fa709a'
        },
        {
            name: 'New Zealand',
            coords: [-40.9006, 174.8860],
            description: 'Adventure destination with stunning landscapes',
            rating: '4.9/5',
            color: '#a8edea'
        }
    ];

    // Create custom marker icons
    destinations.forEach(function(destination) {
        // Create a custom HTML icon
        const iconHtml = `
            <div style="
                background: ${destination.color};
                width: 40px;
                height: 40px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-weight: bold;
                font-size: 20px;
                box-shadow: 0 4px 6px rgba(0,0,0,0.3);
                border: 3px solid white;
            ">
                📍
            </div>
        `;

        const customIcon = L.divIcon({
            html: iconHtml,
            iconSize: [40, 40],
            iconAnchor: [20, 20],
            popupAnchor: [0, -20]
        });

        // Create marker with popup
        const marker = L.marker(destination.coords, { icon: customIcon })
            .bindPopup(`
                <div style="font-family: Arial; width: 200px;">
                    <h3 style="margin: 0 0 8px 0; color: ${destination.color};">${destination.name}</h3>
                    <p style="margin: 0 0 8px 0; font-size: 14px;">${destination.description}</p>
                    <p style="margin: 0; font-weight: bold; color: #f5576c;">Rating: ${destination.rating}</p>
                </div>
            `)
            .addTo(map);

        // Update destination info on marker click
        marker.on('click', function() {
            updateDestinationInfo(destination);
        });
    });

    // Add map controls
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Handle map responsiveness
    window.addEventListener('resize', function() {
        map.invalidateSize();
    });

    console.log('✅ Leaflet.js Map initialized with 5 destinations successfully');
}

/**
 * Update destination information display
 */
function updateDestinationInfo(destination) {
    const infoElement = document.getElementById('destination-info');
    infoElement.innerHTML = `
        <strong>${destination.name}</strong><br>
        ${destination.description}<br>
        <span style="color: #f5576c; font-weight: bold;">Rating: ${destination.rating}</span>
    `;
}

// ========== MOBILE MENU FUNCTIONALITY ==========
function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu   = document.querySelector('.nav-menu');

    if (!hamburger) return;

    hamburger.addEventListener('click', () => {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        hamburger.classList.toggle('active');
    });

    // close menu only when it's actually the mobile version
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 768) {           // ← only on phones/tablets
                navMenu.style.display = 'none';
                hamburger.classList.remove('active');
            }
        });
    });
}

// ========== SMOOTH SCROLL FUNCTIONALITY ==========
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Scroll to specific section
 */
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// ========== NEWSLETTER FORM HANDLER ==========
function handleNewsletterSubmit(event) {
    event.preventDefault();
    
    const email = event.target.querySelector('input[type="email"]').value;
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }

    // Simulate form submission
    const button = event.target.querySelector('.submit-button');
    const originalText = button.textContent;
    button.textContent = 'Subscribing...';
    button.disabled = true;

    setTimeout(function() {
        button.textContent = '✓ Subscribed!';
        event.target.reset();
        
        setTimeout(function() {
            button.textContent = originalText;
            button.disabled = false;
        }, 2000);
    }, 1500);

    console.log('Newsletter subscription:', email);
}

// ========== UTILITY FUNCTIONS ==========

/**
 * Debounce function for performance optimization
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function for performance optimization
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ========== PERFORMANCE MONITORING ==========
window.addEventListener('load', function() {
    // Log performance metrics
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log('📊 Page Load Time:', pageLoadTime + 'ms');
    console.log('✅ All libraries and features loaded successfully!');
});

// ========== ERROR HANDLING ==========
window.addEventListener('error', function(event) {
    console.error('❌ Error:', event.message);
});

// ========== CONSOLE MESSAGES ==========
console.log('%c🌍 Wanderlust Explorer', 'font-size: 20px; font-weight: bold; color: #667eea;');
console.log('%cPowered by 4 JavaScript Libraries:', 'font-size: 14px; font-weight: bold; color: #764ba2;');
console.log('%c1. Glide.js - Carousel & Slider', 'color: #667eea; font-weight: bold;');
console.log('%c2. AOS - Animate On Scroll', 'color: #f5576c; font-weight: bold;');
console.log('%c3. Chart.js - Data Visualization', 'color: #764ba2; font-weight: bold;');
console.log('%c4. Leaflet.js - Interactive Maps', 'color: #4facfe; font-weight: bold;');
