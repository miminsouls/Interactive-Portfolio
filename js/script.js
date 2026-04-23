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


// ── Language switcher ──
var translations = {
  en: {
    'nav-about':'About','nav-projects':'Projects','nav-films':'Films','nav-skills':'Skills','nav-cta':'Say Hello',
    'hero-badge':'Open to internships · 2nd Sem 2026',
    'hero-eyebrow':'Interactive Designer · 3D Animator · Game Developer · QA-minded',
    'hero-tagline':'I make games — from concept to player,<br />I make sure <em>nothing breaks.</em>',
    'tag-ux':'UX Research','tag-qa':'QA Testing',
    'hero-see':'See my work','hero-touch':'Get in touch',
    'hc-lang-en':'English · C1','hc-lang-es':'Spanish · Native',
    'about-label':'⋆ About me',
    'about-h2':'Still learning.<br /><em>Always paying attention.</em>',
    'about-p1':"I'm an Interactive Design student at EAFIT focused on building games and interactive experiences in Unity — across WebGL, mobile, and VR (Meta Quest).",
    'about-p2':'I work on level design, interaction systems, and full implementation, paying close attention to how things behave, feel, and perform before they reach the player.',
    'about-p3':'I combine technical development (Unity, C#) with UX research (qualitative and quantitative methods), and I also work in 3D animation and audiovisual production.',
    'about-p4':"I'm especially interested in game development, QA, and interactive design roles where I can build, test, and refine real player experiences.",
    'about-quote':'"Curiosity is the best debugging tool."',
    'stat-projects':'Projects delivered','stat-gpa':'GPA / 5.0','stat-english':'English level','stat-year':'Year at EAFIT',
    'proj-label':'⋆ Selected work','proj-title':'Projects',
    'proj-sub':'Games, VR, 3D animation, audiovisual production, and interactive apps — built with intention.',
    'filter-all':'All','filter-animation':'Animation',
    'lab-badge':'2026 · Featured','lab-type':'3D Unity Game · WebGL',
    'lab-desc':'A 3D labyrinth game built end-to-end in Unity. I owned level design, player interactions, the tutorial system, and delivered the full WebGL build.',
    'lab-b1':'Level design & environment layout','lab-b2':'Player interaction systems with objects & obstacles','lab-b3':'Game menu UI & tutorial flow','lab-b4':'WebGL compilation & publishing',
    'lab-role':'Role: Level Designer · Developer',
    'ms-type':'VR Experience · Meta Quest 3',
    'ms-desc':'An immersive virtual reality experience built in Unity for Meta Quest 3. I designed and implemented an interactive zone of the virtual environment.',
    'ms-b1':'Interactive zone design & implementation','ms-b2':'User interactions with virtual space','ms-b3':'Environment optimization for immersion',
    'ms-role':'Role: VR Designer · Developer',
    'ink-badge':'2025 · IndieLevel','ink-type':'3D Card-Combat Game · Studio Collaboration',
    'ink-desc':"A 3D turn-based card combat game developed in collaboration with IndieLevel. I led character animation and produced the game's main cinematic.",
    'ink-b1':'Character animations: attack, heal, damage, idle','ink-b2':'Main cinematic production from narrative script','ink-b3':'Animation implementation & rendering in Maya',
    'ink-role':'Role: Character Animator · Cinematic Director',
    'ink-tab1':'Narrative Teaser','ink-tab2':'Good Ending','ink-tab3':'Bad Ending',
    'bs-badge':'2025 · FunFactor','bs-type':'VR Gamification · Workplace Wellness',
    'bs-desc':'A VR gamification concept developed with FunFactor to improve workplace active breaks, combining UX research, UI design, and voice-over integration.',
    'bs-b1':'Qualitative & quantitative UX research','bs-b2':'UI design for the VR experience','bs-b3':'Voice-over recording & implementation',
    'bs-role':'Role: UX Researcher · UI Designer','bs-tab1':'Trailer','bs-tab2':'Full Experience',
    'mal-type':'3D Narrative Animation',
    'mal-desc':'A 3D animated short with advanced Maya techniques. I produced the final 12 seconds of the piece, pushing animation craft with complex rigging and render workflows.',
    'mal-b1':'Final 12s of animation sequence','mal-b2':'Advanced Graph Editor & parenting','mal-b3':'Full render pipeline in Maya',
    'mal-role':'Role: 3D Animator',
    'uc-type':'Interactive Educational App · Unity Mobile',
    'uc-desc':'An educational interactive application for mobile devices. I built the touch interaction system and programmed player movement and object interactions.',
    'uc-b1':'Touch interaction system for mobile','uc-b2':'Player movement programming','uc-b3':'Object interaction logic',
    'uc-role':'Role: Unity Developer · Interaction Designer',
    'films-label':'⋆ Audiovisual work','films-title':'Short <em>Films</em>',
    'films-sub':'Collaborative short films where I worked in the art team — set design, wardrobe, art direction, lighting, makeup, props, and video editing.',
    'vela-label':'Short Film · Set Design · Wardrobe · Video Editing',
    'sin-label':'Short Film · Art Direction · Makeup · Wardrobe · Lighting',
    'leona-label':'Short Film · Wardrobe Design · Props · Set Design · Lighting',
    'skills-label':'⋆ Toolkit','skills-title':'Skills & Tools',
    'sg-gamedev':'Game Development','sg-3d':'3D & Animation','sg-design':'Design & UX','sg-audio':'Audio & Production',
    'contact-label':"⋆ Let's connect",
    'contact-h2':'Open to internships<br />in <em>games &amp; QA.</em>',
    'contact-p':"I'm actively seeking internship opportunities in the games industry — especially in quality assurance, interactive design, or game development. I'm curious, detail-oriented, and ready to learn from any team.",
    'contact-cta':'Say hello',
    'footer-text':'Designed & built by María Zuluaga Soto · 2026',
    'footer-sub':'Universidad EAFIT · Medellín, Colombia'
  },
  es: {
    'nav-about':'Sobre mí','nav-projects':'Proyectos','nav-films':'Cortometrajes','nav-skills':'Habilidades','nav-cta':'Escríbeme',
    'hero-badge':'Abierta a prácticas · 2do Sem 2026',
    'hero-eyebrow':'Diseñadora Interactiva · Animadora 3D · Desarrolladora de Juegos · QA-minded',
    'hero-tagline':'Creo juegos — del concepto al jugador,<br />me aseguro de que <em>nada falle.</em>',
    'tag-ux':'Investigación UX','tag-qa':'Pruebas QA',
    'hero-see':'Ver mi trabajo','hero-touch':'Contactar',
    'hc-lang-en':'Inglés · C1','hc-lang-es':'Español · Nativo',
    'about-label':'⋆ Sobre mí',
    'about-h2':'Siempre aprendiendo.<br /><em>Siempre prestando atención.</em>',
    'about-p1':'Soy estudiante de Diseño Interactivo en EAFIT, enfocada en crear juegos y experiencias interactivas en Unity — para WebGL, móvil y VR (Meta Quest).',
    'about-p2':'Trabajo en diseño de niveles, sistemas de interacción e implementación completa, prestando atención a cómo las cosas se comportan, se sienten y funcionan antes de llegar al jugador.',
    'about-p3':'Combino el desarrollo técnico (Unity, C#) con investigación UX (métodos cualitativos y cuantitativos), y también trabajo en animación 3D y producción audiovisual.',
    'about-p4':'Me interesan especialmente los roles en desarrollo de juegos, QA y diseño interactivo donde pueda construir, probar y refinar experiencias reales para jugadores.',
    'about-quote':'"La curiosidad es la mejor herramienta de depuración."',
    'stat-projects':'Proyectos entregados','stat-gpa':'GPA / 5.0','stat-english':'Nivel de inglés','stat-year':'Año en EAFIT',
    'proj-label':'⋆ Trabajo seleccionado','proj-title':'Proyectos',
    'proj-sub':'Juegos, VR, animación 3D, producción audiovisual y apps interactivas — construidos con intención.',
    'filter-all':'Todo','filter-animation':'Animación',
    'lab-badge':'2026 · Destacado','lab-type':'Juego 3D en Unity · WebGL',
    'lab-desc':'Un juego de laberinto 3D desarrollado de principio a fin en Unity. Lideré el diseño de niveles, las interacciones del jugador, el sistema de tutorial y entregué el build en WebGL.',
    'lab-b1':'Diseño de niveles y entorno','lab-b2':'Sistemas de interacción con objetos y obstáculos','lab-b3':'UI del menú y flujo del tutorial','lab-b4':'Compilación y publicación en WebGL',
    'lab-role':'Rol: Diseñadora de Niveles · Desarrolladora',
    'ms-type':'Experiencia VR · Meta Quest 3',
    'ms-desc':'Una experiencia de realidad virtual inmersiva en Unity para Meta Quest 3. Diseñé e implementé una zona interactiva del entorno virtual.',
    'ms-b1':'Diseño e implementación de zona interactiva','ms-b2':'Interacciones del usuario con el espacio virtual','ms-b3':'Optimización del entorno para inmersión',
    'ms-role':'Rol: Diseñadora VR · Desarrolladora',
    'ink-badge':'2025 · IndieLevel','ink-type':'Juego 3D de Cartas · Colaboración con Estudio',
    'ink-desc':'Un juego de combate de cartas por turnos en 3D desarrollado con IndieLevel. Lideré la animación de personajes y produje la cinemática principal del juego.',
    'ink-b1':'Animaciones de personajes: ataque, curación, daño, idle','ink-b2':'Producción de cinemática principal desde guion narrativo','ink-b3':'Implementación de animaciones y renderizado en Maya',
    'ink-role':'Rol: Animadora de Personajes · Directora de Cinemáticas',
    'ink-tab1':'Teaser Narrativo','ink-tab2':'Final Bueno','ink-tab3':'Final Malo',
    'bs-badge':'2025 · FunFactor','bs-type':'Gamificación VR · Bienestar Laboral',
    'bs-desc':'Un concepto de gamificación VR desarrollado con FunFactor para mejorar los descansos activos en el trabajo, combinando investigación UX, diseño UI e integración de voz en off.',
    'bs-b1':'Investigación UX cualitativa y cuantitativa','bs-b2':'Diseño UI para la experiencia VR','bs-b3':'Grabación e implementación de voz en off',
    'bs-role':'Rol: Investigadora UX · Diseñadora UI','bs-tab1':'Tráiler','bs-tab2':'Experiencia Completa',
    'mal-type':'Animación Narrativa 3D',
    'mal-desc':'Un cortometraje animado en 3D con técnicas avanzadas de Maya. Produje los 12 segundos finales, aplicando animación compleja con rigging y flujos de renderizado.',
    'mal-b1':'Secuencia de animación de los últimos 12s','mal-b2':'Graph Editor avanzado y emparentado','mal-b3':'Pipeline de renderizado completo en Maya',
    'mal-role':'Rol: Animadora 3D',
    'uc-type':'App Educativa Interactiva · Unity Mobile',
    'uc-desc':'Una aplicación educativa interactiva para dispositivos móviles. Construí el sistema de interacción táctil y programé el movimiento del jugador y la lógica de objetos.',
    'uc-b1':'Sistema de interacción táctil para móvil','uc-b2':'Programación del movimiento del jugador','uc-b3':'Lógica de interacción con objetos',
    'uc-role':'Rol: Desarrolladora Unity · Diseñadora de Interacción',
    'films-label':'⋆ Trabajo audiovisual','films-title':'Corto<em>metrajes</em>',
    'films-sub':'Cortometrajes colaborativos donde trabajé en el equipo de arte — escenografía, vestuario, dirección de arte, iluminación, maquillaje, props y edición de video.',
    'vela-label':'Cortometraje · Escenografía · Vestuario · Edición de Video',
    'sin-label':'Cortometraje · Dirección de Arte · Maquillaje · Vestuario · Iluminación',
    'leona-label':'Cortometraje · Diseño de Vestuario · Props · Escenografía · Iluminación',
    'skills-label':'⋆ Herramientas','skills-title':'Habilidades y Herramientas',
    'sg-gamedev':'Desarrollo de Juegos','sg-3d':'3D y Animación','sg-design':'Diseño y UX','sg-audio':'Audio y Producción',
    'contact-label':'⋆ Conectemos',
    'contact-h2':'Abierta a prácticas<br />en <em>juegos y QA.</em>',
    'contact-p':'Estoy buscando oportunidades de práctica en la industria de los videojuegos — especialmente en control de calidad, diseño interactivo o desarrollo de juegos. Soy curiosa, detallista y lista para aprender de cualquier equipo.',
    'contact-cta':'Escríbeme',
    'footer-text':'Diseñado y desarrollado por María Zuluaga Soto · 2026',
    'footer-sub':'Universidad EAFIT · Medellín, Colombia'
  }
};

var currentLang = localStorage.getItem('portfolio-lang') || 'en';

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('portfolio-lang', lang);
    var t = translations[lang];
    document.querySelectorAll('[data-i18n]').forEach(function(el) {
        var key = el.getAttribute('data-i18n');
        if (t[key] !== undefined) el.textContent = t[key];
    });
    document.querySelectorAll('[data-i18n-html]').forEach(function(el) {
        var key = el.getAttribute('data-i18n-html');
        if (t[key] !== undefined) el.innerHTML = t[key];
    });
    var btn = document.getElementById('langToggle');
    if (btn) btn.textContent = lang === 'en' ? 'ES' : 'EN';
    if (typeof lucide !== 'undefined') lucide.createIcons();
}

document.getElementById('langToggle').addEventListener('click', function() {
    setLanguage(currentLang === 'en' ? 'es' : 'en');
});

// Apply saved language on load (after a tick so Lucide is ready)
setTimeout(function() { setLanguage(currentLang); }, 50);
