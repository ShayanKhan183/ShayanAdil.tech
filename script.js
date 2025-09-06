// ==================== Enhanced Mobile Nav ====================
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

navToggle?.addEventListener("click", () => {
  navMenu.classList.toggle("open");
  navToggle.innerHTML = navMenu.classList.contains("open") ? "✕" : "☰";
});

[...navMenu.querySelectorAll("a")].forEach((a) =>
  a.addEventListener("click", () => {
    navMenu.classList.remove("open");
    navToggle.innerHTML = "☰";
  })
);

// ==================== Header Scroll Effect ====================
const header = document.getElementById("header");
window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 100);
});

// ==================== Scroll Animations & Skill Bars ====================
const observerOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animated");

      // Animate skill bars only once
      if (entry.target.classList.contains("bars")) {
        entry.target.querySelectorAll(".skill-bar").forEach((bar, index) => {
          setTimeout(() => {
            bar.style.width = bar.dataset.width;
          }, index * 200);
        });
        observer.unobserve(entry.target); // Prevent re-trigger
      }
    }
  });
}, observerOptions);

// Observe all animated elements including skill section
document.querySelectorAll(".animate-on-scroll, .bars").forEach((el) =>
  observer.observe(el)
);

// ==================== Enhanced Testimonials Slider ====================
const slides = document.getElementById("slides");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
let index = 0;
let autoSlideInterval;

function show(i) {
  index = (i + slides.children.length) % slides.children.length;
  slides.style.transform = `translateX(${-index * 100}%)`;
}

function startAutoSlide() {
  autoSlideInterval = setInterval(() => show(index + 1), 5000);
}

function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

prev?.addEventListener("click", () => {
  show(index - 1);
  stopAutoSlide();
  setTimeout(startAutoSlide, 3000);
});

next?.addEventListener("click", () => {
  show(index + 1);
  stopAutoSlide();
  setTimeout(startAutoSlide, 3000);
});

if (slides) {
  startAutoSlide();
  slides.addEventListener("mouseenter", stopAutoSlide);
  slides.addEventListener("mouseleave", startAutoSlide);
}

// ==================== Enhanced Scroll to Top ====================
const toTop = document.getElementById("toTop");
if (toTop) {
  toTop.style.transition = "opacity 0.3s ease";

  window.addEventListener("scroll", () => {
    if (window.scrollY > 600) {
      toTop.style.display = "block";
      setTimeout(() => (toTop.style.opacity = "1"), 10);
    } else {
      toTop.style.opacity = "0";
      setTimeout(() => (toTop.style.display = "none"), 300);
    }
  });

  toTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ==================== Smooth Scrolling ====================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const headerHeight = document.querySelector("header")?.offsetHeight || 0;
      const targetPosition =
        target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
      window.scrollTo({ top: targetPosition, behavior: "smooth" });
    }
  });
});

// ==================== Particles Effect ====================
function createParticle() {
  const particle = document.createElement("div");
  particle.style.cssText = `
    position: fixed;
    width: 2px;
    height: 2px;
    background: rgba(96, 165, 250, 0.3);
    border-radius: 50%;
    pointer-events: none;
    z-index: -1;
    left: ${Math.random() * 100}vw;
    top: 100vh;
    animation: particleFloat ${3 + Math.random() * 4}s linear forwards;
  `;
  document.body.appendChild(particle);

  setTimeout(() => particle.remove(), 7000);
}

const particleStyle = document.createElement("style");
particleStyle.textContent = `
  @keyframes particleFloat {
    to {
      transform: translateY(-100vh) translateX(${Math.random() * 200 - 100}px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(particleStyle);

setInterval(createParticle, 2000);

// ==================== Performance Optimizations ====================
// Preload critical images
const preloadImage = (src) => {
  const img = new Image();
  img.src = src;
};

// Add loading state
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

// Lazy loading for images
if ("IntersectionObserver" in window) {
  const lazyImageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        lazyImageObserver.unobserve(img);
      }
    });
  });

  document.querySelectorAll("img[data-src]").forEach((img) =>
    lazyImageObserver.observe(img)
  );
}

// ==================== Popup + Formspree Script ====================
document.getElementById("contactForm").addEventListener("submit", async function(e) {
  e.preventDefault();
  const form = e.target;
  const btn = form.querySelector("button");
  const originalText = btn.textContent;

  btn.textContent = "Sending...";
  btn.disabled = true;

  let response = await fetch(form.action, {
    method: "POST",
    body: new FormData(form),
    headers: { 'Accept': 'application/json' }
  });

  if (response.ok) {
    form.reset();
    document.getElementById("popup").style.display = "flex";
  } else {
    document.getElementById("errorPopup").style.display = "flex";
  }

  btn.textContent = originalText;
  btn.disabled = false;
});

// ✅ Close success popup
document.getElementById("popupClose").onclick = function() {
  document.getElementById("popup").style.display = "none";
};

// ✅ Close error popup
document.getElementById("errorPopupClose").onclick = function() {
  document.getElementById("errorPopup").style.display = "none";
};
