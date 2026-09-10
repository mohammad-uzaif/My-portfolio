/* ============================================================
   UZAIF PORTFOLIO — JAVASCRIPT
   Everything here is intentionally simple so it is easy to edit.
============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  /* ---------------- PAGE LOADER ---------------- */
  const loader = document.getElementById("pageLoader");
  window.addEventListener("load", () => {
    setTimeout(() => loader.classList.add("done"), 450);
  });

  /* ---------------- BROWSE MENU ---------------- */
  const browseBtn = document.getElementById("browseBtn");
  const browseMenu = document.getElementById("browseMenu");

  browseBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    browseMenu.classList.toggle("open");
  });

  browseMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => browseMenu.classList.remove("open"));
  });

  document.addEventListener("click", () => browseMenu.classList.remove("open"));

  /* ---------------- REAL-TIME CLOCK ---------------- */
  const clock = document.getElementById("clock");

  function updateClock() {
    const now = new Date();

    // Change "en-IN" / "Asia/Kolkata" if you want another locale/timezone.
    const time = new Intl.DateTimeFormat("en-IN", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true
    }).format(now);

    clock.textContent = time;
  }

  updateClock();
  setInterval(updateClock, 1000);

  /* ---------------- CURRENT YEAR ---------------- */
  document.getElementById("year").textContent = new Date().getFullYear();

  /* ---------------- SCROLL REVEAL ---------------- */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal, .project-card, .skill-card, .cert-card, .edu-row").forEach(el => {
    observer.observe(el);
  });

  /* ---------------- CERTIFICATION AUTO SCROLL ----------------
     The track loops continuously. Clicking Pause stops it.
  ------------------------------------------------------------ */
  const certTrack = document.getElementById("certTrack");
  const certToggle = document.getElementById("certToggle");
  let certPaused = false;
  let certFrame;

  function autoScrollCerts() {
    if (!certPaused && certTrack.scrollWidth > certTrack.clientWidth) {
      certTrack.scrollLeft += 0.45;

      // Loop back to the beginning when near the end.
      if (certTrack.scrollLeft + certTrack.clientWidth >= certTrack.scrollWidth - 2) {
        certTrack.scrollLeft = 0;
      }
    }
    certFrame = requestAnimationFrame(autoScrollCerts);
  }

  autoScrollCerts();

  certToggle.addEventListener("click", () => {
    certPaused = !certPaused;
    certToggle.textContent = certPaused ? "Play ↗" : "Pause ↗";
  });

  /* ---------------- RESUME DOWNLOAD ANIMATION ---------------- */
  const resumeBtn = document.querySelector(".resume-btn");
  const toast = document.getElementById("downloadToast");

  resumeBtn.addEventListener("click", () => {
    // The browser handles the actual download via the HTML "download" attribute.
    toast.classList.add("show");

    setTimeout(() => toast.classList.remove("show"), 3200);
  });

  /* ---------------- BACK TO TOP ---------------- */
  document.getElementById("backToTop").addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ---------------- MAGNETIC HOVER MICRO-INTERACTION ----------------
     Lightweight cursor pull for desktop. Disabled on touch devices.
  ------------------------------------------------------------ */
  if (window.matchMedia("(pointer:fine)").matches) {
    document.querySelectorAll(".magnetic").forEach(el => {
      el.addEventListener("mousemove", (event) => {
        const rect = el.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;
        el.style.transform = `translate(${x * 0.08}px, ${y * 0.08}px)`;
      });

      el.addEventListener("mouseleave", () => {
        el.style.transform = "";
      });
    });
  }

  /* ---------------- PROJECT CARD DEPTH ---------------- */
  document.querySelectorAll(".project-card").forEach(card => {
    card.addEventListener("mousemove", (event) => {
      if (!window.matchMedia("(pointer:fine)").matches) return;

      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - .5;
      const y = (event.clientY - rect.top) / rect.height - .5;

      card.style.transform =
        `perspective(900px) rotateX(${y * -1.8}deg) rotateY(${x * 1.8}deg) translateY(-4px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
});
