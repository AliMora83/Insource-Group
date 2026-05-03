import { useState } from "react";
import emailjs from "@emailjs/browser";
import { PURPLE_LIGHT, WHITE, CHARCOAL } from "../../constants/theme";
import { CONTACT_DETAILS } from "../../constants/data";
import { Reveal } from "../common/Reveal";
import { Label } from "../common/Label";

const INIT = { name: "", email: "", subject: "", message: "" };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const validate = (f) => ({
  name: !f.name.trim() ? "Full name is required." : "",
  email: !f.email.trim() ? "Email address is required."
       : !EMAIL_RE.test(f.email) ? "Please enter a valid email." : "",
  subject: !f.subject.trim() ? "Subject is required." : "",
  message: !f.message.trim() ? "Message cannot be empty."
         : f.message.trim().length < 10 ? "Please write at least 10 characters." : "",
});

export function Contact() {
  const [fields, setFields] = useState(INIT);
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent
  const [shake, setShake] = useState(false);

  const errors = validate(fields);
  const isClean = Object.values(errors).every(x => !x);

  const handleSubmit = async () => {
    setTouched({ name: true, email: true, subject: true, message: true });
    if (!isClean) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    setStatus("sending");
    
    try {
      await emailjs.send(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        {
          from_name:    fields.name,
          from_email:   fields.email,
          subject:      fields.subject,
          message:      fields.message,
          to_email:     "admin@insourcegroup.co.za",
        },
        "YOUR_PUBLIC_KEY"
      );
      setStatus("sent");
      setFields(INIT);
      setTouched({});
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
    }
  };

  const fieldOf = (key) => ({
    value: fields[key],
    onChange: (e) => {
      setFields({ ...fields, [key]: e.target.value });
      if (status === "error") setStatus("idle");
    },
    className: `cf-input ${touched[key] && errors[key] ? 'error' : ''}`
  });

  const labelColor = (key) => {
    if (touched[key] && errors[key]) return "#E05C7A";
    return "rgba(255,255,255,.5)";
  };

  return (
    <section id="contact" style={{ padding:"120px 64px", background:CHARCOAL, position:"relative", overflow:"hidden" }}>
      <style>{`
        .cf-input {
          width: 100%; padding: 13px 18px; background: rgba(255,255,255,.07); 
          border: 1px solid rgba(255,255,255,.12); border-radius: 2px; 
          color: ${WHITE}; font-size: 14px; font-family: 'DM Sans',sans-serif;
          transition: border-color .25s, background .25s;
          outline: none;
        }
        .cf-input:focus { border-color: ${PURPLE_LIGHT}; }
        .cf-input.error { border-color: #E05C7A !important; background: rgba(224,92,122,.07); }
        .cf-input.valid { border-color: rgba(80,200,140,.55); }
        .cf-err { color: #E05C7A; font-size: 12px; margin-top: 6px; display: flex; gap: 6px; align-items: center; }
        .cf-label { display: block; font-size: 12px; margin-bottom: 8px; font-weight: 500; letter-spacing: 0.05em; transition: color 0.2s; }
        .shake { animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both; }
        @keyframes shake {
          10%, 90% { transform: translate3d(-1px, 0, 0); }
          20%, 80% { transform: translate3d(2px, 0, 0); }
          30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
          40%, 60% { transform: translate3d(4px, 0, 0); }
        }
        .checkmark-circle { stroke-dasharray: 166; stroke-dashoffset: 166; stroke-width: 2; stroke-miterlimit: 10; stroke: ${PURPLE_LIGHT}; fill: none; animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards; }
        .checkmark { width: 56px; height: 56px; border-radius: 50%; display: block; stroke-width: 2; stroke: ${WHITE}; stroke-miterlimit: 10; margin: 0 auto 24px; box-shadow: inset 0px 0px 0px ${PURPLE_LIGHT}; animation: fill .4s ease-in-out .4s forwards, scale .3s ease-in-out .9s both; }
        .checkmark-check { transform-origin: 50% 50%; stroke-dasharray: 48; stroke-dashoffset: 48; animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards; }
        @keyframes stroke { 100% { stroke-dashoffset: 0; } }
        @keyframes scale { 0%, 100% { transform: none; } 50% { transform: scale3d(1.1, 1.1, 1); } }
        @keyframes fill { 100% { box-shadow: inset 0px 0px 0px 30px ${PURPLE_LIGHT}; } }
      `}</style>

      <div style={{ position:"absolute", top:0, right:0, width:400, height:400, borderRadius:"50%", background:`radial-gradient(circle, rgba(139,31,122,.22) 0%, transparent 70%)` }} />
      <div style={{ position:"absolute", bottom:0, left:0, width:260, height:260, borderRadius:"50%", background:`radial-gradient(circle, rgba(176,78,160,.12) 0%, transparent 70%)` }} />

      <div style={{ maxWidth:1140, margin:"0 auto", position:"relative" }}>
        <div className="contact-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:96, alignItems:"start" }}>

          <div>
            <Reveal dir="left">
              <Label light>Contact Us</Label>
              <h2 className="serif" style={{ fontSize:"clamp(32px,4vw,56px)", fontWeight:400, lineHeight:1.1, color:WHITE, marginBottom:22 }}>
                Let's Create<br /><em style={{ color:PURPLE_LIGHT, fontStyle:"italic" }}>Something Great.</em>
              </h2>
              <p style={{ fontSize:15, lineHeight:1.9, color:"rgba(255,255,255,.5)", marginBottom:48, fontWeight:300 }}>
                Ready to elevate your brand or event? Reach out and let's partner to deliver results that exceed every expectation.
              </p>
            </Reveal>

            <Reveal dir="left" delay={150}>
              <div>
                {CONTACT_DETAILS.map(item => (
                  <a key={item.label} href={item.href} className="contact-row" style={{ color:"inherit" }}>
                    <div style={{ width:42, height:42, borderRadius:"50%", background:"rgba(139,31,122,.28)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:15, color:PURPLE_LIGHT, flexShrink:0 }}>
                      {item.sym}
                    </div>
                    <div>
                      <div style={{ fontSize:9, letterSpacing:".18em", textTransform:"uppercase", color:PURPLE_LIGHT, fontWeight:500, marginBottom:4 }}>{item.label}</div>
                      <div style={{ fontSize:14, color:"rgba(255,255,255,.72)" }}>{item.value}</div>
                    </div>
                  </a>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal dir="right" delay={200}>
            <div style={{ background:"rgba(255,255,255,.05)", border:"1px solid rgba(255,255,255,.1)", borderRadius:4, padding:"48px 40px", backdropFilter:"blur(8px)" }}>
              {status === "sent" ? (
                <div style={{ textAlign: "center", padding: "32px 0" }}>
                  <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                    <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
                    <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                  </svg>
                  <h3 style={{ fontFamily:"'DM Sans',sans-serif", fontSize:24, fontWeight:500, color:WHITE, marginBottom:16 }}>Message Sent!</h3>
                  <p style={{ fontSize:15, lineHeight:1.7, color:"rgba(255,255,255,.6)", marginBottom:32 }}>
                    Thank you for reaching out. We have received your message and will be in touch shortly.
                  </p>
                  <button onClick={() => setStatus("idle")} className="btn-outline" style={{ width: "100%" }}>
                    Send Another
                  </button>
                </div>
              ) : status === "error" ? (
                <div style={{ textAlign: "center", padding: "32px 0" }}>
                  <p style={{ color:"#E05C7A", textAlign:"center" }}>
                    <span style={{ fontSize: 32, display: "block", marginBottom: 16 }}>⚠</span>
                    Something went wrong. Please email us directly at<br />
                    <a href="mailto:admin@insourcegroup.co.za" style={{ color:PURPLE_LIGHT, display:"inline-block", marginTop:8 }}>
                      admin@insourcegroup.co.za
                    </a>
                  </p>
                  <button onClick={() => setStatus("idle")} className="btn-outline" style={{ marginTop:24, width: "100%" }}>
                    Try Again
                  </button>
                </div>
              ) : (
                <>
                  <h3 style={{ fontFamily:"'DM Sans',sans-serif", fontSize:26, fontWeight:400, color:WHITE, marginBottom:8 }}>Send a Message</h3>
                  <p style={{ fontSize:14, color:"rgba(255,255,255,.5)", marginBottom:32, fontWeight:300 }}>
                    All fields are required.
                  </p>
                  
                  <div style={{ marginBottom:18 }}>
                    <label className="cf-label" style={{ color: labelColor("name"), textTransform:"uppercase", letterSpacing:"0.08em" }}>FULL NAME</label>
                    <input {...fieldOf("name")} placeholder="e.g. Jane Smith" />
                    {touched.name && errors.name && <div className="cf-err"><span>⚠</span> {errors.name}</div>}
                  </div>

                  <div style={{ marginBottom:18 }}>
                    <label className="cf-label" style={{ color: labelColor("email"), textTransform:"uppercase", letterSpacing:"0.08em" }}>EMAIL ADDRESS</label>
                    <input {...fieldOf("email")} placeholder="you@example.com" type="email" />
                    {touched.email && errors.email && <div className="cf-err"><span>⚠</span> {errors.email}</div>}
                  </div>

                  <div style={{ marginBottom:18 }}>
                    <label className="cf-label" style={{ color: labelColor("subject"), textTransform:"uppercase", letterSpacing:"0.08em" }}>SUBJECT</label>
                    <input {...fieldOf("subject")} placeholder="e.g. Event Management Enquiry" />
                    {touched.subject && errors.subject && <div className="cf-err"><span>⚠</span> {errors.subject}</div>}
                  </div>

                  <div style={{ marginBottom:26 }}>
                    <label className="cf-label" style={{ color: labelColor("message"), textTransform:"uppercase", letterSpacing:"0.08em" }}>MESSAGE <span style={{ textTransform:"none", letterSpacing:"0", color:"rgba(255,255,255,.3)", marginLeft:4 }}>({fields.message.length} / MIN 10 CHARS)</span></label>
                    <textarea {...fieldOf("message")} rows={4} placeholder="Tell us about your project, event, or requirements..." style={{ resize:"vertical", width:"100%", padding:"13px 18px", background:"rgba(255,255,255,.07)", border:"1px solid rgba(255,255,255,.12)", borderRadius:2, color:WHITE, fontSize:14, fontFamily:"'DM Sans',sans-serif", outline:"none", transition: "border-color .25s, background .25s" }} 
                    />
                    {touched.message && errors.message && <div className="cf-err"><span>⚠</span> {errors.message}</div>}
                  </div>

                  <button 
                    onClick={handleSubmit} 
                    disabled={status === "sending"}
                    className={`btn-primary ${shake ? 'shake' : ''}`} 
                    style={{ width:"100%", textAlign:"center", opacity: status === "sending" ? 0.7 : 1, cursor: status === "sending" ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "16px 24px" }}
                  >
                    {status === "sending" ? (
                      "Sending..."
                    ) : (
                      <>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        SEND MESSAGE
                      </>
                    )}
                  </button>
                  <p style={{ textAlign:"center", fontSize:12, color:"rgba(255,255,255,.4)", marginTop:20, lineHeight:1.6 }}>
                    Your details are sent directly to admin@insourcegroup.co.za via your mail client.
                  </p>
                </>
              )}
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}

