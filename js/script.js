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

// ── Video tab switcher (handles both cover-state and live-iframe-state) ──
function switchVideo(frameId, videoId, btn) {
    var frame = document.getElementById(frameId);
    if (!frame) return;
    var container = frame.closest('.pc-videos');
    if (!container) return;
    container.querySelectorAll('.pv-tab').forEach(function(t) { t.classList.remove('active'); });
    var tab = btn.classList.contains('pv-tab') ? btn : btn.closest('.pv-tab');
    if (tab) tab.classList.add('active');
    if (frame.classList.contains('video-cover')) {
        // Not playing yet — swap thumbnail and store pending video
        frame.dataset.vid = videoId;
        var thumb = frame.querySelector('.video-thumb');
        if (thumb) thumb.src = 'https://img.youtube.com/vi/' + videoId + '/hqdefault.jpg';
    } else {
        // Iframe already loaded — just change src
        var iframe = frame.querySelector('iframe');
        if (iframe) iframe.src = 'https://www.youtube.com/embed/' + videoId;
    }
}

// ── Click-to-play: replace cover with autoplay iframe ──
function loadVideo(frame) {
    var vid = frame.dataset.vid;
    frame.classList.remove('video-cover');
    frame.innerHTML = '<iframe src="https://www.youtube.com/embed/' + vid +
        '?autoplay=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write;' +
        ' encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
}

// ── Project category filter ──
document.querySelectorAll('.filter-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.filter-btn').forEach(function(b) { b.classList.remove('active'); });
        this.classList.add('active');
        var filter = this.dataset.filter;
        document.querySelectorAll('.project-card').forEach(function(card) {
            var matches = filter === 'all' || card.dataset.category.includes(filter);
            if (matches) {
                card.style.display = '';
                requestAnimationFrame(function() {
                    card.style.opacity = '1';
                    card.style.transform = '';
                });
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(12px)';
                setTimeout(function() { card.style.display = 'none'; }, 260);
            }
        });
    });
});

// ── Animated stat counters ──
function animateCounter(el, target, isDecimal, suffix, duration) {
    var start = performance.now();
    function step(now) {
        var progress = Math.min((now - start) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        var val = eased * target;
        el.textContent = isDecimal ? val.toFixed(1) : Math.floor(val) + (progress >= 1 ? suffix : '');
        if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
}
var statObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (!entry.isIntersecting) return;
        var numEl = entry.target.querySelector('.stat-num');
        if (!numEl || numEl.dataset.animated) return;
        numEl.dataset.animated = 'true';
        var original = numEl.textContent.trim();
        var numMatch = original.match(/[\d.]+/);
        if (numMatch) {
            var isDecimal = original.includes('.');
            var target = parseFloat(numMatch[0]);
            var suffix = original.replace(/[\d.]+/, '');
            numEl.textContent = isDecimal ? '0.0' : '0';
            animateCounter(numEl, target, isDecimal, suffix, 1100);
        }
    });
}, { threshold: 0.6 });
document.querySelectorAll('.stat-card').forEach(function(c) { statObserver.observe(c); });
