/* ---------- Theme ---------- */
(function themeInit() {
  const root = document.documentElement;
  const stored = localStorage.getItem('theme');
  if (stored === 'light') root.classList.add('light');
  document.querySelector('#modeToggle').addEventListener('click', () => {
    root.classList.toggle('light');
    localStorage.setItem('theme', root.classList.contains('light') ? 'light' : 'dark');
  });
})();

/* ---------- GSAP Setup ---------- */
window.addEventListener('DOMContentLoaded', () => {
  if (!window.gsap) return;

  const gsap = window.gsap;
  const ST = window.ScrollTrigger;
  gsap.registerPlugin(ST);

  // Mark elements to reveal
  document.querySelectorAll('.section, .card, .project').forEach(el => el.classList.add('reveal'));

  // Global section reveals
  document.querySelectorAll('.reveal').forEach(el => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.7,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none reverse"
      }
    });
  });

  // Subtle drifting blobs (mature, not bouncy)
  gsap.to('.blob-a', { xPercent: 6, yPercent: -4, duration: 16, ease: "sine.inOut", yoyo: true, repeat: -1 });
  gsap.to('.blob-b', { xPercent: -6, yPercent: 6, duration: 18, ease: "sine.inOut", yoyo: true, repeat: -1 });

  // Holographic hero entrance
  gsap.from('.holo', { y: 14, opacity: 0, duration: 0.9, ease: "power2.out" });
  gsap.from('.subtitle', { y: 14, opacity: 0, duration: 0.9, ease: "power2.out", delay: 0.1 });
  gsap.from('.cta-row .btn', { y: 14, opacity: 0, duration: 0.7, ease: "power2.out", stagger: 0.06, delay: 0.2 });

  // Animate circular skill rings
  document.querySelectorAll('.ring').forEach(svg => {
    const fg = svg.querySelector('.fg');
    const percent = Number(svg.dataset.percent || 0);
    const full = 326; // 2πr
    const target = full * (1 - percent / 100);
    gsap.to(fg, {
      strokeDashoffset: target,
      duration: 1.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: svg,
        start: "top 80%",
        once: true
      }
    });
    // Gradient stroke hue shift (subtle)
    gsap.to(fg, {
      duration: 6,
      repeat: -1,
      yoyo: true,
      onUpdate: function() {
        // Optional: could change stroke color over time if desired
      }
    });
  });

  // Project hover lift (shadow + scale)
  document.querySelectorAll('.project').forEach(card => {
    card.addEventListener('mouseenter', () => gsap.to(card, { y: -4, duration: .2, ease: "power2.out" }));
    card.addEventListener('mouseleave', () => gsap.to(card, { y: 0, duration: .25, ease: "power2.out" }));
  });

  // Timeline items slight stagger when section enters
  const tl = gsap.timeline({
    scrollTrigger: { trigger: '.timeline', start: "top 80%", once: true }
  });
  tl.from('.tl-item', { y: 18, opacity: 0, duration: 0.5, ease: "power2.out", stagger: 0.12 });
});
/* ---------- Contact Form (Formspree) ---------- */
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const msg = document.getElementById("formMessage");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    try {
      const res = await fetch("https://formspree.io/f/xvgqyqqy", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" }
      });

      if (res.ok) {
        msg.textContent = "✅ Message sent successfully!";
        msg.style.display = "block";
        msg.style.color = "lime";
        form.reset();
      } else {
        msg.textContent = "❌ Failed to send message.";
        msg.style.display = "block";
        msg.style.color = "red";
      }
    } catch (err) {
      msg.textContent = "⚠ Error sending message.";
      msg.style.display = "block";
      msg.style.color = "red";
    }
  });
});

