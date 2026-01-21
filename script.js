// Portfolio JavaScript - Enhanced with all features
document.addEventListener('DOMContentLoaded', function() {
    // Initialize loading screen
    initLoadingScreen();
    
    // Initialize theme toggle
    initThemeToggle();
    
    // Initialize navigation
    initNavigation();
    
    // Initialize typing animation
    initTypingAnimation();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize projects section
    initProjectsSection();
    
    // Initialize skills section
    initSkillsSection();
    
    // Initialize contact form
    initContactForm();
    
    // Initialize back to top button
    initBackToTop();
    
    // Initialize smooth scrolling
    initSmoothScrolling();
    
    // Initialize floating shapes animation
    initFloatingShapes();
    
    // Initialize tooltips
    initTooltips();
});

// Loading Screen
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    
    if (!loadingScreen) return;
    
    // Simulate loading
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        
        // Remove loading screen from DOM after animation
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 1500); // Reduced from 2000ms for better UX
}

// Theme Toggle
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check for saved theme or prefer color scheme
    const currentTheme = localStorage.getItem('theme') || 
                        (prefersDarkScheme.matches ? 'dark' : 'light');
    
    // Apply theme
    if (currentTheme === 'light') {
        document.body.classList.add('light-mode');
    }
    
    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        
        // Save theme preference
        const theme = document.body.classList.contains('light-mode') ? 'light' : 'dark';
        localStorage.setItem('theme', theme);
        
        // Update button icon animation
        updateThemeIcon();
    });
    
    // Update theme icon based on current theme
    function updateThemeIcon() {
        const icons = themeToggle.querySelectorAll('i');
        icons.forEach(icon => {
            icon.style.transform = 'rotate(360deg)';
            setTimeout(() => {
                icon.style.transform = 'rotate(0deg)';
            }, 300);
        });
    }
    
    // Listen for system theme changes
    prefersDarkScheme.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                document.body.classList.remove('light-mode');
            } else {
                document.body.classList.add('light-mode');
            }
        }
    });
}

// Navigation
function initNavigation() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!menuToggle || !navMenu) return;
    
    // Toggle mobile menu
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.querySelector('i').classList.toggle('fa-bars');
        menuToggle.querySelector('i').classList.toggle('fa-times');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.querySelector('i').classList.add('fa-bars');
            menuToggle.querySelector('i').classList.remove('fa-times');
            document.body.style.overflow = '';
            
            // Update active link
            updateActiveLink(link);
        });
    });
    
    // Update active link on scroll with throttling
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) clearTimeout(scrollTimeout);
        
        scrollTimeout = setTimeout(() => {
            const sections = document.querySelectorAll('section');
            const scrollPos = window.scrollY + 100;
            
            let currentSection = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    currentSection = sectionId;
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                const href = link.getAttribute('href');
                if (href === `#${currentSection}`) {
                    link.classList.add('active');
                }
            });
        }, 100);
    });
    
    // Update active link
    function updateActiveLink(clickedLink) {
        navLinks.forEach(link => link.classList.remove('active'));
        clickedLink.classList.add('active');
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !menuToggle.contains(e.target) && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            menuToggle.querySelector('i').classList.add('fa-bars');
            menuToggle.querySelector('i').classList.remove('fa-times');
            document.body.style.overflow = '';
        }
    });
}

// Typing Animation
function initTypingAnimation() {
    const typingText = document.getElementById('typingText');
    if (!typingText) return;
    
    const roles = [
        "Full Stack Developer",
        "Ethical Hacker",
        "Cybersecurity Enthusiast",
        "Open Source Contributor",
        "Tech Student"
    ];
    
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isWaiting = false;
    let typingTimeout;
    
    function type() {
        if (isWaiting) return;
        
        const currentRole = roles[roleIndex];
        
        if (!isDeleting && charIndex <= currentRole.length) {
            typingText.textContent = currentRole.substring(0, charIndex);
            charIndex++;
            
            if (charIndex === currentRole.length + 1) {
                isWaiting = true;
                typingTimeout = setTimeout(() => {
                    isWaiting = false;
                    isDeleting = true;
                    type();
                }, 2000);
                return;
            }
        }
        
        if (isDeleting && charIndex >= 0) {
            typingText.textContent = currentRole.substring(0, charIndex);
            charIndex--;
            
            if (charIndex === -1) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
            }
        }
        
        const typingSpeed = isDeleting ? 50 : 100;
        const randomSpeed = Math.random() * 50 + typingSpeed; // Add natural variation
        
        clearTimeout(typingTimeout);
        typingTimeout = setTimeout(type, randomSpeed);
    }
    
    // Start typing animation
    setTimeout(type, 1000);
    
    // Pause animation when tab is not visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            clearTimeout(typingTimeout);
        } else {
            type();
        }
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Animate skill bars if element is a skill item
                if (entry.target.classList.contains('skill-item')) {
                    const levelBar = entry.target.querySelector('.level-bar');
                    if (levelBar) {
                        const level = levelBar.getAttribute('data-level');
                        setTimeout(() => {
                            levelBar.style.width = `${level}%`;
                        }, 300);
                    }
                }
                
                // Unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all elements with animation classes
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
    
    // Add animation class to sections on scroll
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-animate');
            }
        });
    }, { threshold: 0.2 });
    
    document.querySelectorAll('section').forEach(section => {
        sectionObserver.observe(section);
    });
}

