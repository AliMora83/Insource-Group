# InSource Group — Contact Form Guide

> **Prepared for:** Antigravity  
> **Project:** InSource Group Website  
> **Repository:** [https://github.com/AliMora83/Insource-Group.git](https://github.com/AliMora83/Insource-Group.git)  
> **File:** `src/InsourceGroup.jsx`  
> **Component:** `ContactForm`

---

## Overview

The contact form is a self-contained React component called `ContactForm` located inside `src/InsourceGroup.jsx`. It handles:

- Client-side field validation with real-time feedback
- Email format detection using a regex pattern
- Form submission via the browser's native `mailto:` protocol
- A success screen with an animated checkmark after sending
- A shake animation on the submit button when validation fails

The form requires **no backend server**, **no third-party form service**, and **no API keys**. Messages are dispatched directly through the user's default mail client (Outlook, Apple Mail, Gmail desktop app, etc.) with the recipient, subject, and body pre-filled.

---

## Table of Contents

1. [Finding the Component](#1-finding-the-component)
2. [Form Fields Reference](#2-form-fields-reference)
3. [Changing the Recipient Email Address](#3-changing-the-recipient-email-address)
4. [Adding a New Field](#4-adding-a-new-field)
5. [Removing a Field](#5-removing-a-field)
6. [Updating Validation Rules](#6-updating-validation-rules)
7. [Changing the Success Message](#7-changing-the-success-message)
8. [Changing Form Colours](#8-changing-form-colours)
9. [Upgrading to a Backend / Email Service](#9-upgrading-to-a-backend--email-service)
10. [Component Code Reference](#10-component-code-reference)

---

## 1. Finding the Component

Open the file:

```
src/InsourceGroup.jsx
```

Use your editor's search (`Cmd+F` / `Ctrl+F`) and search for:

```
/* ── Contact Form
```

The component spans from that comment block down to the closing brace before:

```
/* ── Gallery Placeholder
```

Everything you need to modify is between these two markers.

---

## 2. Form Fields Reference

The form currently has **four fields**:

| Field Key | Label | Type | Validation |
|-----------|-------|------|------------|
| `name` | Full Name | `text` | Required |
| `email` | Email Address | `email` | Required + valid email format |
| `subject` | Subject | `text` | Required |
| `message` | Message | `textarea` | Required + min 10 characters |

Each field is managed through a shared `fields` state object:

```jsx
const INIT = { name:"", email:"", subject:"", message:"" };
const [fields, setFields] = useState(INIT);
```

---

## 3. Changing the Recipient Email Address

The recipient is set in the `handleSubmit` function. Search for:

```
const to = "admin@insourcegroup.co.za";
```

Change it to any address you need:

```jsx
// Single recipient
const to = "newaddress@insourcegroup.co.za";

// Multiple recipients (CC)
const to = "admin@insourcegroup.co.za";
const cc = "production@insourcegroup.co.za";
const mailto = `mailto:${to}?cc=${cc}&subject=${subject}&body=${body}`;
```

> **Note:** The full `mailto` string is built two lines below the `to` constant. If adding CC or BCC, edit that line too.

### Current mailto builder (for reference):

```jsx
const mailto = `mailto:${to}?subject=${subject}&body=${body}`;
```

### With CC added:

```jsx
const cc     = encodeURIComponent("production@insourcegroup.co.za");
const mailto = `mailto:${to}?cc=${cc}&subject=${subject}&body=${body}`;
```

---

## 4. Adding a New Field

Follow these four steps to add a new field — for example, a **Phone Number** field.

### Step 1 — Add to the `INIT` object

```jsx
// Before
const INIT = { name:"", email:"", subject:"", message:"" };

// After
const INIT = { name:"", email:"", phone:"", subject:"", message:"" };
```

### Step 2 — Add validation in the `validate` function

```jsx
const validate = (f) => ({
  name:    !f.name.trim()         ? "Full name is required."       : "",
  email:   !f.email.trim()        ? "Email address is required."
         : !EMAIL_RE.test(f.email) ? "Please enter a valid email." : "",
  phone:   f.phone && !/^[\d\s\+\-\(\)]{7,15}$/.test(f.phone)
                                  ? "Please enter a valid phone number." : "",
  subject: !f.subject.trim()      ? "Subject is required."         : "",
  message: !f.message.trim()      ? "Message cannot be empty."
         : f.message.trim().length < 10
                                  ? "Please write at least 10 characters." : "",
});
```

> Phone is **optional** in this example (no required check). To make it required, add `!f.phone.trim() ? "Phone number is required." :` before the format check.

### Step 3 — Add the JSX field block

Place this between the Email and Subject field blocks:

```jsx
{/* Phone */}
<div style={{ marginBottom:18 }}>
  <label className="cf-label" style={{ color:labelColor("phone") }}>
    Phone Number
    <span style={{ marginLeft:8, fontSize:9, color:"rgba(255,255,255,.3)", fontWeight:300 }}>
      (optional)
    </span>
  </label>
  <input
    {...fieldOf("phone")}
    placeholder="e.g. 075 201 2968"
    type="tel"
    autoComplete="tel"
  />
  {touched.phone && errors.phone && (
    <div className="cf-err"><span>⚠</span>{errors.phone}</div>
  )}
</div>
```

### Step 4 — Include it in the email body

Find the `body` variable in `handleSubmit` and add the phone line:

```jsx
// Before
const body = encodeURIComponent(
  `Name: ${fields.name}\nEmail: ${fields.email}\n\n${fields.message}`
);

// After
const body = encodeURIComponent(
  `Name: ${fields.name}\nEmail: ${fields.email}\nPhone: ${fields.phone || "Not provided"}\n\n${fields.message}`
);
```

---

## 5. Removing a Field

To remove the **Subject** field as an example:

### Step 1 — Remove from `INIT`

```jsx
const INIT = { name:"", email:"", message:"" };
```

### Step 2 — Remove from `validate`

Delete the `subject` line:

```jsx
// Remove this line
subject: !f.subject.trim() ? "Subject is required." : "",
```

### Step 3 — Remove the JSX block

Delete the entire `{/* Subject */}` block from the return JSX.

### Step 4 — Update the mailto subject line

Since `fields.subject` no longer exists, replace it with a fixed string:

```jsx
// Before
const subject = encodeURIComponent(`[Website Enquiry] ${fields.subject}`);

// After
const subject = encodeURIComponent(`[Website Enquiry] InSource Group`);
```

---

## 6. Updating Validation Rules

All validation lives in the `validate` function. Here are the most common changes:

### Change the minimum message length

```jsx
// Current — minimum 10 characters
: f.message.trim().length < 10 ? "Please write at least 10 characters." : "",

// Change to 20 characters minimum
: f.message.trim().length < 20 ? "Please write at least 20 characters." : "",
```

### Make a field optional (remove required check)

```jsx
// Required (current)
subject: !f.subject.trim() ? "Subject is required." : "",

// Optional — always passes unless format is wrong
subject: "",
```

### Change the email error messages

```jsx
email: !f.email.trim()          ? "Please provide your email address."
     : !EMAIL_RE.test(f.email)  ? "That doesn't look like a valid email." : "",
```

### The email regex pattern

The regex used is:

```jsx
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
```

This catches the most common invalid emails (missing `@`, missing domain, etc.) without being overly strict. It accepts addresses like `name@domain.co.za` correctly. Only change this if you have a specific requirement.

---

## 7. Changing the Success Message

When the form is submitted successfully, the component renders a success screen. Find the `if (status === "sent")` block and update the text:

```jsx
if (status === "sent") {
  return (
    // ... wrapper div ...
    <h3 ...>
      Message Sent!           {/* ← Change this heading */}
    </h3>
    <p ...>
      Thank you for reaching out. Your email client should have opened
      — we'll be in touch shortly.   {/* ← Change this body text */}
    </p>
    // ...
  );
}
```

### To change the "Send Another" button label:

```jsx
// Find this button text and change it
Send Another

// For example:
Back to Form
```

### To auto-reset after N seconds instead of showing a button:

Add a `useEffect` inside the `if (status === "sent")` block — or just before the return:

```jsx
useEffect(() => {
  if (status !== "sent") return;
  const id = setTimeout(() => setStatus("idle"), 5000); // reset after 5s
  return () => clearTimeout(id);
}, [status]);
```

---

## 8. Changing Form Colours

The form uses the global colour tokens defined at the top of `InsourceGroup.jsx`. These affect the entire site, not just the form.

| Token | Default Value | Used For |
|-------|--------------|----------|
| `PURPLE` | `#8B1F7A` | Submit button background, checkmark |
| `PURPLE_DARK` | `#6A1660` | Submit button hover |
| `PURPLE_LIGHT` | `#B04EA0` | Focus border, checkmark stroke, success elements |

### Form-specific colours (inside `formCss` string)

These are only used by the form and can be changed independently:

```jsx
const formCss = `
  /* Error state — red */
  .cf-input.error { border-color:#E05C7A !important; background:rgba(224,92,122,.07); }

  /* Valid state — green */
  .cf-input.valid { border-color:rgba(80,200,140,.55); }
`;
```

To change the error colour to amber/orange instead of red:

```jsx
.cf-input.error { border-color:#E09A2E !important; background:rgba(224,154,46,.07); }
```

And update the error message text colour in `.cf-err`:

```jsx
.cf-err { color:#E09A2E; ... }
```

---

## 9. Upgrading to a Backend / Email Service

The current `mailto:` approach is simple and requires no setup, but it depends on the visitor having a mail client configured. For a more reliable delivery experience, you can replace the `handleSubmit` function with a call to an email service.

### Option A — EmailJS (no backend needed)

[EmailJS](https://www.emailjs.com) sends emails directly from the browser using their API. Free tier: 200 emails/month.

```bash
npm install @emailjs/browser
```

Replace `handleSubmit` with:

```jsx
import emailjs from "@emailjs/browser";

const handleSubmit = async () => {
  setTouched({ name:true, email:true, subject:true, message:true });
  if (!isClean) { setShake(true); setTimeout(()=>setShake(false),500); return; }

  setStatus("sending");

  try {
    await emailjs.send(
      "YOUR_SERVICE_ID",      // from EmailJS dashboard
      "YOUR_TEMPLATE_ID",     // from EmailJS dashboard
      {
        from_name:    fields.name,
        from_email:   fields.email,
        subject:      fields.subject,
        message:      fields.message,
        to_email:     "admin@insourcegroup.co.za",
      },
      "YOUR_PUBLIC_KEY"       // from EmailJS dashboard
    );
    setStatus("sent");
    setFields(INIT);
    setTouched({});
  } catch (err) {
    console.error("EmailJS error:", err);
    setStatus("error");
  }
};
```

Add an error state to the render (below the `if (status === "sent")` block):

```jsx
if (status === "error") {
  return (
    <div style={{ /* same wrapper */ }}>
      <p style={{ color:"#E05C7A", textAlign:"center" }}>
        ⚠ Something went wrong. Please email us directly at<br />
        <a href="mailto:admin@insourcegroup.co.za" style={{ color:PURPLE_LIGHT }}>
          admin@insourcegroup.co.za
        </a>
      </p>
      <button onClick={() => setStatus("idle")} className="cf-btn" style={{ marginTop:24 }}>
        Try Again
      </button>
    </div>
  );
}
```

### Option B — Formspree (hosted form backend)

[Formspree](https://formspree.io) receives form submissions and forwards them to your email. Free tier: 50 submissions/month.

```jsx
const handleSubmit = async () => {
  setTouched({ name:true, email:true, subject:true, message:true });
  if (!isClean) { setShake(true); setTimeout(()=>setShake(false),500); return; }

  setStatus("sending");

  try {
    const res = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name:    fields.name,
        email:   fields.email,
        subject: fields.subject,
        message: fields.message,
      }),
    });

    if (!res.ok) throw new Error("Formspree error");

    setStatus("sent");
    setFields(INIT);
    setTouched({});
  } catch (err) {
    console.error(err);
    setStatus("error");
  }
};
```

---

## 10. Component Code Reference

Below is the complete structure of the `ContactForm` component for quick orientation.

```
ContactForm
│
├── formCss                  CSS injected via <style> tag (animations, .cf-input, .cf-err, .cf-btn)
│
├── INIT                     Initial empty state for all fields
├── fields                   useState — current values of all form fields
├── touched                  useState — which fields the user has interacted with
├── status                   useState — "idle" | "sending" | "sent" | "error"
├── shake                    useState — triggers shake animation on submit button
│
├── validate(f)              Pure function — returns an object of error strings per field
├── errors                   Result of validate(fields) — recomputed on every render
├── isClean                  Boolean — true when all error strings are empty
│
├── fieldOf(key)             Helper — returns value, onChange, onFocus, onBlur, className for any field
│
├── handleSubmit()           Validates → builds mailto URL → opens mail client → sets status
│
├── labelColor(key)          Returns label colour string based on touched/error/valid state
│
└── JSX return
    ├── if status === "sent"  → Success screen (animated checkmark + message + reset button)
    └── else                  → Form (4 fields + submit button + privacy note)
```

---

## Quick Checklist — Most Common Tasks

| Task | Where to look |
|------|--------------|
| Change recipient email | `handleSubmit` → `const to = ...` |
| Add CC recipient | `handleSubmit` → `const mailto = ...` |
| Add a new field | `INIT` + `validate` + JSX block + `body` string |
| Remove a field | `INIT` + `validate` + JSX block + `subject`/`body` string |
| Change min message length | `validate` → `message` → `length < 10` |
| Make email optional | `validate` → `email` → remove required check |
| Change success heading | `if (status === "sent")` → `<h3>` |
| Change button colour | `PURPLE` / `PURPLE_DARK` tokens at top of file |
| Change error colour | `formCss` → `.cf-input.error` + `.cf-err` |
| Switch to EmailJS | Replace `handleSubmit` — see Section 9A |
| Switch to Formspree | Replace `handleSubmit` — see Section 9B |

---

*InSource Group · Contact Form Documentation · Prepared by Antigravity · 2025*
