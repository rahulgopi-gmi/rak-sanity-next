document.getElementById("loader").style.display = "none";

//link dynamically add
//get started btn
document.addEventListener("DOMContentLoaded", function () {
  const currentParams = new URLSearchParams(window.location.search);

  // Nothing to add, exit fast
  if ([...currentParams.entries()].length === 0) return;

  // Select local links
  const anchorButtons = document.querySelectorAll(
    'a[href^="/"], a[href$=".html"], a[href$="/"], a[href^="#"]'
  );

  anchorButtons.forEach(function (btn) {
    let originalHref = btn.getAttribute("href");
    if (!originalHref) return;

    // Prevent re-adding parameters if link already contains utm_ or referrer_
    if (/utm_|referrer_name|referrer_email/i.test(originalHref)) return;

    // Split hash, keep it if exists
    const [baseHref, hashFragment] = originalHref.split("#");

    const url = new URL(baseHref, window.location.origin);
    const linkParams = new URLSearchParams(url.search);

    // Add ONLY the desired params (UTMs + referrer + source)
    currentParams.forEach((value, key) => {
      if (
        key.startsWith("utm_") ||
        key === "referrer_name" ||
        key === "referrer_email" ||
        key === "source"
      ) {
        linkParams.set(key, value.trim());
      }
    });

    // Reconstruct new link
    url.search = linkParams.toString();
    let newHref =
      url.pathname + (url.search ? "?" + url.searchParams.toString() : "");

    // Add hash back if it existed
    if (hashFragment) {
      newHref += "#" + hashFragment;
    }

    btn.setAttribute("href", newHref);
  });
});

//get values
const form = document.getElementById("campaignForm");

const yourNameEl = document.getElementById("yourName");
const phoneEl = document.getElementById("phoneNumber");
const emailEl = document.getElementById("email");
const businessActivityEl = document.getElementById("businessActivity");

//errorFiled
const yourNameError = document.getElementById("yourNameError");
const phoneError = document.getElementById("phoneError");
const emailError = document.getElementById("emailError");
const businessActivityError = document.getElementById("businessActivityError");
const formStatus = document.getElementById("formStatus");

const isIndiaPage = typeof window !== "undefined" && (window.location.pathname || "").includes("campaigns-india");
const iti = window.intlTelInput(phoneEl, {
  separateDialCode: true,
  initialCountry: isIndiaPage ? "in" : "ae",
  utilsScript:
    "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/js/utils.js",
});

// ---------------- Validation Helpers ----------------

function validateInput(fieldName, value, options = {}) {
  const errors = [];
  const trimmed = (value ?? "").toString().trim();

  if (options.required && (trimmed === "" || trimmed === "0")) {
    errors.push(`${fieldName} is required.`);
    return { valid: false, errors };
  }

  // XSS checks
  const xssPattern = /<script.*?>.*?<\/script.*?>/i;
  const htmlTagsPattern = /[<>]/; // catch < and >

  // SQLi-ish checks
  const sqliPattern = /('|--|;|union|select|insert|drop|update|delete)/i;

  if (!options.allowUnsafe) {
    if (xssPattern.test(trimmed) || htmlTagsPattern.test(trimmed)) {
      errors.push(`${fieldName} contains unsafe character.`);
    }
    if (sqliPattern.test(trimmed)) {
      errors.push(
        `${fieldName} contains potentially dangerous SQL-like input.`
      );
    }
  }

  if (options.type === "email") {
    const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!emailPattern.test(trimmed)) {
      errors.push(`${fieldName} must be a valid email address.`);
    }
  }

  if (options.maxLength && trimmed.length > options.maxLength) {
    errors.push(`${fieldName} must be under ${options.maxLength} characters.`);
  }

  if (options.pattern && !options.pattern.test(trimmed)) {
    errors.push(options.patternMessage || `${fieldName} format is invalid.`);
  }

  if (options.maxLength && value.length > options.maxLength) {
    errors.push(
      options.maxlengthMessage ||
        `Maximum length is ${options.maxlength} characters`
    );
  }

  return {
    valid: errors.length === 0,
    errors,
    value: trimmed,
  };
}

function showError(el, message) {
  el.textContent = message;
}

function clearErrors() {
  yourNameError.textContent = "";
  phoneError.textContent = "";
  emailError.textContent = "";
  businessActivityError.textContent = "";
}

function getUTMParameters() {
  const paramsToCapture = ["utm_", "referrer_name", "referrer_email", "source"];
  const result = {};

  // Helper to determine if a key should be captured
  function shouldCapture(key) {
    return key.startsWith("utm_") || paramsToCapture.includes(key);
  }

  // Parse regular query string
  const params = new URLSearchParams(window.location.search);
  for (const [key, value] of params.entries()) {
    if (shouldCapture(key)) {
      result[key] = value.trim();
    }
  }

  // Parse fragment (?utm_source=... or ?referrer_name=... or ?source=...)
  if (window.location.hash.includes("?")) {
    const hashQuery = window.location.hash.split("?")[1];
    if (hashQuery) {
      const hashParams = new URLSearchParams(hashQuery);
      for (const [key, value] of hashParams.entries()) {
        if (shouldCapture(key)) {
          result[key] = value.trim();
        }
      }
    }
  }

  return result;
}

