// Enhanced JavaScript for Wanderlust Adventures

(function($) {
    "use strict";

    // Spinner
    $('#spinner').addClass('show');
    setTimeout(function() {
        $('#spinner').removeClass('show');
    }, 1);

    // Theme toggle functionality
    function initThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        const themeIcon = document.getElementById('theme-icon');
        
        if (themeToggle && themeIcon) {
            themeToggle.addEventListener('click', function() {
                const html = document.documentElement;
                const currentTheme = html.getAttribute('data-theme');
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                
                html.setAttribute('data-theme', newTheme);
                themeIcon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
                
                // Save preference
                localStorage.setItem('theme', newTheme);
            });

            // Load saved theme
            const savedTheme = localStorage.getItem('theme') || 'light';
            document.documentElement.setAttribute('data-theme', savedTheme);
            themeIcon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }

    // Smooth scrolling for anchor links
    function initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
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

    // Hero search form
    function initHeroSearch() {
        const heroSearch = document.getElementById('hero-search');
        if (heroSearch) {
            heroSearch.addEventListener('submit', function(e) {
                e.preventDefault();
                // Add search functionality here
                alert('Поиск будет реализован в следующей версии!');
            });
        }
    }

    // Navbar scroll effect
    function initNavbarScrollEffect() {
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('header');
            if (navbar) {
                if (window.scrollY > 100) {
                    navbar.classList.add('navbar-scrolled');
                } else {
                    navbar.classList.remove('navbar-scrolled');
                }
            }
        });
    }

    // Back to top button
    function initBackToTop() {
        const backToTop = $('.back-to-top');
        
        $(window).scroll(function () {
            if ($(this).scrollTop() > 300) {
                backToTop.fadeIn('slow');
            } else {
                backToTop.fadeOut('slow');
            }
        });
        
        backToTop.click(function () {
            $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
            return false;
        });
    }

    // Intersection Observer for animations
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate__animated');
                    if (entry.target.classList.contains('animate-slideInUp')) {
                        entry.target.classList.add('animate__slideInUp');
                    }
                    if (entry.target.classList.contains('animate-slideInLeft')) {
                        entry.target.classList.add('animate__slideInLeft');
                    }
                    if (entry.target.classList.contains('animate-slideInRight')) {
                        entry.target.classList.add('animate__slideInRight');
                    }
                    if (entry.target.classList.contains('animate-fadeIn')) {
                        entry.target.classList.add('animate__fadeIn');
                    }
                }
            });
        }, observerOptions);

        // Observe all elements with animation classes
        document.querySelectorAll('.animate-slideInUp, .animate-slideInLeft, .animate-slideInRight, .animate-fadeIn').forEach(el => {
            observer.observe(el);
        });
    }

    // Counter animation
    function initCounters() {
        $('.counter').counterUp({
            delay: 10,
            time: 2000
        });
    }

    // Initialize everything when DOM is ready
    $(document).ready(function() {
        initThemeToggle();
        initSmoothScrolling();
        initHeroSearch();
        initNavbarScrollEffect();
        initBackToTop();
        initScrollAnimations();
        initCounters();

        // Initialize WOW.js for animations
        if (typeof WOW !== 'undefined') {
            new WOW().init();
        }

        // Initialize Owl Carousel if needed
        if ($('.owl-carousel').length > 0) {
            $('.owl-carousel').owlCarousel({
                autoplay: true,
                smartSpeed: 1000,
                center: false,
                dots: true,
                loop: true,
                margin: 25,
                nav: true,
                navText: [
                    '<i class="fas fa-angle-right"></i>',
                    '<i class="fas fa-angle-left"></i>'
                ],
                responsiveClass: true,
                responsive: {
                    0: {
                        items: 1
                    },
                    576: {
                        items: 1
                    },
                    768: {
                        items: 2
                    },
                    992: {
                        items: 3
                    },
                    1200: {
                        items: 4
                    }
                }
            });
        }
    });

    // Initialize when window loads
    $(window).on('load', function() {
        // Hide spinner
        $('#spinner').removeClass('show');
    });

})(jQuery);

// Vanilla JS enhancements
document.addEventListener('DOMContentLoaded', function() {
    // Add custom cursor effect
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Add parallax effect to hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            const heroImg = heroSection.querySelector('img');
            if (heroImg) {
                heroImg.style.transform = `translateY(${rate}px)`;
            }
        });
    }

    // Add typing effect to hero title
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Apply typing effect to main heading
    const heroTitle = document.querySelector('.hero-section h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 50);
        }, 1000);
    }
});

// Service Worker registration for PWA capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}
