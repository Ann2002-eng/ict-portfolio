// Smooth scroll behavior for navigation links
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

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all skill cards and project cards
document.querySelectorAll('.skill-category, .project-card, .stat-card').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = 'var(--secondary-color)';
        } else {
            link.style.color = 'var(--text-light)';
        }
    });
});

// Parallax effect on hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrollPosition = window.pageYOffset;
        hero.style.backgroundPosition = `0 ${scrollPosition * 0.5}px`;
    }
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                const number = parseInt(text);
                if (!isNaN(number)) {
                    animateCounter(stat, number);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const aboutStats = document.querySelector('.about-stats');
if (aboutStats) {
    statsObserver.observe(aboutStats);
}

// Mobile menu toggle (if needed in future)
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) {
        navMenu.classList.toggle('active');
    }
}

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close any open menus
        document.querySelector('.nav-menu')?.classList.remove('active');
    }
});

// Add loading animation on page load
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Prevent layout shift by setting initial opacity
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease-out';

// Smooth page transitions
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '1';
});

// Hover effects on interactive elements
document.querySelectorAll('.btn, .contact-btn, .tag').forEach(element => {
    element.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
    });
    
    element.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Scroll to top button functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll to top on logo click
const logo = document.querySelector('.logo');
if (logo) {
    logo.addEventListener('click', scrollToTop);
    logo.style.cursor = 'pointer';
}

// Accessibility: Ensure all links are keyboard accessible
document.querySelectorAll('a, button').forEach(element => {
    element.addEventListener('focus', function() {
        this.style.outline = '2px solid var(--primary-color)';
        this.style.outlineOffset = '2px';
    });
    
    element.addEventListener('blur', function() {
        this.style.outline = 'none';
    });
});

// Modal functionality
function openProjectModal(element) {
    const modal = document.getElementById('projectModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalAchievements = document.getElementById('modalAchievements');
    const modalTags = document.getElementById('modalTags');

    // Get data from the project card
    const imageUrl = element.getAttribute('data-image');
    const title = element.querySelector('h3').textContent;
    const description = element.querySelector('p').textContent;
    const achievementsList = element.querySelectorAll('.project-list li');
    const tags = element.querySelectorAll('.tag');

    // Populate modal
    modalImage.src = imageUrl;
    modalTitle.textContent = title;
    modalDescription.textContent = description;

    // Add achievements
    let achievementsHTML = '<h3 style="margin-top: 1rem; color: var(--text-dark);">Key Achievements:</h3><ul>';
    achievementsList.forEach(item => {
        achievementsHTML += '<li>' + item.textContent + '</li>';
    });
    achievementsHTML += '</ul>';
    modalAchievements.innerHTML = achievementsHTML;

    // Add tags
    let tagsHTML = '';
    tags.forEach(tag => {
        tagsHTML += '<span class="tag">' + tag.textContent + '</span>';
    });
    modalTags.innerHTML = tagsHTML;

    // Show modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close modal functionality
const modal = document.getElementById('projectModal');
const closeBtn = document.querySelector('.close-modal');

if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
}

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

console.log('Portfolio loaded successfully! 🚀');
