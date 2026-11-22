document.addEventListener("DOMContentLoaded", function () {
  // Helper function to create HTML from markdown
  function markdownToHtml (markdown) {
    // First convert markdown to HTML
    const html = window.snarkdown(markdown);

    // Create a temporary container to manipulate the HTML
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;

    // Add security attributes to all anchor tags
    const anchors = tempDiv.getElementsByTagName("a");
    for (const anchor of anchors) {
      anchor.setAttribute("rel", "nofollow noopener noreferrer");
      anchor.setAttribute("target", "_blank");
      // Add futuristic styling classes
      anchor.classList.add("text-accent-cyan", "hover:text-accent-lime", "transition-colors", "duration-200");
    }

    return tempDiv.innerHTML;
  }

  // Update intro text
  const introTextContainer = document.querySelector(".intro-text");
  if (introTextContainer && window.pageContent["intro-text"]) {
    introTextContainer.innerHTML = window.pageContent["intro-text"]
      .map(text => `<p class="text-xl md:text-2xl text-text-primary mb-4 font-medium">${text}</p>`)
      .join("");
  }

  // Update benefits (only into a dedicated #benefits section; ".grid-crypto" alone is the team grid)
  const benefitsContainer = document.querySelector("#benefits .grid-crypto");
  if (benefitsContainer && window.pageContent.benefits) {
    benefitsContainer.innerHTML = window.pageContent.benefits
      .map(benefit => `
                <div class="benefit-card card-accent neon-border">
                    <h3 class="text-2xl font-bold text-accent-cyan mb-4">${benefit.title}</h3>
                    <p class="text-text-secondary leading-relaxed">${benefit.description}</p>
                </div>
            `).join("");
  }

  // Update tagline
  const taglineContainer = document.querySelector(".tagline");
  if (taglineContainer && window.pageContent.tagline) {
    taglineContainer.innerHTML = `
      <div class="text-center mt-16">
        <div class="glass rounded-2xl p-8 inline-block">
          <p class="text-2xl md:text-3xl text-accent-lime font-semibold italic">
            ${window.pageContent.tagline}
          </p>
        </div>
      </div>
    `;
  }

  // Update how-to steps
  const stepsContainer = document.querySelector(".grid-crypto-2");
  if (stepsContainer && window.pageContent.howto) {
    stepsContainer.innerHTML = window.pageContent.howto
      .map(step => `
                <div class="step-card card-accent relative">
                    <div class="step-number absolute -top-6 -left-6 w-16 h-16 bg-gradient-to-r from-accent-cyan to-accent-purple rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-neon-lg">
                        ${step.number}
                    </div>
                    <h3 class="text-2xl font-bold text-accent-cyan mb-6">${step.title}</h3>
                    <div class="text-text-secondary space-y-4">
                        ${markdownToHtml(step.contents)}
                    </div>
                </div>
            `).join("");
  }

  // Update team members
  const teamContainer = document.querySelector(".grid-crypto");
  if (teamContainer && window.pageContent.team) {
    // Find the team section specifically
    const teamSection = document.querySelector("#team .grid-crypto");
    if (teamSection) {
      teamSection.innerHTML = window.pageContent.team
        .map(member => `
                  <div class="team-member card-accent neon-border">
                      <div class="flex flex-col md:flex-row items-center md:items-start gap-8">
                          <img src="${member.image}" alt="${member.name}" class="team-photo w-32 h-32 rounded-2xl object-cover border-2 border-accent-cyan/30 shadow-neon">
                          <div class="text-center md:text-left">
                              <h3 class="text-2xl font-bold text-accent-cyan mb-4">${member.name}</h3>
                              ${member.details.map(detail => `<p class="text-text-secondary mb-2">${detail}</p>`).join("")}
                              <p class="text-accent-lime font-semibold">${member.location}</p>
                          </div>
                      </div>
                  </div>
              `).join("");
    }
  }

  // Render updates (sorted newest first, older ones behind a toggle)
  const updatesList = document.getElementById("updates-list");
  if (updatesList && Array.isArray(window.pageContent.updates)) {
    const VISIBLE_UPDATES = 6;
    const formatDate = d => new Date(d + "T00:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
    const updates = [...window.pageContent.updates].sort((a, b) => b.date.localeCompare(a.date));
    updatesList.innerHTML = updates
      .map((u, i) => `
                <li class="update-item"${i >= VISIBLE_UPDATES ? " hidden" : ""}>
                    <div class="update-meta">
                        <time datetime="${u.date}">${formatDate(u.date)}</time>
                        <span class="update-badge update-badge--${u.type.toLowerCase()}">${u.type}</span>
                    </div>
                    <div>
                        <h3 class="update-title">${u.title}</h3>
                        <div class="update-text">${markdownToHtml(u.text)}</div>
                    </div>
                </li>
            `).join("");

    const toggle = document.getElementById("updates-toggle");
    if (toggle && updates.length > VISIBLE_UPDATES) {
      const showAllLabel = `Show full history (${updates.length})`;
      toggle.textContent = showAllLabel;
      toggle.hidden = false;
      toggle.addEventListener("click", function () {
        const expanded = this.getAttribute("aria-expanded") === "true";
        updatesList.querySelectorAll(".update-item").forEach((item, i) => {
          if (i >= VISIBLE_UPDATES) item.hidden = expanded;
        });
        this.setAttribute("aria-expanded", String(!expanded));
        this.textContent = expanded ? showAllLabel : "Show latest only";
      });
    }
  }

  // Pool at a glance: latest update date comes from the updates log
  const latestUpdateEl = document.getElementById("pool-latest-update");
  if (latestUpdateEl && Array.isArray(window.pageContent.updates) && window.pageContent.updates.length) {
    const latest = window.pageContent.updates.map(u => u.date).sort().pop();
    latestUpdateEl.setAttribute("datetime", latest);
    latestUpdateEl.textContent = new Date(latest + "T00:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
  }

  // Pool at a glance: copy-to-clipboard for the pool ID (button stays hidden without JS/clipboard)
  document.querySelectorAll("[data-copy-target]").forEach(button => {
    const target = document.getElementById(button.dataset.copyTarget);
    if (!target || !navigator.clipboard) return;
    const label = button.textContent;
    let resetTimer;
    button.hidden = false;
    button.addEventListener("click", () => {
      navigator.clipboard.writeText(target.textContent.trim()).then(() => {
        button.textContent = "Copied";
        button.dataset.state = "done";
      }, () => {
        button.textContent = "Copy failed: select the ID";
      }).finally(() => {
        clearTimeout(resetTimer);
        resetTimer = setTimeout(() => { button.textContent = label; delete button.dataset.state; }, 2000);
      });
    });
  });

  // Render FAQ accordion and its schema.org FAQPage data
  const faqList = document.getElementById("faq-list");
  if (faqList && Array.isArray(window.pageContent.faq)) {
    faqList.innerHTML = window.pageContent.faq
      .map(f => `
                <details class="faq-item">
                    <summary class="faq-question">${f.question}</summary>
                    <div class="faq-answer">${markdownToHtml(f.answer)}</div>
                </details>
            `).join("");

    const faqSchema = document.createElement("script");
    faqSchema.type = "application/ld+json";
    faqSchema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": window.pageContent.faq.map(f => ({
        "@type": "Question",
        "name": f.question,
        "acceptedAnswer": { "@type": "Answer", "text": window.snarkdown(f.answer) }
      }))
    });
    document.head.appendChild(faqSchema);
  }

  // Add smooth scrolling for anchor links
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

  // Add intersection observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in');
      }
    });
  }, observerOptions);

  // Cards are visible by default; the fade-in is only an enhancement,
  // enabled when JS runs and the visitor has not asked for reduced motion.
  const allowMotion = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (allowMotion) document.documentElement.classList.add('js-anim');

  // Observe all cards and sections for animation
  if (allowMotion) {
    document.querySelectorAll('.card, .card-accent, section').forEach(el => {
      observer.observe(el);
    });
  }

  // Add hover effects for interactive elements
  document.querySelectorAll('.card, .card-accent').forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-4px)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });

  // Initialize theme toggle if not already done
  if (window.themeManager) {
    // Theme manager is already initialized
  } else {
    // Fallback theme toggle initialization
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', function() {
        const html = document.documentElement;
        const isDark = html.classList.contains('dark');
        
        if (isDark) {
          html.classList.remove('dark');
          html.setAttribute('data-theme', 'light');
          localStorage.setItem('theme', 'light');
        } else {
          html.classList.add('dark');
          html.setAttribute('data-theme', 'dark');
          localStorage.setItem('theme', 'dark');
        }
        
        // Update toggle button icon
        this.innerHTML = isDark ? 
          `<svg class="w-6 h-6 text-accent-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
          </svg>` :
          `<svg class="w-6 h-6 text-accent-lime" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
          </svg>`;
      });
    }
  }

  // Add CSS for fade-in animation
  if (!document.getElementById('animation-styles')) {
    const style = document.createElement('style');
    style.id = 'animation-styles';
    style.textContent = `
      .animate-fade-in {
        animation: fadeInUp 0.6s ease-out forwards;
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
      
      .js-anim .card:not(.animate-fade-in), .js-anim .card-accent:not(.animate-fade-in) {
        opacity: 0;
        transform: translateY(30px);
      }
      
      .card.animate-fade-in, .card-accent.animate-fade-in {
        opacity: 1;
        transform: translateY(0);
      }
    `;
    document.head.appendChild(style);
  }
});
