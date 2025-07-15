// Navigation functionality for continuous scrolling with single sticky nav
document.addEventListener('DOMContentLoaded', function() {
    // Get navigation elements
    const navTabs = document.querySelectorAll('.nav-tab');
    const navIcons = document.querySelectorAll('.nav-icon');
    const sections = document.querySelectorAll('#about, #resume, #work');
    const mainNav = document.querySelector('#main-nav');
    
    // Function to get the currently active section based on scroll position
    function getCurrentSection() {
        const scrollPosition = window.scrollY + 200; // Add offset for better detection
        
        for (let i = sections.length - 1; i >= 0; i--) {
            const section = sections[i];
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                return section.id;
            }
        }
        
        // Default to first section if no match
        return 'about';
    }
    
    // Function to update active states in the single navigation bar
    function updateActiveStates(activeSection) {
        // Update navigation tabs
        navTabs.forEach(tab => {
            tab.classList.remove('active');
            if (tab.getAttribute('data-section') === activeSection) {
                tab.classList.add('active');
            }
        });
        
        // Update navigation icons
        navIcons.forEach((icon, index) => {
            icon.classList.remove('active');
            const sectionOrder = ['about', 'resume', 'work'];
            if (sectionOrder[index] === activeSection) {
                icon.classList.add('active');
            }
        });
    }
    
    // Function to scroll to a specific section
    function scrollToSection(sectionName) {
        const section = document.getElementById(sectionName);
        
        if (section) {
            // Calculate offset to account for sticky navigation
            const navHeight = mainNav ? mainNav.offsetHeight : 67;
            const sectionTop = section.offsetTop - navHeight - 20; // 20px buffer
            
            window.scrollTo({
                top: sectionTop,
                behavior: 'smooth'
            });
        }
    }
    
    // Add click event listeners to navigation tabs
    navTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const sectionName = this.getAttribute('data-section');
            scrollToSection(sectionName);
        });
    });
    
    // Add click event listeners to navigation icons
    navIcons.forEach((icon, index) => {
        icon.addEventListener('click', function() {
            const sectionOrder = ['about', 'resume', 'work'];
            const sectionName = sectionOrder[index];
            scrollToSection(sectionName);
        });
    });
    
    // See More button functionality
    const seeMoreIcon = document.querySelector('.see-more-icon');
    if (seeMoreIcon) {
        seeMoreIcon.addEventListener('click', function() {
            scrollToSection('about');
        });
    }
    
    // Scroll event listener to update active states
    let isScrolling = false;
    
    function handleScroll() {
        if (!isScrolling) {
            window.requestAnimationFrame(function() {
                const currentSection = getCurrentSection();
                updateActiveStates(currentSection);
                isScrolling = false;
            });
            isScrolling = true;
        }
    }
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Initial setup
    const initialSection = getCurrentSection();
    updateActiveStates(initialSection);
    
    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('.nav-tab, .nav-icon, .see-more-icon, .card-icon, .column-icon, .work-icon');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.opacity = '0.8';
            this.style.transition = 'opacity 0.2s ease';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.opacity = '1';
        });
    });
    
    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            const currentSection = getCurrentSection();
            const sectionOrder = ['about', 'resume', 'work'];
            const currentIndex = sectionOrder.indexOf(currentSection);
            
            let newIndex;
            if (e.key === 'ArrowUp') {
                newIndex = currentIndex > 0 ? currentIndex - 1 : sectionOrder.length - 1;
            } else {
                newIndex = currentIndex < sectionOrder.length - 1 ? currentIndex + 1 : 0;
            }
            
            const newSection = sectionOrder[newIndex];
            scrollToSection(newSection);
        }
    });
    
    // Add focus styles for accessibility
    const focusableElements = document.querySelectorAll('.nav-tab, .nav-icon, .see-more-icon, .card-icon, .column-icon, .work-icon');
    focusableElements.forEach(element => {
        element.setAttribute('tabindex', '0');
        
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #000';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
        
        // Add keyboard activation support
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Contact item click handlers
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.addEventListener('click', function() {
            const contactType = this.getAttribute('data-contact');
            const contactValue = this.getAttribute('data-value');
            
            if (contactType === 'email') {
                // Email
                window.location.href = `mailto:${contactValue}`;
            } else if (contactType === 'linkedin') {
                // LinkedIn
                window.open(`https://${contactValue}`, '_blank');
            } else if (contactType === 'instagram') {
                // Instagram
                window.open(`https://${contactValue}`, '_blank');
            }
        });
    });
    
    // Responsive navigation handling
    function handleResponsiveNav() {
        const nav = document.querySelector('.main-nav');
        const windowWidth = window.innerWidth;
        
        if (nav) {
            if (windowWidth <= 480) {
                nav.style.flexDirection = 'column';
                nav.style.gap = '16px';
            } else {
                nav.style.flexDirection = 'row';
                nav.style.gap = '0';
            }
        }
    }
    
    // Call on load and resize
    handleResponsiveNav();
    window.addEventListener('resize', handleResponsiveNav);
    
    // Add loading animation for images
    const images = document.querySelectorAll('.hero-gallery-content, .intro-video img, .intro-sticker img');
    images.forEach(img => {
        if (img.tagName === 'IMG') {
            img.addEventListener('load', function() {
                this.style.opacity = '0';
                this.style.transition = 'opacity 0.3s ease';
                setTimeout(() => {
                    this.style.opacity = '1';
                }, 100);
            });
        }
    });
    
    // Add scroll-based animation effects
    function animateOnScroll() {
        const cards = document.querySelectorAll('.experience-card, .education-card, .project-card, .contact-card, .about-card');
        
        cards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            const cardVisible = 150;
            
            if (cardTop < window.innerHeight - cardVisible) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Initialize card animations
    const cards = document.querySelectorAll('.experience-card, .education-card, .project-card, .contact-card, .about-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Run animation on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Run animation on load
    setTimeout(animateOnScroll, 100);
    
    // Initial animation on page load
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero-gallery-content, .see-more-content');
        heroElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 150);
        });
    }, 300);

    // Sticker animations
    function animateStickers() {
        const stickers = document.querySelectorAll('.sticker');
        
        stickers.forEach(sticker => {
            const delay = parseFloat(sticker.getAttribute('data-delay')) || 0;
            
            setTimeout(() => {
                sticker.classList.add('animate');
            }, delay * 1000);
        });
    }

    // Start sticker animations when hero gallery is in view
    const heroGallery = document.querySelector('.hero-gallery-content');
    if (heroGallery) {
        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        animateStickers();
                    }, 800); // Delay after hero container appears
                    heroObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.3 // Trigger when 30% of hero is visible
        });
        
        heroObserver.observe(heroGallery);
    }

    // Intro sticker animations
    function animateIntroStickers() {
        const introStickers = document.querySelectorAll('.intro-sticker');
        
        introStickers.forEach(sticker => {
            const delay = parseFloat(sticker.getAttribute('data-delay')) || 0;
            
            setTimeout(() => {
                sticker.classList.add('animate');
            }, delay * 1000);
        });
    }

    // Start intro sticker animations when intro section is in view
    const introVideo = document.querySelector('.intro-video');
    if (introVideo) {
        const introObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        animateIntroStickers();
                    }, 400); // Delay after intro container appears
                    introObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.3 // Trigger when 30% of intro is visible
        });
        
        introObserver.observe(introVideo);
    }
    
    // Add click tracking for analytics (if needed)
    document.addEventListener('click', function(e) {
        if (e.target.matches('.nav-tab, .nav-icon')) {
            const sectionName = e.target.getAttribute('data-section') || 
                               ['about', 'resume', 'work'][Array.from(navIcons).indexOf(e.target)];
            
            // Log navigation events (can be connected to analytics)
            console.log(`Navigation: ${sectionName} section viewed`);
        }
    });
    
    // Enhanced section detection with better accuracy
    function getActiveSection() {
        const scrollPosition = window.scrollY + window.innerHeight / 3;
        let activeSection = 'about';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                activeSection = section.id;
            }
        });
        
        return activeSection;
    }
    
    // Update scroll handler to use enhanced detection
    function enhancedScrollHandler() {
        if (!isScrolling) {
            window.requestAnimationFrame(function() {
                const currentSection = getActiveSection();
                updateActiveStates(currentSection);
                animateOnScroll();
                isScrolling = false;
            });
            isScrolling = true;
        }
    }
    
    // Replace the scroll event listener with enhanced version
    window.removeEventListener('scroll', handleScroll);
    window.addEventListener('scroll', enhancedScrollHandler);
    
    // Intersection Observer for even better performance
    const observerOptions = {
        root: null,
        rootMargin: '-30% 0px -30% 0px',
        threshold: 0.1
    };
    
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                if (sectionId) {
                    updateActiveStates(sectionId);
                }
            }
        });
    }, observerOptions);
    
    // Observe all sections
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}); 