// ---------------- On-Blur Validation ----------------

function attachValidationOnBlur(inputEl, errorEl, fieldName, options) {
  inputEl.addEventListener("blur", () => {
    const check = validateInput(fieldName, inputEl.value, options);
    if (check.valid) {
      errorEl.textContent = ""; // clear error if fixed
    } else {
      errorEl.textContent = check.errors[0]; // show first error
    }
  });
}

attachValidationOnBlur(yourNameEl, yourNameError, "Your Name", {
  required: true,
  pattern: /^[\p{L} ]+$/u,
  patternMessage:
    "Your Name must contain only letters (no numbers or symbols).",
  maxlength: 50,
  maxlengthMessage: "Your Name must be at most 50 characters long.",
});

phoneEl.addEventListener("blur", () => {
  if (phoneEl.value.trim() === "") {
    phoneError.textContent = "Phone Number is required.";
  } else if (!iti.isValidNumber()) {
    phoneError.textContent = "Please enter a valid phone number.";
  } else {
    phoneError.textContent = "";
  }
});

attachValidationOnBlur(emailEl, emailError, "Email", {
  required: true,
  type: "email",
});

attachValidationOnBlur(
  businessActivityEl,
  businessActivityError,
  "Business Activity",
  {
    required: true,
    pattern: /^[\p{L} ]+$/u,
    patternMessage:
      "Business Activity must contain only letters (no numbers or symbols).",
    maxlength: 50,
    maxlengthMessage: "Business Activity must be at most 50 characters long.",
  }
);

// ---------------- Form Submit ----------------
form.addEventListener("submit", async function (e) {
  e.preventDefault();
  clearErrors();

  let hasError = false;

  const yourNameCheck = validateInput("Your Name", yourNameEl.value, {
    required: true,
    pattern: /^[\p{L} ]+$/u,
    patternMessage:
      "Your Name must contain only letters (no numbers or symbols).",
    maxlength: 50,
    maxlengthMessage: "Your Name must be at most 50 characters long.",
  });

  if (!yourNameCheck.valid) {
    showError(yourNameError, yourNameCheck.errors[0]);
    hasError = true;
  }

  let Phone = iti.getNumber();
  if (phoneEl.value.trim() === "") {
    showError(phoneError, "Phone Number is required.");
    hasError = true;
  } else if (!iti.isValidNumber()) {
    showError(phoneError, "Please enter a valid phone number.");
    hasError = true;
  }

  const emailCheck = validateInput("Email", emailEl.value, {
    required: true,
    type: "email",
  });
  if (!emailCheck.valid) {
    showError(emailError, emailCheck.errors[0]);
    hasError = true;
  }

  const businessActivityCheck = validateInput(
    "Business Activity",
    businessActivityEl.value,
    {
      required: true,
      pattern: /^[\p{L} ]+$/u,
      patternMessage:
        "Business Activity must contain only letters (no numbers or symbols).",
      maxlength: 50,
      maxlengthMessage: "Business Activity must be at most 50 characters long.",
    }
  );

  if (!businessActivityCheck.valid) {
    showError(businessActivityError, businessActivityCheck.errors[0]);
    hasError = true;
  }

  if (hasError) return;

  const utmParams = getUTMParameters();
  document.getElementById("loader").style.display = "block";

  const parts = yourNameCheck.value.split(" ");
  let firstName = parts[0];
  let lastName = parts.slice(1).join(" ");

  if (lastName === "") {
    lastName = firstName;
  }

  const formData = {
    first_name: firstName,
    last_name: lastName,
    email: emailCheck.value,
    phone: Phone,
    message: `Business Activity: ${businessActivityCheck.value}`,
    ...utmParams,
  };

  console.log(formData, "formData");

  let apiURL = "https://express-web2lead.vercel.app/submit-form";

  if (
    window.location.host.includes("staging") ||
    window.location.host.includes("gmi-projects.com")
  ) {
    apiURL = "https://express-web2lead-staging.vercel.app/submit-form";
  }

  try {
    const response = await fetch(apiURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!response.ok) throw new Error("Submission failed");

    formStatus.textContent = "";
    formStatus.style.color = "#6FCCDD";
    form.reset();
    phoneEl.value = "";

    iti.setCountry("ae");
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "lead_submitted" });
    document.getElementById("loader").style.display = "none";
    window.location.href = "/thank-you.html" + window.location.search;
  } catch (error) {
    formStatus.textContent = "Error submitting the form. Please try again.";
    formStatus.style.color = "red";
    document.getElementById("loader").style.display = "none";
    console.error(error);
  }
});
