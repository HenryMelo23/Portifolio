// ============================================
// FUTURISTIC CYBER-MINIMALISM PORTFOLIO
// Vanilla JavaScript for Interactive Elements
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ========== MOBILE MENU TOGGLE ==========
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            });
        });
    }
    
    // ========== NETWORK VISUALIZATION (Hero Canvas) ==========
    const networkCanvas = document.getElementById('networkCanvas');
    if (networkCanvas) {
        const ctx = networkCanvas.getContext('2d');
        let particles = [];
        let animationFrameId;
        
        function resizeCanvas() {
            networkCanvas.width = networkCanvas.offsetWidth;
            networkCanvas.height = networkCanvas.offsetHeight;
        }
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        // Particle class
        class Particle {
            constructor() {
                this.x = Math.random() * networkCanvas.width;
                this.y = Math.random() * networkCanvas.height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.radius = Math.random() * 2 + 1;
            }
            
            update() {
                this.x += this.vx;
                this.y += this.vy;
                
                if (this.x < 0 || this.x > networkCanvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > networkCanvas.height) this.vy *= -1;
            }
            
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(0, 217, 255, 0.6)';
                ctx.fill();
            }
        }
        
        // Create particles
        const particleCount = Math.min(window.innerWidth / 10, 100);
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
        
        // Draw connections
        function drawConnections() {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 150) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        const opacity = (1 - distance / 150) * 0.3;
                        ctx.strokeStyle = `rgba(0, 217, 255, ${opacity})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }
        }
        
        // Animation loop
        function animate() {
            ctx.clearRect(0, 0, networkCanvas.width, networkCanvas.height);
            
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
            
            drawConnections();
            
            animationFrameId = requestAnimationFrame(animate);
        }
        
        animate();
    }
    
    // ========== HERO STATS COUNTER ANIMATION ==========
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimated = false;
    
    function animateStats() {
        const statNumbers = document.querySelectorAll('.hero .stat-number');
        
        statNumbers.forEach(stat => {
            const targetAttr = stat.getAttribute('data-target');
            // Só animamos se o target for um número válido
            if (!targetAttr || isNaN(parseFloat(targetAttr))) return;

            const target = parseFloat(targetAttr);
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = target % 1 === 0 ? target : target.toFixed(1);
                    clearInterval(timer);
                } else {
                    stat.textContent = current % 1 === 0 ? Math.floor(current) : current.toFixed(1);
                }
            }, 16);
        });
    }
    
    // Observer para disparar a animação do Hero apenas uma vez
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        observer.observe(heroSection);
    }
    // ========== COMPONENTES VISUAIS (CANVAS E UI) ==========
    function initNetworkCanvas() {
        const canvas = document.getElementById('networkCanvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let particles = [];

        function resize() {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        }
        window.addEventListener('resize', resize);
        resize();

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.radius = Math.random() * 2 + 1;
            }
            update() {
                this.x += this.vx; this.y += this.vy;
                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }
            draw() {
                ctx.beginPath(); ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(0, 217, 255, 0.6)'; ctx.fill();
            }
        }

        for (let i = 0; i < 80; i++) particles.push(new Particle());

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => { p.update(); p.draw(); });
            
            // Desenha conexões
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dist = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
                    if (dist < 150) {
                        ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(0, 217, 255, ${0.3 * (1 - dist / 150)})`;
                        ctx.lineWidth = 0.5; ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(animate);
        }
        animate();
    }
    function initContributionGraph() {
        const canvas = document.getElementById('contributionCanvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        canvas.width = canvas.offsetWidth;
        canvas.height = 150;
        const data = Array.from({ length: 52 }, () => Math.floor(Math.random() * 100));
        const barWidth = canvas.width / data.length - 2;

        data.forEach((val, i) => {
            const h = (val / 100) * 110;
            ctx.fillStyle = val > 50 ? 'rgba(0, 217, 255, 0.6)' : 'rgba(0, 217, 255, 0.2)';
            ctx.fillRect(i * (barWidth + 2), canvas.height - h - 20, barWidth, h);
        });
    }
    function initMobileMenu() {
        const toggle = document.querySelector('.mobile-menu-toggle');
        const nav = document.querySelector('.nav-links');
        if (toggle && nav) {
            toggle.addEventListener('click', () => {
                nav.classList.toggle('active');
                toggle.classList.toggle('active');
            });
        }
    }

    function initInteractiveElements() {
        // Smooth Scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
            });
        });
    }
    
    // ========== CONTRIBUTION GRAPH CANVAS ==========
    const contributionCanvas = document.getElementById('contributionCanvas');
    if (contributionCanvas) {
        const ctx = contributionCanvas.getContext('2d');
        contributionCanvas.width = contributionCanvas.offsetWidth;
        contributionCanvas.height = 150;
        
        // Generate random contribution data for the last 12 months
        const data = Array.from({ length: 52 }, () => Math.floor(Math.random() * 100));
        
        const barWidth = contributionCanvas.width / data.length - 2;
        const maxHeight = contributionCanvas.height - 40;
        const maxValue = Math.max(...data);
        
        data.forEach((value, index) => {
            const barHeight = (value / maxValue) * maxHeight;
            const x = index * (barWidth + 2);
            const y = contributionCanvas.height - barHeight - 20;
            
            // Gradient color based on value
            let color;
            if (value < 25) color = 'rgba(0, 217, 255, 0.2)';
            else if (value < 50) color = 'rgba(0, 217, 255, 0.4)';
            else if (value < 75) color = 'rgba(0, 217, 255, 0.6)';
            else color = 'rgba(0, 217, 255, 0.9)';
            
            ctx.fillStyle = color;
            ctx.fillRect(x, y, barWidth, barHeight);
            
            // Add border
            ctx.strokeStyle = 'rgba(0, 217, 255, 0.3)';
            ctx.lineWidth = 1;
            ctx.strokeRect(x, y, barWidth, barHeight);
        });
        
        // Add labels
        ctx.fillStyle = 'rgba(160, 160, 160, 0.8)';
        ctx.font = '11px Courier New';
        ctx.fillText('Jan', 10, contributionCanvas.height - 5);
        ctx.fillText('Dec', contributionCanvas.width - 40, contributionCanvas.height - 5);
        
        // Redraw on resize
        window.addEventListener('resize', function() {
            contributionCanvas.width = contributionCanvas.offsetWidth;
            // Re-render the graph with same logic
        });
    }
    
    async function syncGithubProfile() {
        const username = 'HenryMelo23';
        
        try {
            const [userRes, reposRes] = await Promise.all([
                fetch(`https://api.github.com/users/${username}`),
                fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`)
            ]);

            if (userRes.ok && reposRes.ok) {
                const userData = await userRes.json();
                const reposData = await reposRes.json();
                const totalStars = reposData.reduce((acc, repo) => acc + repo.stargazers_count, 0);

                // A. ATUALIZA EXPERTISE (Bento Grid)
                const repoMetric = document.getElementById('repo-count-metric');
                if (repoMetric) repoMetric.textContent = userData.public_repos + "+";

                const followerMetric = document.getElementById('follower-count-metric');
                if (followerMetric) followerMetric.textContent = userData.followers;

                // B. ATUALIZA DASHBOARD (Evitando NaN via busca semântica)
                document.querySelectorAll('.github-dashboard .github-stat-card').forEach(card => {
                    const labelEl = card.querySelector('.stat-label');
                    const numberEl = card.querySelector('.stat-number');
                    
                    if (labelEl && numberEl) {
                        const labelText = labelEl.textContent.toLowerCase();
                        
                        if (labelText.includes('repositories')) {
                            numberEl.textContent = userData.public_repos;
                        } else if (labelText.includes('followers')) {
                            numberEl.textContent = userData.followers;
                        } else if (labelText.includes('stars')) {
                            numberEl.textContent = totalStars;
                        } else if (labelText.includes('contributions')) {
                            // Valor base para contribuições (API pública não fornece o total histórico)
                            numberEl.textContent = "2,847"; 
                        }
                    }
                });

                // C. LISTA DE ATIVIDADE RECENTE
                const activityList = document.querySelector('.activity-list');
                if (activityList) {
                    activityList.innerHTML = reposData.slice(0, 3).map(repo => `
                        <div class="activity-item">
                            <div class="activity-dot"></div>
                            <div class="activity-content">
                                <p><strong>Push to</strong> <span class="repo-name">${repo.name}</span></p>
                                <span class="activity-time">${new Date(repo.updated_at).toLocaleDateString('pt-BR')}</span>
                            </div>
                        </div>
                    `).join('');
                }

                // D. TIMESTAMP DO SISTEMA
                const lastUpdate = document.getElementById('lastUpdate');
                if (lastUpdate) {
                    lastUpdate.textContent = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
                }

                console.log(`[SYSTEM] Github Sync Successful for: ${userData.login} ✓`);
            }
        } catch (err) {
            console.error("Falha na rede ao contactar a API do GitHub", err);
        }
    }

    // Inicializa a sincronização sistêmica
    syncGithubProfile();

    // Chame esta função dentro do seu DOMContentLoaded
    fetchGithubStats();
    
    // ========== CONTACT FORM HANDLING ==========
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // Simulate form submission
            formStatus.className = 'form-status';
            formStatus.textContent = '> Processing request...';
            formStatus.style.display = 'block';
            
            setTimeout(() => {
                formStatus.className = 'form-status success';
                formStatus.innerHTML = `
                    <p><span style="color: var(--neon-green);">✓</span> Message transmitted successfully!</p>
                    <p>Response expected within 24-48 hours.</p>
                `;
                
                // Reset form
                contactForm.reset();
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    formStatus.style.display = 'none';
                }, 5000);
            }, 1500);
        });
    }
    
    // ========== SMOOTH SCROLL BEHAVIOR ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ========== NAVBAR BACKGROUND ON SCROLL ==========
    const nav = document.querySelector('.nav-glass');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            nav.style.background = 'rgba(11, 11, 11, 0.95)';
        } else {
            nav.style.background = 'rgba(11, 11, 11, 0.8)';
        }
    });
    
    // ========== INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS ==========
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const fadeInObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Add fade-in effect to cards
    document.querySelectorAll('.glass-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeInObserver.observe(card);
    });
    
    // ========== DASHBOARD TAB SWITCHING ==========
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // In a real application, this would load different content
            console.log('Switched to tab:', this.textContent);
        });
    });
    
    // ========== PROJECT CARD HOVER EFFECTS ==========
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
    });
    
    
    // ========== CUSTOM CURSOR EFFECT (Optional Enhancement) ==========
    let cursorDot = document.createElement('div');
    cursorDot.style.cssText = `
        width: 8px;
        height: 8px;
        background: var(--electric-blue);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.2s ease;
        display: none;
    `;
    document.body.appendChild(cursorDot);
    
    let cursorRing = document.createElement('div');
    cursorRing.style.cssText = `
        width: 30px;
        height: 30px;
        border: 2px solid var(--electric-blue);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9998;
        transition: transform 0.3s ease, width 0.3s ease, height 0.3s ease;
        display: none;
    `;
    document.body.appendChild(cursorRing);
    
    // Only show custom cursor on desktop
    if (window.innerWidth > 768) {
        cursorDot.style.display = 'block';
        cursorRing.style.display = 'block';
        
        document.addEventListener('mousemove', function(e) {
            cursorDot.style.left = e.clientX - 4 + 'px';
            cursorDot.style.top = e.clientY - 4 + 'px';
            
            cursorRing.style.left = e.clientX - 15 + 'px';
            cursorRing.style.top = e.clientY - 15 + 'px';
        });
        
        // Expand cursor on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .project-card, .glass-card');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', function() {
                cursorRing.style.width = '50px';
                cursorRing.style.height = '50px';
                cursorRing.style.left = parseInt(cursorRing.style.left) - 10 + 'px';
                cursorRing.style.top = parseInt(cursorRing.style.top) - 10 + 'px';
                cursorDot.style.transform = 'scale(1.5)';
            });
            
            el.addEventListener('mouseleave', function() {
                cursorRing.style.width = '30px';
                cursorRing.style.height = '30px';
                cursorDot.style.transform = 'scale(1)';
            });
        });
    }
    
    // ========== TERMINAL TYPING EFFECT ==========
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // Apply typing effect to hero subtitle (optional - can be enabled)
    // const heroSubtitle = document.querySelector('.hero-subtitle');
    // if (heroSubtitle) {
    //     const originalText = heroSubtitle.textContent;
    //     typeWriter(heroSubtitle, originalText, 100);
    // }
    
    // ========== PERFORMANCE OPTIMIZATION ==========
    // Debounce resize events
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
    
    window.addEventListener('resize', debounce(function() {
        // Recalculate layouts if necessary
        console.log('Window resized');
    }, 250));
    
    // ========== EASTER EGG: KONAMI CODE ==========
    let konamiCode = [];
    const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up, Up, Down, Down, Left, Right, Left, Right, B, A
    
    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.keyCode);
        konamiCode = konamiCode.slice(-10);
        
        if (konamiCode.join(',') === konamiSequence.join(',')) {
            document.body.style.animation = 'rainbow 3s linear infinite';
            console.log('🎮 KONAMI CODE ACTIVATED! 🎮');
            
            // Add rainbow animation
            const style = document.createElement('style');
            style.textContent = `
                @keyframes rainbow {
                    0% { filter: hue-rotate(0deg); }
                    100% { filter: hue-rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
            
            setTimeout(() => {
                document.body.style.animation = '';
            }, 3000);
        }
    });
    
    console.log('%c Engineering Digital Resilience ', 'background: #00D9FF; color: #0B0B0B; font-size: 20px; padding: 10px;');
    console.log('%c System initialized successfully ✓ ', 'background: #39FF14; color: #0B0B0B; font-size: 14px; padding: 5px;');
});
