"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // Navigation menu toggle
  const navToggle = document.getElementById("nav-toggle");
  const primaryNav = document.getElementById("primary-navigation");

  if (navToggle && primaryNav) {
    navToggle.addEventListener("click", () => {
      const expanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!expanded));
      navToggle.classList.toggle("active");
      primaryNav.classList.toggle("open");
    });

    // Close menu when clicking outside or on a nav link (mobile)
    document.addEventListener("click", (event) => {
      if (
        !navToggle.contains(event.target) &&
        !primaryNav.contains(event.target) &&
        primaryNav.classList.contains("open")
      ) {
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.classList.remove("active");
        primaryNav.classList.remove("open");
      }
    });

    // Close menu when clicking a nav link (mobile)
    primaryNav.querySelectorAll("a.nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        if (primaryNav.classList.contains("open")) {
          navToggle.setAttribute("aria-expanded", "false");
          navToggle.classList.remove("active");
          primaryNav.classList.remove("open");
        }
      });
    });
  }

  // Smooth scroll for internal navigation links
  document.querySelectorAll("a.nav-link[href^='#']").forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").slice(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Contact form validation on contacts.html
  if (window.location.pathname.endsWith("contacts.html") || window.location.pathname.endsWith("/contacts.html") || window.location.pathname === "/" || window.location.pathname === "/index.html") {
    const form = document.getElementById("contact-form");
    if (form) {
      const nameInput = form.elements["name"];
      const emailInput = form.elements["email"];
      const subjectInput = form.elements["subject"];
      const messageInput = form.elements["message"];
      const feedbackEl = document.getElementById("form-feedback");

      const errorMessages = {
        name: "Please enter your name.",
        email: "Please enter a valid email address.",
        subject: "Please enter the subject.",
        message: "Please enter your message.",
      };

      function validateEmail(email) {
        // RFC 5322 compliant regex simplified for practical use
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
      }

      function showError(input, message) {
        const errorEl = document.getElementById(`${input.id}-error`);
        if (errorEl) {
          errorEl.textContent = message;
          input.setAttribute("aria-invalid", "true");
        }
      }

      function clearError(input) {
        const errorEl = document.getElementById(`${input.id}-error`);
        if (errorEl) {
          errorEl.textContent = "";
          input.removeAttribute("aria-invalid");
        }
      }

      function validateInput(input) {
        if (!input.value.trim()) {
          showError(input, errorMessages[input.name]);
          return false;
        }
        if (input === emailInput && !validateEmail(input.value.trim())) {
          showError(input, errorMessages.email);
          return false;
        }
        clearError(input);
        return true;
      }

      form.addEventListener("submit", (e) => {
        e.preventDefault();
        feedbackEl.textContent = "";
        feedbackEl.style.color = "";

        let valid = true;
        [nameInput, emailInput, subjectInput, messageInput].forEach((input) => {
          const isValid = validateInput(input);
          if (!isValid) valid = false;
        });

        if (valid) {
          // Form submission simulation
          feedbackEl.style.color = "#388e3c";
          feedbackEl.textContent = "Thank you for contacting us! We will get back to you shortly.";
          form.reset();
          // Focus first input after reset for accessibility
          nameInput.focus();
        } else {
          feedbackEl.style.color = "#d32f2f";
          feedbackEl.textContent = "Please fix the errors above and try again.";
        }
      });

      // Real-time validation on input
      [nameInput, emailInput, subjectInput, messageInput].forEach((input) => {
        input.addEventListener("input", () => validateInput(input));
      });
    }
  }

  // Subtle UI animation on page load
  const heroTitle = document.querySelector(".hero-title");
  const heroSubtitle = document.querySelector(".hero-subtitle");
  if (heroTitle && heroSubtitle) {
    heroTitle.style.opacity = "0";
    heroSubtitle.style.opacity = "0";
    setTimeout(() => {
      heroTitle.style.transition = "opacity 1s ease";
      heroSubtitle.style.transition = "opacity 1.2s ease";
      heroTitle.style.opacity = "1";
      heroSubtitle.style.opacity = "1";
    }, 100);
  }
});
