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
            const n8nWebhookUrl = "https://ruban1111.app.n8n.cloud/webhook-test/f055f193-48f4-4da7-8001-877933765a99";

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

    // -------------------- LeetCode Stats Fetching --------------------
  async function fetchLeetCodeStats() {
    const username = "RubanAS";
    const url = `https://leetcode-stats-api.herokuapp.com/${username}`;
    const container = document.getElementById("leetcode-stats-container");
    const loadingMessage = document.getElementById("loading-message");

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();

        if (data.status === "success") {
            // hide loading
            if (loadingMessage) loadingMessage.style.display = "none";

            // calculate totals
            const totalQuestions = data.totalQuestions || 0;
            const easyTotal = data.totalEasy || 0;
            const mediumTotal = data.totalMedium || 0;
            const hardTotal = data.totalHard || 0;

            const totalSolved = data.totalSolved || 0;
            const easySolved = data.easySolved || 0;
            const mediumSolved = data.mediumSolved || 0;
            const hardSolved = data.hardSolved || 0;

            // percentages
            const totalPercent = totalQuestions ? Math.round((totalSolved / totalQuestions) * 100) : 0;
            const easyPercent = easyTotal ? Math.round((easySolved / easyTotal) * 100) : 0;
            const mediumPercent = mediumTotal ? Math.round((mediumSolved / mediumTotal) * 100) : 0;
            const hardPercent = hardTotal ? Math.round((hardSolved / hardTotal) * 100) : 0;

            // insert Bootstrap styled cards
            container.innerHTML = `
              <!-- Total Solved -->
              <div class="col-md-12 mb-4">
                <div class="card shadow-sm border-0 h-100">
                  <div class="card-body text-center">
                    <i class="bi bi-bar-chart-fill text-primary display-6 mb-3"></i>
                    <h5 class="card-title">Total Solved</h5>
                    <p class="card-text">
                      <span class="fw-bold fs-4">${totalSolved}</span> / ${totalQuestions}
                    </p>
                    <div class="progress" style="height: 22px;">
                      <div class="progress-bar bg-primary progress-bar-striped progress-bar-animated"
                           role="progressbar" style="width: ${totalPercent}%">${totalPercent}%</div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Easy -->
              <div class="col-md-4 mb-4">
                <div class="card shadow-sm border-0 h-100">
                  <div class="card-body text-center">
                    <i class="bi bi-emoji-smile-fill text-success display-6 mb-3"></i>
                    <h5 class="card-title">Easy</h5>
                    <p class="card-text">
                      <span class="fw-bold fs-4">${easySolved}</span> / ${easyTotal}
                    </p>
                    <div class="progress" style="height: 20px;">
                      <div class="progress-bar bg-success progress-bar-striped progress-bar-animated"
                           role="progressbar" style="width: ${easyPercent}%">${easyPercent}%</div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Medium -->
              <div class="col-md-4 mb-4">
                <div class="card shadow-sm border-0 h-100">
                  <div class="card-body text-center">
                    <i class="bi bi-lightbulb-fill text-warning display-6 mb-3"></i>
                    <h5 class="card-title">Medium</h5>
                    <p class="card-text">
                      <span class="fw-bold fs-4">${mediumSolved}</span> / ${mediumTotal}
                    </p>
                    <div class="progress" style="height: 20px;">
                      <div class="progress-bar bg-warning progress-bar-striped progress-bar-animated"
                           role="progressbar" style="width: ${mediumPercent}%">${mediumPercent}%</div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Hard -->
              <div class="col-md-4 mb-4">
                <div class="card shadow-sm border-0 h-100">
                  <div class="card-body text-center">
                    <i class="bi bi-lightning-charge-fill text-danger display-6 mb-3"></i>
                    <h5 class="card-title">Hard</h5>
                    <p class="card-text">
                      <span class="fw-bold fs-4">${hardSolved}</span> / ${hardTotal}
                    </p>
                    <div class="progress" style="height: 20px;">
                      <div class="progress-bar bg-danger progress-bar-striped progress-bar-animated"
                           role="progressbar" style="width: ${hardPercent}%">${hardPercent}%</div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Footer -->
              <div class="col-12 text-center mt-3">
                <p class="text-muted">Acceptance Rate: <strong>${data.acceptanceRate}%</strong></p>
                <p class="text-secondary small">Stats from LeetCode user: <span class="fw-bold">${username}</span></p>
              </div>
            `;
        } else {
            throw new Error(data.message || "Failed to fetch stats.");
        }
    } catch (error) {
        console.error("Error fetching LeetCode stats:", error);
        if (loadingMessage) {
            loadingMessage.textContent = "❌ Could not load LeetCode stats.";
            loadingMessage.classList.add("text-danger");
        }
    }
}

// Call it when page loads
document.addEventListener("DOMContentLoaded", fetchLeetCodeStats);

});
