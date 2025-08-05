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
    const interactiveElements = document.querySelectorAll('.nav-tab, .nav-icon, .see-more-icon, .back-to-top-icon, .card-icon, .column-icon, .work-icon');
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
    const focusableElements = document.querySelectorAll('.nav-tab, .nav-icon, .see-more-icon, .back-to-top-icon, .card-icon, .column-icon, .work-icon');
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
                window.location.href = `https://${contactValue}`;
            } else if (contactType === 'instagram') {
                // Instagram
                window.location.href = `https://${contactValue}`;
            }
        });
    });
    
    // Intro clickable section is handled by inline onclick handler in HTML
    
    // Skill clickable section handlers - Navigate to skills page with specific sections
    const skillClickableSections = document.querySelectorAll('.skill-clickable-section');
    skillClickableSections.forEach(section => {
        section.addEventListener('click', function() {
            const skillSection = this.getAttribute('data-page');
            if (skillSection) {
                // Navigate to skills page with section anchor
                window.location.href = `skills.html#${skillSection}`;
            }
        });
    });
    
    // Project clickable sections are handled by inline onclick handlers in HTML
    
    // Back to Top functionality
    const backToTopIcon = document.querySelector('.back-to-top-icon');
    if (backToTopIcon) {
        backToTopIcon.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
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
    
    // Project sticker animations
    function animateProjectStickers() {
        const projectStickers = document.querySelectorAll('.project-sticker');
        
        projectStickers.forEach((sticker, index) => {
            const delay = index * 200; // Staggered animation
            
            setTimeout(() => {
                sticker.classList.add('animate');
            }, delay);
        });
    }

    // Start project sticker animations when work section is in view
    const workSection = document.querySelector('.work-section');
    if (workSection) {
        const workObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        animateProjectStickers();
                    }, 400); // Delay after work section appears
                    workObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.3 // Trigger when 30% of work section is visible
        });
        
        workObserver.observe(workSection);
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

// Project Authentication System
class ProjectAuth {
    constructor() {
        this.password = 'Magic';
        this.storageKey = 'portfolio_project_access';
        this.protectedProjects = [
            'integrations-chatgpt-claude.html',
            'smart-devops-experiences-jira.html',
            'bitbucket-pipelines-experience-vision.html',
            'multi-platform-bitbucket-pipelines-runners.html'
        ];
        this.createModal();
    }

    // Check if user has access
    hasAccess() {
        return sessionStorage.getItem(this.storageKey) === 'true';
    }

    // Grant access
    grantAccess() {
        sessionStorage.setItem(this.storageKey, 'true');
    }

    // Check if URL is a protected project
    isProtectedProject(url) {
        return this.protectedProjects.some(project => url.includes(project));
    }

    // Create the authentication modal
    createModal() {
        if (document.getElementById('auth-modal')) return; // Already exists

        const modal = document.createElement('div');
        modal.id = 'auth-modal';
        modal.className = 'auth-modal';
        modal.innerHTML = `
            <div class="auth-modal-backdrop"></div>
            <div class="auth-modal-content">
                <div class="auth-modal-header">
                    <h3>Project Access</h3>
                </div>
                <div class="auth-modal-body">
                    <p>Please enter the password to access featured projects:</p>
                    <input type="password" id="auth-password" placeholder="Enter password" autocomplete="off">
                    <div id="auth-error" class="auth-error" style="display: none;">Incorrect password. Please try again.</div>
                </div>
                <div class="auth-modal-footer">
                    <button id="auth-submit" class="auth-submit-btn">Access Projects</button>
                    <button id="auth-cancel" class="auth-cancel-btn">Cancel</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        this.bindModalEvents();
    }

    // Bind modal events
    bindModalEvents() {
        const modal = document.getElementById('auth-modal');
        const passwordInput = document.getElementById('auth-password');
        const submitBtn = document.getElementById('auth-submit');
        const cancelBtn = document.getElementById('auth-cancel');
        const errorDiv = document.getElementById('auth-error');

        // Submit password
        const submitPassword = () => {
            const enteredPassword = passwordInput.value.trim();
            if (enteredPassword.toLowerCase() === this.password.toLowerCase()) {
                this.grantAccess();
                const targetUrl = this.pendingNavigation;
                this.hideModal();
                if (targetUrl) {
                    window.location.href = targetUrl;
                }
            } else {
                errorDiv.style.display = 'block';
                passwordInput.value = '';
                passwordInput.focus();
            }
        };

        submitBtn.addEventListener('click', submitPassword);
        
        passwordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                submitPassword();
            }
        });

        cancelBtn.addEventListener('click', () => {
            this.hideModal();
        });

        // Close modal when clicking backdrop
        modal.querySelector('.auth-modal-backdrop').addEventListener('click', () => {
            this.hideModal();
        });
    }

    // Show modal
    showModal(targetUrl = null) {
        this.pendingNavigation = targetUrl;
        const modal = document.getElementById('auth-modal');
        const passwordInput = document.getElementById('auth-password');
        const errorDiv = document.getElementById('auth-error');
        
        modal.style.display = 'flex';
        errorDiv.style.display = 'none';
        passwordInput.value = '';
        passwordInput.focus();
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }

    // Hide modal
    hideModal() {
        const modal = document.getElementById('auth-modal');
        modal.style.display = 'none';
        document.body.style.overflow = '';
        this.pendingNavigation = null;
    }

    // Check access and navigate
    checkAndNavigate(url) {
        if (this.hasAccess()) {
            window.location.href = url;
        } else {
            this.showModal(url);
        }
    }
}

// Initialize authentication system
window.projectAuth = new ProjectAuth(); 