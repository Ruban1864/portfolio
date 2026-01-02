// Custom JavaScript for RUBAN A S Portfolio
document.addEventListener('DOMContentLoaded', function() {

    // -------------------- Smooth Scrolling --------------------
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // fixed navbar offset
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
        });
    });

    // -------------------- Resume Download --------------------
    const downloadBtn = document.getElementById('downloadBtn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const fileUrl = 'project/Ruban_IT_VCET.pdf'; // use forward slash
            const fileName = 'Ruban_Resume.pdf';

            fetch(fileUrl)
            .then(resp => resp.blob())
            .then(blob => {
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = fileName;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            })
            .catch(() => alert('❌ Failed to download file.'));
        });
    }

    // -------------------- Active Navigation Highlight --------------------
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // -------------------- Contact Form Handling --------------------
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // prevent page reload

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !message) {
                alert("⚠️ Please fill in all fields.");
                return;
            }

            const payload = { name, email, message };
            const n8nWebhookUrl = "https://ruban1817.app.n8n.cloud/webhook/6de9c8ba-041f-4ec3-bfde-229f82ad38a3";

            fetch(n8nWebhookUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            })
            .then(res => {
                if (res.ok) {
                    alert("✅ Thank you for your message! I will get back to you soon.");
                    contactForm.reset();
                } else {
                    alert("❌ Something went wrong. Please try again later.");
                }
            })
            .catch(err => {
                console.error(err);
                alert("⚠️ Failed to send message. Check your connection.");
            });
        });
    }

    // -------------------- Scroll Animations for Cards --------------------
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const cards = document.querySelectorAll('.skill-card, .project-card, .experience-card, .education-card, .achievement-card, .certification-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // -------------------- Navbar Background Change --------------------
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // -------------------- Add CSS for scrolled navbar --------------------
    const style = document.createElement('style');
    style.textContent = `
        .navbar.scrolled {
            background-color: rgba(255, 255, 255, 0.95) !important;
            backdrop-filter: blur(10px);
        }
        .nav-link.active {
            color: #007BFF !important;
            font-weight: 600;
        }
    `;
    document.head.appendChild(style);

 // Call it when page loads


});