// Projects Section
function initProjectsSection() {
    const projectsGrid = document.querySelector('.projects-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    if (!projectsGrid) return;
    
    const projects = [
        {
            id: 1,
            category: 'web',
            title: 'Library Management System',
            description: 'Full-stack web application for library management with PHP and MySQL.',
            tech: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
            image: 'Project logo/library 1.jpg',
            github: 'https://github.com/aayushparekh27/Library-Management-System',
            live: '#'
        },
        {
            id: 2,
            category: 'c',
            title: 'Student Management in C',
            description: 'Console-based student record management system using C programming.',
            tech: ['C'],
            image: 'Project logo/student 1.jpg',
            github: 'https://github.com/aayushparekh27/Student-Managment-System-Using-C-',
            live: '#'
        },
        {
            id: 3,
            category: 'web',
            title: 'Student Management Web',
            description: 'Web-based student management system with database integration.',
            tech: ['HTML', 'CSS', 'PHP', 'MySQL'],
            image: 'Project logo/student 2.jpg',
            github: 'https://github.com/aayushparekh27/Student-Management-System-With-Data-Base-and-UI-',
            live: '#'
        },
        {
            id: 4,
            category: 'web',
            title: 'To-Do List App',
            description: 'Interactive to-do list application with local storage support.',
            tech: ['HTML', 'CSS', 'JavaScript'],
            image: 'Project logo/to do.jpg',
            github: 'https://github.com/aayushparekh27/To-Do-List',
            live: '#'
        },
        {
            id: 5,
            category: 'c',
            title: 'Marksheet in C',
            description: 'Student marksheet generator with file handling capabilities.',
            tech: ['C'],
            image: 'Project logo/marksheet.jpg',
            github: 'https://github.com/aayushparekh27/Student-Marksheet-Generator-Using-C-',
            live: '#'
        },
        {
            id: 6,
            category: 'python',
            title: 'Phone Validator',
            description: 'Python tool for validating and formatting phone numbers.',
            tech: ['Python'],
            image: 'Project logo/phone.jpg',
            github: 'https://github.com/aayushparekh27/phone-number-validator',
            live: '#'
        }
    ];
    
    // Handle image errors
    function handleImageError(img) {
        img.src = 'https://via.placeholder.com/400x200/1e293b/94a3b8?text=Project+Image';
        img.alt = 'Project image not available';
    }
    
    // Render projects
    function renderProjects(filter = 'all') {
        projectsGrid.innerHTML = '';
        
        const filteredProjects = filter === 'all' 
            ? projects 
            : projects.filter(proj => proj.category === filter);
        
        if (filteredProjects.length === 0) {
            projectsGrid.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <p>No projects found in this category</p>
                </div>
            `;
            return;
        }
        
        filteredProjects.forEach(proj => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card animate-on-scroll';
            projectCard.innerHTML = `
                <div class="project-image">
                    <img src="${proj.image}" alt="${proj.title}" loading="lazy" 
                         onerror="this.onerror=null; this.src='https://via.placeholder.com/400x200/1e293b/94a3b8?text=Project+Image'">
                    <div class="project-overlay">
                        <a href="${proj.github}" target="_blank" class="project-link">
                            <i class="fab fa-github"></i> View Code
                        </a>
                    </div>
                </div>
                <div class="project-content">
                    <h3 class="project-title">${proj.title}</h3>
                    <p class="project-description">${proj.description}</p>
                    <div class="project-tech">
                        ${proj.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                    <div class="project-links">
                        <a href="${proj.github}" target="_blank" class="project-link" aria-label="View code on GitHub">
                            <i class="fab fa-github"></i> Code
                        </a>
                        ${proj.live !== '#' ? `<a href="${proj.live}" target="_blank" class="project-link" aria-label="View live demo">
                            <i class="fas fa-external-link-alt"></i> Live Demo
                        </a>` : ''}
                    </div>
                </div>
            `;
            
            projectsGrid.appendChild(projectCard);
        });
        
        // Re-initialize scroll animations for new elements
        setTimeout(() => {
            initScrollAnimations();
        }, 100);
    }
    
    // Initial render
    renderProjects();
    
    // Filter projects
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active filter
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter projects
            const filter = button.getAttribute('data-filter');
            renderProjects(filter);
            
            // Scroll to section if on mobile
            if (window.innerWidth < 768) {
                const section = document.getElementById('projects');
                if (section) {
                    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });
}

// Skills Section - UPDATED
function initSkillsSection() {
    const skillsGrid = document.querySelector('.skills-grid');
    const toolsGrid = document.querySelector('.tools-grid');
    
    if (!skillsGrid || !toolsGrid) return;
    
    const skills = [
        { name: 'Java', level: 85, icon: 'fab fa-java', color: '#007396' },
        { name: 'C', level: 80, icon: 'fas fa-c', color: '#A8B9CC' },
        { name: 'C++', level: 75, icon: 'fas fa-c', color: '#00599C' },
        { name: 'Python', level: 70, icon: 'fab fa-python', color: '#3776AB' },
        { name: 'JavaScript', level: 75, icon: 'fab fa-js-square', color: '#F7DF1E' },
        { name: 'HTML', level: 90, icon: 'fab fa-html5', color: '#E34F26' },
        { name: 'CSS', level: 85, icon: 'fab fa-css3-alt', color: '#1572B6' },
        { name: 'SQL', level: 70, icon: 'fas fa-database', color: '#4479A1' },
        { name: 'PHP', level: 65, icon: 'fab fa-php', color: '#777BB4' },
        { name: 'Shell', level: 65, icon: 'fas fa-terminal', color: '#4EAA25' },
        { name: 'React JS', level: 70, icon: 'fab fa-react', color: '#61DAFB' },
        { name: 'Node JS', level: 68, icon: 'fab fa-node-js', color: '#339933' },
        { name: 'EJS', level: 72, icon: 'fas fa-code', color: '#A91E50' }
    ];
    
    const tools = [
        { name: 'Git', icon: 'fab fa-git-alt', color: '#F05032' },
        { name: 'GitHub', icon: 'fab fa-github', color: '#181717' },
        { name: 'VS Code', icon: 'fas fa-code', color: '#007ACC' },
        { name: 'MySQL', icon: 'fas fa-database', color: '#4479A1' },
        { name: 'Firebase', icon: 'fas fa-fire', color: '#FFCA28' },
        { name: 'Google Cloud', icon: 'fab fa-google', color: '#4285F4' },
        { name: 'Docker', icon: 'fab fa-docker', color: '#2496ED' },
        { name: 'Linux', icon: 'fab fa-linux', color: '#FCC624' },
        { name: 'Kali Linux', icon: 'fas fa-shield-alt', color: '#557C94' },
        { name: 'Burp Suite', icon: 'fas fa-bug', color: '#FF6B35' },
        { name: 'Wireshark', icon: 'fas fa-network-wired', color: '#1679C7' },
        { name: 'Metasploit', icon: 'fas fa-crosshairs', color: '#8B0000' },
        { name: 'Nmap', icon: 'fas fa-search', color: '#4B8BBE' },
        { name: 'John the Ripper', icon: 'fas fa-key', color: '#FF4500' }
    ];
    
    // Render skills
    skills.forEach(skill => {
        const skillItem = document.createElement('div');
        skillItem.className = 'skill-item animate-on-scroll';
        skillItem.innerHTML = `
            <div class="skill-icon" style="color: ${skill.color}">
                <i class="${skill.icon}"></i>
            </div>
            <span class="skill-name">${skill.name}</span>
            <div class="skill-level">
                <div class="level-bar" data-level="${skill.level}" style="background: linear-gradient(90deg, ${skill.color}, ${skill.color}80)"></div>
            </div>
        `;
        skillsGrid.appendChild(skillItem);
    });
    
    // Render tools
    tools.forEach(tool => {
        const toolItem = document.createElement('div');
        toolItem.className = 'tool-item animate-on-scroll';
        toolItem.innerHTML = `
            <div class="tool-icon" style="color: ${tool.color}">
                <i class="${tool.icon}"></i>
            </div>
            <span class="tool-name">${tool.name}</span>
        `;
        toolsGrid.appendChild(toolItem);
    });
}

// Contact Form - Updated for Formspree
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    // Set up reply-to field
    const emailInput = document.getElementById('email');
    const replyToField = document.getElementById('reply-to-email');
    
    if (emailInput && replyToField) {
        emailInput.addEventListener('input', function() {
            replyToField.value = this.value;
        });
    }
    
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('.btn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoader = submitBtn.querySelector('.btn-loader');
        
        // Validate form
        if (!validateForm()) {
            showNotification('Please fill all required fields correctly', 'error');
            return;
        }
        
        // Show loading state
        submitBtn.classList.add('loading');
        
        // Get form data
        const formData = new FormData(this);
        
        try {
            // Send to Formspree
            const response = await fetch('https://formspree.io/f/xovpegdb', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Show success message
                showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                
                // Reset form
                contactForm.reset();
                
                // Reset form labels
                document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
                    input.classList.remove('valid');
                });
                
                // Reset reply-to field
                if (replyToField) {
                    replyToField.value = '';
                }
            } else {
                // Try to get error details
                const errorData = await response.json();
                console.error('Formspree error:', errorData);
                throw new Error(errorData.error || 'Form submission failed');
            }
            
        } catch (error) {
            console.error('Form submission error:', error);
            showNotification('Failed to send message. Please try again or email me directly.', 'error');
        } finally {
            // Hide loading state
            submitBtn.classList.remove('loading');
        }
    });
    
    // Form validation
    function validateForm() {
        let isValid = true;
        const formInputs = document.querySelectorAll('.form-group input[required], .form-group textarea[required]');
        
        formInputs.forEach(input => {
            if (input.value.trim() === '') {
                input.classList.add('invalid');
                isValid = false;
            } else {
                input.classList.remove('invalid');
                input.classList.add('valid');
            }
            
            // Email validation
            if (input.type === 'email' && input.value.trim() !== '') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(input.value.trim())) {
                    input.classList.add('invalid');
                    isValid = false;
                }
            }
        });
        
        return isValid;
    }
    
    // Real-time validation
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    formInputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (input.value.trim() === '') {
                input.classList.add('invalid');
                input.classList.remove('valid');
            } else {
                input.classList.remove('invalid');
                input.classList.add('valid');
            }
        });
        
        input.addEventListener('input', () => {
            if (input.value.trim() !== '') {
                input.classList.remove('invalid');
                input.classList.add('valid');
            } else {
                input.classList.remove('valid');
            }
        });
    });
    
    // Show notification
    function showNotification(message, type = 'success') {
        // Remove existing notifications
        document.querySelectorAll('.notification').forEach(n => n.remove());
        
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.setAttribute('role', 'alert');
        notification.setAttribute('aria-live', 'assertive');
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 3000);
        
        // Close on click
        notification.addEventListener('click', () => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        });
    }
}

// Back to Top Button
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    if (!backToTop) return;
    
    let scrollTimeout;
    
    window.addEventListener('scroll', () => {
        if (scrollTimeout) clearTimeout(scrollTimeout);
        
        scrollTimeout = setTimeout(() => {
            if (window.scrollY > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }, 100);
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Add click feedback
        backToTop.style.transform = 'scale(0.9)';
        setTimeout(() => {
            backToTop.style.transform = '';
        }, 150);
    });
}

// Smooth Scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.navbar')?.offsetHeight || 70;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without page reload
                history.pushState(null, null, targetId);
            }
        });
    });
}

// Floating Shapes Animation
function initFloatingShapes() {
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach(shape => {
        // Add random animation variations
        const randomDelay = Math.random() * 5;
        const randomDuration = 6 + Math.random() * 4;
        const randomOpacity = 0.5 + Math.random() * 0.3;
        
        shape.style.animationDelay = `${randomDelay}s`;
        shape.style.animationDuration = `${randomDuration}s`;
        shape.style.opacity = randomOpacity;
    });
}

// Tooltips
function initTooltips() {
    const elementsWithTooltip = document.querySelectorAll('[data-tooltip]');
    
    elementsWithTooltip.forEach(element => {
        element.addEventListener('mouseenter', (e) => {
            const tooltipText = element.getAttribute('data-tooltip');
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = tooltipText;
            tooltip.setAttribute('role', 'tooltip');
            
            document.body.appendChild(tooltip);
            
            // Position tooltip
            const rect = element.getBoundingClientRect();
            const tooltipWidth = tooltip.offsetWidth;
            const tooltipHeight = tooltip.offsetHeight;
            
            let left = rect.left + rect.width / 2 - tooltipWidth / 2;
            let top = rect.top - tooltipHeight - 10;
            
            // Keep tooltip within viewport
            left = Math.max(10, Math.min(left, window.innerWidth - tooltipWidth - 10));
            top = Math.max(10, top);
            
            tooltip.style.left = `${left}px`;
            tooltip.style.top = `${top}px`;
            
            element.tooltip = tooltip;
            
            // Show tooltip
            setTimeout(() => {
                tooltip.style.opacity = '1';
                tooltip.style.transform = 'translateY(0)';
            }, 10);
        });
        
        element.addEventListener('mouseleave', () => {
            if (element.tooltip) {
                element.tooltip.style.opacity = '0';
                element.tooltip.style.transform = 'translateY(10px)';
                
                setTimeout(() => {
                    if (element.tooltip && element.tooltip.parentNode) {
                        element.tooltip.remove();
                    }
                    element.tooltip = null;
                }, 300);
            }
        });
        
        // Also handle focus for accessibility
        element.addEventListener('focus', (e) => {
            element.dispatchEvent(new Event('mouseenter'));
        });
        
        element.addEventListener('blur', (e) => {
            element.dispatchEvent(new Event('mouseleave'));
        });
    });
}

// Add CSS for tooltips and notifications (if not already in style.css)
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
    .tooltip {
        position: fixed;
        background: var(--dark-card);
        color: var(--dark-text);
        padding: 0.5rem 1rem;
        border-radius: var(--border-radius);
        font-size: 0.9rem;
        z-index: 1000;
        box-shadow: var(--shadow-lg);
        pointer-events: none;
        opacity: 0;
        transform: translateY(10px);
        transition: opacity 0.3s, transform 0.3s;
        border: 1px solid rgba(99, 102, 241, 0.2);
        max-width: 200px;
        text-align: center;
        white-space: nowrap;
    }
    
    .tooltip::after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 50%;
        transform: translateX(-50%);
        border-width: 5px 5px 0;
        border-style: solid;
        border-color: var(--dark-card) transparent transparent transparent;
    }
    
    .light-mode .tooltip {
        background: var(--light-card);
        color: var(--light-text);
    }
    
    .light-mode .tooltip::after {
        border-color: var(--light-card) transparent transparent transparent;
    }
    
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: var(--dark-card);
        color: var(--dark-text);
        border-radius: var(--border-radius);
        display: flex;
        align-items: center;
        gap: 0.75rem;
        box-shadow: var(--shadow-lg);
        z-index: 1000;
        transform: translateX(100%);
        opacity: 0;
        transition: transform 0.3s, opacity 0.3s;
        border-left: 4px solid var(--primary-color);
        cursor: pointer;
        max-width: 350px;
    }
    
    .notification.show {
        transform: translateX(0);
        opacity: 1;
    }
    
    .notification.success {
        border-left-color: var(--success);
    }
    
    .notification.error {
        border-left-color: var(--danger);
    }
    
    .notification i {
        font-size: 1.2rem;
    }
    
    .notification.success i {
        color: var(--success);
    }
    
    .notification.error i {
        color: var(--danger);
    }
    
    .light-mode .notification {
        background: var(--light-card);
        color: var(--light-text);
    }
    
    .invalid {
        border-bottom-color: var(--danger) !important;
    }
    
    .valid {
        border-bottom-color: var(--success) !important;
    }
    
    .no-results {
        grid-column: 1 / -1;
        text-align: center;
        padding: 3rem;
        color: var(--dark-muted);
    }
    
    .no-results i {
        font-size: 3rem;
        margin-bottom: 1rem;
        opacity: 0.5;
    }
    
    .light-mode .no-results {
        color: var(--light-muted);
    }
    
    .section-animate {
        animation: fadeInUp 0.8s ease-out forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .animate {
        animation: fadeIn 0.6s ease-out forwards;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;

// Only add if not already in style.css
if (!document.querySelector('style[data-dynamic-styles]')) {
    dynamicStyles.setAttribute('data-dynamic-styles', 'true');
    document.head.appendChild(dynamicStyles);
}

// Add performance optimizations
window.addEventListener('load', () => {
    // Lazy load images
    const images = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Preload important resources
    const preloadLinks = [
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
        'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Roboto+Mono:wght@300;400;500&display=swap'
    ];
    
    preloadLinks.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = href;
        document.head.appendChild(link);
    });
});

// Add error handling for missing elements
window.addEventListener('error', (e) => {
    console.error('Error:', e.message);
});

// Export functions for debugging
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initLoadingScreen,
        initThemeToggle,
        initNavigation,
        initTypingAnimation,
        initScrollAnimations,
        initProjectsSection,
        initSkillsSection,
        initContactForm,
        initBackToTop,
        initSmoothScrolling,
        initFloatingShapes,
        initTooltips
    };
}