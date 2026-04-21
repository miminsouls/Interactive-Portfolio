/* ─────────────────────────────────────────────
   Portfolio Script — María Zuluaga Soto
───────────────────────────────────────────── */

// ── Cursor glow ──
const glow = document.getElementById('cursorGlow');
document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
});

// ── Floating petals ──
const petalsContainer = document.getElementById('petals');
const petalColors = ['#f4a0b5', '#e8749a', '#ffd6e4', '#ffadc8', '#d4507d', '#f2c4d4'];

function createPetal() {
    const petal = document.createElement('div');
    petal.classList.add('petal');
    const size = Math.random() * 8 + 5;
    const left = Math.random() * 100;
    const dur = Math.random() * 12 + 10;
    const delay = Math.random() * 12;
    const color = petalColors[Math.floor(Math.random() * petalColors.length)];
    petal.style.cssText = `
    width: ${size}px;
    height: ${size}px;
    left: ${left}vw;
    background: ${color};
    animation-duration: ${dur}s;
    animation-delay: -${delay}s;
    border-radius: ${Math.random() > 0.5 ? '50% 0 50% 0' : '50%'};
    opacity: 0;
  `;
    petalsContainer.appendChild(petal);
    setTimeout(() => petal.remove(), (dur + delay) * 1000);
}

// Spawn petals gently
for (let i = 0; i < 20; i++) createPetal();
setInterval(createPetal, 1400);

// ── Scroll reveal ──
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            // Stagger children of same parent
            const siblings = entry.target.parentElement.querySelectorAll('.reveal:not(.visible)');
            let delay = 0;
            siblings.forEach((sib) => {
                if (sib === entry.target || entry.target.parentElement === sib.parentElement) {
                    sib.style.transitionDelay = delay + 'ms';
                    delay += 80;
                }
            });
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });
reveals.forEach(el => observer.observe(el));

// ── Language bars animation ──
const langObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.lang-fill').forEach(bar => {
                bar.classList.add('animated');
            });
            langObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.4 });
const langBars = document.querySelector('.languages-bar');
if (langBars) langObserver.observe(langBars);

// ── Sticky nav shadow on scroll ──
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
        nav.style.background = 'rgba(26,14,22,0.95)';
    } else {
        nav.style.background = 'rgba(26,14,22,0.7)';
    }
});

// ── Mobile burger menu ──
const burger = document.getElementById('navBurger');
const navLinks = document.querySelector('.nav-links');
burger.addEventListener('click', () => {
    const open = navLinks.style.display === 'flex';
    navLinks.style.display = open ? 'none' : 'flex';
    navLinks.style.flexDirection = 'column';
    navLinks.style.position = 'fixed';
    navLinks.style.top = '70px';
    navLinks.style.right = '0';
    navLinks.style.left = '0';
    navLinks.style.background = 'rgba(26,14,22,0.98)';
    navLinks.style.backdropFilter = 'blur(20px)';
    navLinks.style.padding = '24px';
    navLinks.style.gap = '24px';
    navLinks.style.zIndex = '99';
    navLinks.style.borderBottom = '1px solid rgba(255,200,220,0.12)';
});

// Close mobile menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth < 900) {
            navLinks.style.display = 'none';
        }
    });
});

// ── Smooth active nav highlight ──
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');
const activeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navItems.forEach(a => a.classList.remove('nav-active'));
            const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
            if (active) active.classList.add('nav-active');
        }
    });
}, { threshold: 0.45 });
sections.forEach(s => activeObserver.observe(s));

// ── Parallax hero orbs on mouse ──
const orbs = document.querySelectorAll('.hero-orb');
document.addEventListener('mousemove', (e) => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;
    orbs.forEach((orb, i) => {
        const factor = (i + 1) * 12;
        orb.style.transform = `translate(calc(-50% + ${dx * factor}px), calc(-50% + ${dy * factor}px))`;
    });
});

// ── Project card tilt effect ──
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `translateY(-6px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
        card.style.transition = 'transform 0.1s ease';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.transition = 'transform 0.4s ease, border-color 0.3s';
    });
});

// ── Skill tags hover sparkle ──
document.querySelectorAll('.sg-tags span, .pc-tools span').forEach(tag => {
    tag.addEventListener('mouseenter', () => {
        tag.style.transform = 'scale(1.08)';
        tag.style.borderColor = 'rgba(232,116,154,0.5)';
        tag.style.color = '#f284a8';
        tag.style.transition = 'all 0.2s ease';
    });
    tag.addEventListener('mouseleave', () => {
        tag.style.transform = '';
        tag.style.borderColor = '';
        tag.style.color = '';
    });
});

// ── Typed tagline effect ──
const tagline = document.querySelector('.hero-tagline');
if (tagline) {
    tagline.style.opacity = '1'; // ensure visible
}

console.log('🌸 Portfolio of María Zuluaga Soto — loaded');

// ── Video tab switcher (generic, scoped per card) ──
function switchVideo(frameId, videoId, btn) {
    const container = btn.closest('.pc-videos');
    container.querySelectorAll('.pv-tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    const frame = document.getElementById(frameId);
    if (frame) frame.src = `https://www.youtube.com/embed/${videoId}`;
}
