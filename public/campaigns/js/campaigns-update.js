// ---------------- GLOBAL: hide ALL loaders on load ----------------
document.querySelectorAll(".loader").forEach((l) => l.classList.add("hidden"));

// ---------------- UTM LINK PROPAGATION ----------------
document.addEventListener("DOMContentLoaded", () => {
  const currentParams = new URLSearchParams(window.location.search);
  if ([...currentParams.entries()].length === 0) return;

  document
    .querySelectorAll('a[href^="/"], a[href$=".html"], a[href^="#"]')
    .forEach((link) => {
      const href = link.getAttribute("href");
      if (!href || /utm_|referrer_|source/i.test(href)) return;

      const [base, hash] = href.split("#");
      const url = new URL(base, window.location.origin);
      const params = new URLSearchParams(url.search);

      currentParams.forEach((v, k) => {
        if (
          k.startsWith("utm_") ||
          k === "referrer_name" ||
          k === "referrer_email" ||
          k === "source"
        ) {
          params.set(k, v.trim());
        }
      });

      url.search = params.toString();
      link.setAttribute(
        "href",
        url.pathname +
          (url.search ? "?" + url.search : "") +
          (hash ? "#" + hash : ""),
      );
    });
});

// ---------------- HELPERS ----------------
function validateInput(name, value, opts = {}) {
  const val = (value || "").trim();
  if (opts.required && !val) return `${name} is required`;

  if (opts.type === "email") {
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(val)) return "Invalid email address";
  }

  if (opts.pattern && !opts.pattern.test(val)) return opts.patternMessage;

  if (opts.maxLength && val.length > opts.maxLength)
    return opts.maxlengthMessage;

  return "";
}

function getUTMParameters() {
  const result = {};
  const params = new URLSearchParams(window.location.search);
  params.forEach((v, k) => {
    if (
      k.startsWith("utm_") ||
      k === "referrer_name" ||
      k === "referrer_email" ||
      k === "source"
    ) {
      result[k] = v.trim();
    }
  });
  return result;
}

// ---------------- MULTI FORM HANDLER ----------------
document.querySelectorAll(".campaignForm").forEach((form) => {
  // ---- scoped elements ----
  const loader = form.querySelector(".loader");
  const yourName = form.querySelector(".yourName");
  const phone = form.querySelector(".phoneNumber");
  const email = form.querySelector(".email");
  const activity = form.querySelector(".businessActivity");

  const errName = form.querySelector(".yourNameError");
  const errPhone = form.querySelector(".phoneError");
  const errEmail = form.querySelector(".emailError");
  const errActivity = form.querySelector(".businessActivityError");
  const status = form.querySelector(".formStatus");

  if (loader) loader.classList.add("hidden");

  const iti = window.intlTelInput(phone, {
    separateDialCode: true,
    initialCountry: "ae",
    utilsScript:
      "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/js/utils.js",
  });

  function clearErrors() {
    errName.textContent = "";
    errPhone.textContent = "";
    errEmail.textContent = "";
    errActivity.textContent = "";
    if (status) status.textContent = "";
  }

  // ---- SUBMIT ----
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    clearErrors();

    let hasError = false;

    const nameErr = validateInput("Your Name", yourName.value, {
      required: true,
      pattern: /^[\p{L} ]+$/u,
      patternMessage: "Only letters allowed",
      maxLength: 50,
      maxlengthMessage: "Max 50 characters",
    });

    if (nameErr) {
      errName.textContent = nameErr;
      hasError = true;
    }

    if (!phone.value.trim() || !iti.isValidNumber()) {
      errPhone.textContent = "Valid phone number required";
      hasError = true;
    }

    const emailErr = validateInput("Email", email.value, {
      required: true,
      type: "email",
    });

    if (emailErr) {
      errEmail.textContent = emailErr;
      hasError = true;
    }

    const actErr = validateInput("Business Activity", activity.value, {
      required: true,
      // pattern: /^[\p{L} ]+$/u,
      // patternMessage: "Only letters allowed",
      maxLength: 50,
      maxlengthMessage: "Max 50 characters",
    });

    if (actErr) {
      errActivity.textContent = actErr;
      hasError = true;
    }

    if (hasError) return;

    // ---- SHOW LOADER (ONLY THIS FORM) ----
    if (loader) loader.classList.remove("hidden");

    const nameParts = yourName.value.trim().split(" ");
    const payload = {
      first_name: nameParts[0],
      last_name: nameParts.slice(1).join(" ") || nameParts[0],
      email: email.value.trim(),
      phone: iti.getNumber(),
      message: `Business Activity: ${activity.value.trim()}`,
      ...getUTMParameters(),
    };

    const apiURL = window.location.host.includes("staging")
      ? "https://express-web2lead-staging.vercel.app/submit-form"
      : "https://express-web2lead.vercel.app/submit-form";

    try {
      const res = await fetch(apiURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed");

      form.reset();
      iti.setCountry("ae");
      window.location.href = "/thank-you.html" + window.location.search;
    } catch (err) {
      if (status) {
        status.textContent = "Submission failed. Try again.";
        status.style.color = "red";
      }
      console.error(err);
    } finally {
      if (loader) loader.classList.add("hidden");
    }
  });
});
