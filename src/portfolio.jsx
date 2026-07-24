import { useState, useEffect, useRef } from "react";

const C = {
  bg: "#0A0E1A",
  surface: "#111827",
  surfaceLight: "#1E293B",
  accent: "#06B6D4",
  accentGlow: "rgba(6,182,212,0.12)",
  accentSoft: "rgba(6,182,212,0.25)",
  text: "#FFFFFF",
  textMuted: "#B0BEC9",
  border: "#1E293B",
  borderLight: "#334155",
  green: "#34D399",
  headingDim: "#CBD5E1",
};

const PROJECTS = [
  // Add projects here later like:
  // {
  //   title: "Project Name",
  //   tag: "Mechanical Design",
  //   date: "2026",
  //   summary: "Short one-liner about the project.",
  //   description: "Full detailed multi-paragraph description of the project...",
  //   tools: ["SolidWorks", "MATLAB", "3D Printing"],
  //   link: "https://example.com",
  //   image: null,
  // },
];

const BLOG_POSTS = [
  // Add blog posts here later like:
  // {
  //   title: "My First Semester at UIC",
  //   date: "July 2026",
  //   readTime: "5 min read",
  //   tag: "University Life",
  //   excerpt: "A short preview of what the blog post is about...",
  //   content: `Full blog post content goes here. You can write multiple paragraphs.
  //
  //   Use line breaks for new paragraphs. This supports as much text as you want.
  //
  //   Third paragraph here...`,
  //   image: null,
  // },
];

function useReveal() {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, vis];
}

function Reveal({ children, delay = 0, style }) {
  const [ref, vis] = useReveal();
  return (
    <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(28px)", transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`, ...style }}>
      {children}
    </div>
  );
}

function Gear({ size = 40, color = C.accent, style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" style={style}>
      <path d="M20 13a7 7 0 100 14 7 7 0 000-14zm0 11a4 4 0 110-8 4 4 0 010 8z" fill={color} opacity="0.7" />
      <path d="M35.6 17.2l-3.1-.5a12.6 12.6 0 00-1.5-3.6l1.8-2.6a1 1 0 00-.1-1.3l-1.9-1.9a1 1 0 00-1.3-.1l-2.6 1.8a12.6 12.6 0 00-3.6-1.5l-.5-3.1a1 1 0 00-1-.8h-2.6a1 1 0 00-1 .8l-.5 3.1a12.6 12.6 0 00-3.6 1.5l-2.6-1.8a1 1 0 00-1.3.1l-1.9 1.9a1 1 0 00-.1 1.3l1.8 2.6a12.6 12.6 0 00-1.5 3.6l-3.1.5a1 1 0 00-.8 1v2.6a1 1 0 00.8 1l3.1.5a12.6 12.6 0 001.5 3.6l-1.8 2.6a1 1 0 00.1 1.3l1.9 1.9a1 1 0 001.3.1l2.6-1.8a12.6 12.6 0 003.6 1.5l.5 3.1a1 1 0 001 .8h2.6a1 1 0 001-.8l.5-3.1a12.6 12.6 0 003.6-1.5l2.6 1.8a1 1 0 001.3-.1l1.9-1.9a1 1 0 00.1-1.3l-1.8-2.6a12.6 12.6 0 001.5-3.6l3.1-.5a1 1 0 00.8-1v-2.6a1 1 0 00-.8-1z" fill={color} opacity="0.2" />
    </svg>
  );
}

function ArrowLeft() { return <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 10H5m0 0l5-5m-5 5l5 5" /></svg>; }
function ArrowRight() { return <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1l7 7-7 7-1.4-1.4L11.2 9H1V7h10.2L6.6 2.4z" /></svg>; }
function ExtLink() { return <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M4 1h7v1.5H6.5L14 10l-1 1-7.5-7.5V8H4z" /></svg>; }

function ProjectDetail({ project, index, onBack }) {
  useEffect(() => { window.scrollTo({ top: 0 }); }, []);
  return (
    <div style={{ minHeight: "100vh", padding: "100px 24px 80px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <button onClick={onBack} className="back-btn"><ArrowLeft /> Back to Projects</button>
        <Reveal>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16, marginTop: 32 }}>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 48, fontWeight: 800, color: C.accentSoft, lineHeight: 1 }}>{String(index + 1).padStart(2, "0")}</span>
            {project.tag && <span className="tag">{project.tag}</span>}
          </div>
          <h1 style={{ fontSize: "clamp(28px,5vw,44px)", fontWeight: 800, letterSpacing: "-1px", marginBottom: 8 }}>{project.title}</h1>
          {project.date && <p style={{ color: C.textMuted, fontSize: 14, fontFamily: "'JetBrains Mono',monospace", marginBottom: 32 }}>{project.date}</p>}
        </Reveal>
        {project.image && <Reveal delay={0.1}><div style={{ borderRadius: 12, overflow: "hidden", border: `1px solid ${C.border}`, marginBottom: 40 }}><img src={project.image} alt={project.title} style={{ width: "100%", display: "block" }} /></div></Reveal>}
        <Reveal delay={0.15}><div style={{ fontSize: 16, lineHeight: 1.8, color: C.textMuted, marginBottom: 40, whiteSpace: "pre-wrap" }}>{project.description || project.summary}</div></Reveal>
        {project.tools && project.tools.length > 0 && (
          <Reveal delay={0.2}>
            <h3 style={{ fontSize: 14, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1.5, color: C.accent, fontFamily: "'JetBrains Mono',monospace", marginBottom: 12 }}>Tools & Technologies</h3>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 40 }}>
              {project.tools.map((t, i) => <span key={i} style={{ padding: "6px 14px", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 6, fontSize: 13, fontFamily: "'JetBrains Mono',monospace", color: C.text }}>{t}</span>)}
            </div>
          </Reveal>
        )}
        {project.link && <Reveal delay={0.25}><a href={project.link} target="_blank" rel="noopener noreferrer" className="btn-primary">Visit Project <ExtLink /></a></Reveal>}
      </div>
    </div>
  );
}

function ProjectsList({ onSelect, onBack }) {
  useEffect(() => { window.scrollTo({ top: 0 }); }, []);
  return (
    <div style={{ minHeight: "100vh", padding: "100px 24px 80px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <button onClick={onBack} className="back-btn"><ArrowLeft /> Back to Home</button>
        <Reveal>
          <div style={{ marginTop: 32, marginBottom: 12, display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 32, height: 2, background: C.accent }} />
            <span className="label">Portfolio</span>
          </div>
          <h1 style={{ fontSize: "clamp(32px,5vw,52px)", fontWeight: 800, letterSpacing: "-1.5px", marginBottom: 12 }}>Projects <span style={{ color: C.headingDim }}>& work.</span></h1>
          <p style={{ color: C.textMuted, fontSize: 16, maxWidth: 540, lineHeight: 1.7, marginBottom: 48 }}>A collection of engineering projects, designs, and things I've built. Each one taught me something new.</p>
        </Reveal>

        {PROJECTS.length === 0 ? (
          <Reveal delay={0.1}>
            <div style={{ background: C.surface, border: `1.5px dashed ${C.borderLight}`, borderRadius: 16, padding: "72px 32px", textAlign: "center" }}>
              <Gear size={56} color={C.textMuted} style={{ margin: "0 auto 20px", display: "block", opacity: 0.35, animation: "spin 12s linear infinite" }} />
              <h3 style={{ fontSize: 22, fontWeight: 600, marginBottom: 12 }}>Coming Soon</h3>
              <p style={{ color: C.textMuted, fontSize: 15, maxWidth: 400, margin: "0 auto", lineHeight: 1.6 }}>Engineering projects are on the way. Check back soon.</p>
            </div>
          </Reveal>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {PROJECTS.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="project-card" onClick={() => onSelect(i)} style={{ display: "flex", alignItems: "center", gap: 20, cursor: "pointer" }}>
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 32, fontWeight: 800, color: C.accentSoft, minWidth: 56, textAlign: "right", lineHeight: 1 }}>{String(i + 1).padStart(2, "0")}</span>
                  <div style={{ flex: 1, borderLeft: `2px solid ${C.border}`, paddingLeft: 20 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4, flexWrap: "wrap" }}>
                      <h3 style={{ fontSize: 18, fontWeight: 600 }}>{p.title}</h3>
                      {p.tag && <span className="tag" style={{ fontSize: 10 }}>{p.tag}</span>}
                    </div>
                    <p style={{ color: C.textMuted, fontSize: 14, lineHeight: 1.5 }}>{p.summary}</p>
                  </div>
                  <div style={{ color: C.textMuted, flexShrink: 0 }}><ArrowRight /></div>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── CONTACT FORM ───
function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const inputStyle = {
    width: "100%", padding: "14px 16px", background: C.bg, border: `1px solid ${C.border}`,
    borderRadius: 8, color: C.text, fontSize: 15, fontFamily: "inherit", outline: "none",
    transition: "border-color 0.2s",
  };

  const handleFocus = (e) => { e.target.style.borderColor = C.accent; };
  const handleBlur = (e) => { e.target.style.borderColor = C.border; };

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
    setStatus("sending");
    try {
      const res = await fetch("https://formsubmit.co/ajax/mgbidak@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          _subject: `Portfolio Contact: ${form.name}`,
        }),
      });
      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      // Fallback: open mailto
      const subject = encodeURIComponent(`Portfolio Contact: ${form.name}`);
      const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
      window.open(`mailto:mgbidak@gmail.com?subject=${subject}&body=${body}`, "_blank");
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    }
  };

  return (
    <div style={{ marginTop: 40, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: "32px 28px" }}>
      <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 6 }}>Send me a message</h3>
      <p style={{ color: C.textMuted, fontSize: 14, marginBottom: 24 }}>Fill out the form and I'll get back to you as soon as possible.</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 14, marginBottom: 14 }}>
        <div>
          <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 6, color: C.textMuted }}>Name</label>
          <input
            type="text" placeholder="Your name" style={inputStyle}
            value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
            onFocus={handleFocus} onBlur={handleBlur}
          />
        </div>
        <div>
          <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 6, color: C.textMuted }}>Email</label>
          <input
            type="email" placeholder="your@email.com" style={inputStyle}
            value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
            onFocus={handleFocus} onBlur={handleBlur}
          />
        </div>
      </div>

      <div style={{ marginBottom: 20 }}>
        <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 6, color: C.textMuted }}>Message</label>
        <textarea
          placeholder="Tell me about your project or just say hi..." rows={5}
          style={{ ...inputStyle, resize: "vertical", minHeight: 120 }}
          value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
          onFocus={handleFocus} onBlur={handleBlur}
        />
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <button
          className="btn-primary"
          onClick={handleSubmit}
          disabled={status === "sending" || !form.name.trim() || !form.email.trim() || !form.message.trim()}
          style={{
            opacity: (!form.name.trim() || !form.email.trim() || !form.message.trim()) ? 0.4 : 1,
            cursor: (!form.name.trim() || !form.email.trim() || !form.message.trim()) ? "not-allowed" : "pointer",
          }}
        >
          {status === "sending" ? (
            <><svg width="16" height="16" viewBox="0 0 16 16" style={{ animation: "spin 1s linear infinite" }}><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="28" strokeDashoffset="8" /></svg> Sending...</>
          ) : (
            <>Send Message <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 2L11 13"/><path d="M22 2L15 22L11 13L2 9L22 2Z"/></svg></>
          )}
        </button>

        {status === "sent" && (
          <span style={{ color: C.green, fontSize: 14, fontWeight: 500, display: "flex", alignItems: "center", gap: 6 }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke={C.green} strokeWidth="2"><path d="M3 8l3.5 3.5L13 5" /></svg>
            Message sent!
          </span>
        )}
        {status === "error" && (
          <span style={{ color: "#EF4444", fontSize: 14, fontWeight: 500 }}>
            Something went wrong. Please try again or email directly.
          </span>
        )}
      </div>
    </div>
  );
}

// ─── BLOG POST DETAIL ───
function BlogPost({ post, onBack }) {
  useEffect(() => { window.scrollTo({ top: 0 }); }, []);
  return (
    <div style={{ minHeight: "100vh", padding: "100px 24px 80px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <button onClick={onBack} className="back-btn"><ArrowLeft /> Back to Blog</button>
        <Reveal>
          <div style={{ marginTop: 32 }}>
            {post.tag && <span className="tag" style={{ marginBottom: 16, display: "inline-block" }}>{post.tag}</span>}
            <h1 style={{ fontSize: "clamp(28px,5vw,42px)", fontWeight: 800, letterSpacing: "-1px", marginBottom: 12, lineHeight: 1.15 }}>{post.title}</h1>
            <div style={{ display: "flex", gap: 16, alignItems: "center", color: C.textMuted, fontSize: 13, fontFamily: "'JetBrains Mono',monospace", marginBottom: 40 }}>
              {post.date && <span>{post.date}</span>}
              {post.readTime && <><span style={{ opacity: 0.4 }}>·</span><span>{post.readTime}</span></>}
            </div>
          </div>
        </Reveal>
        {post.image && (
          <Reveal delay={0.1}>
            <div style={{ borderRadius: 12, overflow: "hidden", border: `1px solid ${C.border}`, marginBottom: 40 }}>
              <img src={post.image} alt={post.title} style={{ width: "100%", display: "block" }} />
            </div>
          </Reveal>
        )}
        <Reveal delay={0.15}>
          <div style={{ fontSize: 16, lineHeight: 1.9, color: C.textMuted, whiteSpace: "pre-wrap" }}>
            {post.content || post.excerpt}
          </div>
        </Reveal>
      </div>
    </div>
  );
}

// ─── BLOG LIST ───
function BlogList({ onSelect, onBack }) {
  useEffect(() => { window.scrollTo({ top: 0 }); }, []);
  return (
    <div style={{ minHeight: "100vh", padding: "100px 24px 80px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <button onClick={onBack} className="back-btn"><ArrowLeft /> Back to Home</button>
        <Reveal>
          <div style={{ marginTop: 32, marginBottom: 12, display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 32, height: 2, background: C.accent }} />
            <span className="label">Blog</span>
          </div>
          <h1 style={{ fontSize: "clamp(32px,5vw,52px)", fontWeight: 800, letterSpacing: "-1.5px", marginBottom: 12 }}>
            Thoughts <span style={{ color: C.headingDim }}>& stories.</span>
          </h1>
          <p style={{ color: C.textMuted, fontSize: 16, maxWidth: 540, lineHeight: 1.7, marginBottom: 48 }}>
            Writing about engineering, university life, projects, and everything in between.
          </p>
        </Reveal>

        {BLOG_POSTS.length === 0 ? (
          <Reveal delay={0.1}>
            <div style={{ background: C.surface, border: `1.5px dashed ${C.borderLight}`, borderRadius: 16, padding: "72px 32px", textAlign: "center" }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={C.textMuted} strokeWidth="1.2" style={{ margin: "0 auto 20px", display: "block", opacity: 0.4 }}>
                <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>
              </svg>
              <h3 style={{ fontSize: 22, fontWeight: 600, marginBottom: 12 }}>Coming Soon</h3>
              <p style={{ color: C.textMuted, fontSize: 15, maxWidth: 400, margin: "0 auto", lineHeight: 1.6 }}>
                Blog posts are on the way. Stay tuned for stories and insights.
              </p>
            </div>
          </Reveal>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(340px,1fr))", gap: 20 }}>
            {BLOG_POSTS.map((post, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="card" onClick={() => onSelect(i)} style={{ cursor: "pointer", display: "flex", flexDirection: "column", height: "100%" }}>
                  {post.image && (
                    <div style={{ borderRadius: 8, overflow: "hidden", marginBottom: 16, aspectRatio: "16/9" }}>
                      <img src={post.image} alt={post.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                  )}
                  <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 10, flexWrap: "wrap" }}>
                    {post.tag && <span className="tag" style={{ fontSize: 10 }}>{post.tag}</span>}
                    <span style={{ color: C.textMuted, fontSize: 12, fontFamily: "'JetBrains Mono',monospace" }}>{post.date}</span>
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8, lineHeight: 1.3 }}>{post.title}</h3>
                  <p style={{ color: C.textMuted, fontSize: 14, lineHeight: 1.6, flex: 1 }}>{post.excerpt}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 16, color: C.accent, fontSize: 13, fontWeight: 600 }}>
                    Read more <ArrowRight />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [view, setView] = useState("home");
  const [selProj, setSelProj] = useState(null);
  const [selPost, setSelPost] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const goHome = () => { setView("home"); setSelProj(null); setSelPost(null); setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 50); };
  const goProjects = () => { setView("projects"); setMenuOpen(false); };
  const goDetail = (i) => { setSelProj(i); setView("detail"); };
  const goBlog = () => { setView("blog"); setMenuOpen(false); };
  const goBlogPost = (i) => { setSelPost(i); setView("blogpost"); };

  const scrollTo = (id) => {
    setMenuOpen(false);
    if (view !== "home") { setView("home"); setSelProj(null); setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 120); }
    else document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ background: C.bg, color: C.text, minHeight: "100vh", fontFamily: "'Inter','Segoe UI',system-ui,sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700;800&display=swap');
        *{margin:0;padding:0;box-sizing:border-box}
        html{scroll-behavior:smooth}
        body{background:${C.bg}}
        h1,h2,h3{color:${C.accent}}
        ::selection{background:${C.accent};color:${C.bg}}
        @keyframes float{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-10px) rotate(6deg)}}
        @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        .label{color:${C.accent};font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:1.5px;font-family:'JetBrains Mono',monospace}
        .tag{display:inline-block;padding:4px 12px;background:${C.accentGlow};color:${C.accent};border-radius:20px;font-size:11px;font-weight:600;letter-spacing:.5px;text-transform:uppercase;font-family:'JetBrains Mono',monospace}
        .nav-link{cursor:pointer;padding:6px 14px;border-radius:6px;font-size:14px;font-weight:500;transition:all .25s;border:none;background:none;color:${C.textMuted};font-family:inherit}
        .nav-link:hover{color:${C.text};background:${C.surfaceLight}}
        .btn-primary{display:inline-flex;align-items:center;gap:8px;padding:14px 28px;background:${C.accent};color:${C.bg};border:none;border-radius:8px;font-size:15px;font-weight:600;cursor:pointer;transition:all .3s;text-decoration:none;font-family:inherit}
        .btn-primary:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(6,182,212,.3)}
        .btn-outline{display:inline-flex;align-items:center;gap:8px;padding:14px 28px;background:transparent;color:${C.text};border:1.5px solid ${C.borderLight};border-radius:8px;font-size:15px;font-weight:500;cursor:pointer;transition:all .3s;text-decoration:none;font-family:inherit}
        .btn-outline:hover{border-color:${C.accent};color:${C.accent}}
        .card{background:${C.surface};border:1px solid ${C.border};border-radius:12px;padding:24px;transition:all .3s}
        .card:hover{border-color:${C.accent};transform:translateY(-2px);box-shadow:0 8px 28px rgba(0,0,0,.3)}
        .project-card{background:${C.surface};border:1px solid ${C.border};border-radius:12px;padding:24px 28px;transition:all .3s}
        .project-card:hover{border-color:${C.accent};transform:translateX(4px);box-shadow:0 4px 20px rgba(0,0,0,.3)}
        .back-btn{display:inline-flex;align-items:center;gap:8px;background:none;border:none;color:${C.textMuted};font-size:14px;cursor:pointer;font-family:inherit;padding:8px 0;transition:color .2s}
        .back-btn:hover{color:${C.accent}}
        .grid-bg{position:absolute;inset:0;background-image:linear-gradient(${C.border} 1px,transparent 1px),linear-gradient(90deg,${C.border} 1px,transparent 1px);background-size:60px 60px;opacity:.2;pointer-events:none}
        a{color:${C.accent};text-decoration:none;transition:opacity .2s}
        a:hover{opacity:.8}
        .hamburger{display:none;background:none;border:none;cursor:pointer;padding:8px}
        @media(max-width:768px){
          .hamburger{display:block}
          .desktop-nav{display:none!important}
          .hero-flex{flex-direction:column-reverse!important;text-align:center}
          .hero-btns{justify-content:center!important}
          .big-name{font-size:40px!important}
        }
      `}</style>

      {/* NAV */}
      <nav style={{ position:"fixed",top:0,left:0,right:0,zIndex:100,background:scrolled?`${C.bg}ee`:"transparent",backdropFilter:scrolled?"blur(16px)":"none",borderBottom:scrolled?`1px solid ${C.border}`:"1px solid transparent",transition:"all .3s" }}>
        <div style={{ maxWidth:1100,margin:"0 auto",padding:"0 24px",height:64,display:"flex",alignItems:"center",justifyContent:"space-between" }}>
          <div style={{ display:"flex",alignItems:"center",gap:10,cursor:"pointer" }} onClick={goHome}>
            <Gear size={26} />
            <span style={{ fontWeight:700,fontSize:15,letterSpacing:"-.3px" }}>MGB</span>
          </div>
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={C.text} strokeWidth="2">
              {menuOpen ? <path d="M6 6l12 12M6 18L18 6" /> : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>}
            </svg>
          </button>
          <div className="desktop-nav" style={{ display:"flex",gap:4,alignItems:"center" }}>
            <button className="nav-link" onClick={() => scrollTo("home")}>Home</button>
            <button className="nav-link" onClick={() => scrollTo("about")}>About</button>
            <button className="nav-link" onClick={goProjects}>Projects</button>
            <button className="nav-link" onClick={goBlog}>Blog</button>
            <button className="nav-link" onClick={() => scrollTo("contact")}>Contact</button>
          </div>
          {menuOpen && (
            <div style={{ display:"flex",flexDirection:"column",position:"absolute",top:64,left:0,right:0,background:C.surface,borderBottom:`1px solid ${C.border}`,padding:12,gap:4,zIndex:99 }}>
              <button className="nav-link" onClick={() => scrollTo("home")}>Home</button>
              <button className="nav-link" onClick={() => scrollTo("about")}>About</button>
              <button className="nav-link" onClick={goProjects}>Projects</button>
              <button className="nav-link" onClick={goBlog}>Blog</button>
              <button className="nav-link" onClick={() => scrollTo("contact")}>Contact</button>
            </div>
          )}
        </div>
      </nav>

      {view === "projects" && <ProjectsList onSelect={goDetail} onBack={goHome} />}
      {view === "detail" && selProj !== null && <ProjectDetail project={PROJECTS[selProj]} index={selProj} onBack={goProjects} />}
      {view === "blog" && <BlogList onSelect={goBlogPost} onBack={goHome} />}
      {view === "blogpost" && selPost !== null && <BlogPost post={BLOG_POSTS[selPost]} onBack={goBlog} />}

      {view === "home" && (
        <>
          {/* HERO */}
          <section id="home" style={{ position:"relative",minHeight:"100vh",display:"flex",alignItems:"center",overflow:"hidden" }}>
            <div className="grid-bg" />
            <Gear size={140} color={C.accent} style={{ position:"absolute",right:"6%",top:"12%",opacity:.06,animation:"float 9s ease-in-out infinite" }} />
            <Gear size={90} color={C.green} style={{ position:"absolute",left:"4%",bottom:"18%",opacity:.04,animation:"float 7s ease-in-out infinite 1.5s" }} />

            <div className="hero-flex" style={{ maxWidth:1100,margin:"0 auto",padding:"120px 24px 80px",display:"flex",alignItems:"center",gap:56,flexWrap:"wrap",position:"relative",zIndex:1 }}>
              <div style={{ flex:"1 1 480px" }}>
                <div className="tag" style={{ marginBottom:20 }}>Mechanical Engineering · UIC</div>
                <h1 className="big-name" style={{
                  fontSize:"clamp(44px,6.5vw,68px)",fontWeight:900,lineHeight:1.05,
                  letterSpacing:"-2px",marginBottom:10,
                  background:`linear-gradient(135deg, ${C.text} 30%, ${C.accent} 100%)`,
                  WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",
                }}>
                  Mustafa Gokberk<br/>Bidak
                </h1>
                <p style={{ fontSize:14,fontFamily:"'JetBrains Mono',monospace",color:C.accent,marginBottom:20,letterSpacing:.5,opacity:.8 }}>
                  Design it. Build it. Understand it.
                </p>
                <p style={{ fontSize:17,lineHeight:1.7,color:C.textMuted,maxWidth:520,marginBottom:36 }}>
                  Mechanical Engineering student at the University of Illinois at Chicago with a passion for designing, building, and understanding how things work.
                </p>
                <div className="hero-btns" style={{ display:"flex",gap:14,flexWrap:"wrap" }}>
                  <button className="btn-primary" onClick={goProjects}>View My Work <ArrowRight /></button>
                  <button className="btn-outline" onClick={() => scrollTo("contact")}>Let's Connect</button>
                </div>
              </div>

              <div style={{ flex:"0 0 auto",position:"relative" }}>
                <div style={{
                  width:280,height:340,borderRadius:16,overflow:"hidden",
                  border:`2px solid ${C.border}`,
                  background:`linear-gradient(135deg,${C.surface},${C.surfaceLight})`,
                  display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:16,
                  boxShadow:`0 24px 64px rgba(0,0,0,.4), inset 0 0 80px ${C.accentGlow}`,
                }}>
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke={C.textMuted} strokeWidth="1.2"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 4-6 8-6s8 2 8 6"/></svg>
                  <span style={{ color:C.textMuted,fontSize:13,fontFamily:"'JetBrains Mono',monospace" }}>photo coming soon</span>
                </div>
                <div style={{ position:"absolute",bottom:-12,left:-12,padding:"8px 16px",background:C.surface,border:`1px solid ${C.border}`,borderRadius:8,fontSize:13,color:C.textMuted,fontFamily:"'JetBrains Mono',monospace" }}>
                  Chicago · UIC · 2030
                </div>
              </div>
            </div>
          </section>

          {/* ABOUT */}
          <Reveal style={{ padding:"100px 24px" }}>
            <section id="about" style={{ maxWidth:1100,margin:"0 auto" }}>
              <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:12 }}>
                <div style={{ width:32,height:2,background:C.accent }} />
                <span className="label">Who I am</span>
              </div>
              <h2 style={{ fontSize:"clamp(28px,4vw,40px)",fontWeight:700,letterSpacing:"-.8px",marginBottom:40 }}>
                Curious mind. <span style={{ color:C.headingDim }}>Future engineer.</span>
              </h2>
              <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:32 }}>
                <div>
                  <p style={{ fontSize:16,lineHeight:1.8,color:C.textMuted,marginBottom:24 }}>
                    I'm Mustafa Gokberk Bidak — a Mechanical Engineering student at UIC with a passion for designing, building, and understanding how things work. I love exploring new technologies, improving my engineering skills, and taking on projects that challenge me to think creatively.
                  </p>
                  <p style={{ fontSize:16,lineHeight:1.8,color:C.textMuted }}>
                    I'm always looking for opportunities to learn, grow, and contribute to meaningful engineering solutions. Whether it's a hands-on project, a new concept, or a real-world challenge — I'm ready to dive in.
                  </p>
                </div>
                <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
                  {[
                    { icon:"🎓", title:"Mechanical Engineering", desc:"University of Illinois at Chicago" },
                    { icon:"📍", title:"Based in Chicago", desc:"Illinois, United States" },
                    { icon:"⚙️", title:"Passionate Builder", desc:"Design · Build · Understand" },
                  ].map((item, i) => (
                    <div key={i} className="card" style={{ display:"flex",gap:16,alignItems:"center",padding:20 }}>
                      <div style={{ fontSize:26,width:46,height:46,display:"flex",alignItems:"center",justifyContent:"center",background:C.accentGlow,borderRadius:10 }}>{item.icon}</div>
                      <div>
                        <div style={{ fontWeight:600,fontSize:15,marginBottom:2 }}>{item.title}</div>
                        <div style={{ color:C.textMuted,fontSize:13 }}>{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </Reveal>

          {/* PROJECTS PREVIEW */}
          <Reveal style={{ padding:"40px 24px 100px" }}>
            <section style={{ maxWidth:1100,margin:"0 auto" }}>
              <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:12 }}>
                <div style={{ width:32,height:2,background:C.accent }} />
                <span className="label">Portfolio</span>
              </div>
              <h2 style={{ fontSize:"clamp(28px,4vw,40px)",fontWeight:700,letterSpacing:"-.8px",marginBottom:16 }}>
                Projects <span style={{ color:C.headingDim }}>& work.</span>
              </h2>
              <p style={{ color:C.textMuted,fontSize:16,marginBottom:36,maxWidth:480 }}>
                {PROJECTS.length === 0 ? "Projects are on the way — check back soon." : `${PROJECTS.length} project${PROJECTS.length > 1 ? "s" : ""} and counting.`}
              </p>
              <button className="btn-outline" onClick={goProjects}>
                {PROJECTS.length === 0 ? "View Projects Page" : "View All Projects"} <ArrowRight />
              </button>
            </section>
          </Reveal>

          {/* BLOG PREVIEW */}
          <Reveal style={{ padding:"0 24px 100px" }}>
            <section style={{ maxWidth:1100,margin:"0 auto" }}>
              <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:12 }}>
                <div style={{ width:32,height:2,background:C.accent }} />
                <span className="label">Blog</span>
              </div>
              <h2 style={{ fontSize:"clamp(28px,4vw,40px)",fontWeight:700,letterSpacing:"-.8px",marginBottom:16 }}>
                Thoughts <span style={{ color:C.headingDim }}>& stories.</span>
              </h2>
              {BLOG_POSTS.length === 0 ? (
                <p style={{ color:C.textMuted,fontSize:16,marginBottom:36,maxWidth:480 }}>Blog posts are coming soon — stories about engineering, university life, and more.</p>
              ) : (
                <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:16,marginBottom:36 }}>
                  {BLOG_POSTS.slice(0,3).map((post,i) => (
                    <div key={i} className="card" onClick={() => { goBlogPost(i); }} style={{ cursor:"pointer" }}>
                      <div style={{ display:"flex",gap:8,alignItems:"center",marginBottom:8 }}>
                        {post.tag && <span className="tag" style={{ fontSize:10 }}>{post.tag}</span>}
                        <span style={{ color:C.textMuted,fontSize:11,fontFamily:"'JetBrains Mono',monospace" }}>{post.date}</span>
                      </div>
                      <h3 style={{ fontSize:16,fontWeight:600,marginBottom:6,lineHeight:1.3 }}>{post.title}</h3>
                      <p style={{ color:C.textMuted,fontSize:13,lineHeight:1.5 }}>{post.excerpt}</p>
                    </div>
                  ))}
                </div>
              )}
              <button className="btn-outline" onClick={goBlog}>
                {BLOG_POSTS.length === 0 ? "View Blog" : "Read All Posts"} <ArrowRight />
              </button>
            </section>
          </Reveal>

          {/* RESUME */}
          <Reveal style={{ padding:"0 24px 100px" }}>
            <div style={{ maxWidth:1100,margin:"0 auto" }}>
              <div style={{ background:`linear-gradient(135deg,${C.surface},${C.surfaceLight})`,border:`1.5px dashed ${C.borderLight}`,borderRadius:16,padding:"48px 32px",textAlign:"center" }}>
                <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke={C.textMuted} strokeWidth="1.5" style={{ marginBottom:14 }}>
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
                </svg>
                <h3 style={{ fontSize:20,fontWeight:600,marginBottom:8 }}>Resume</h3>
                <p style={{ color:C.textMuted,fontSize:14 }}>Resume will be available for download soon.</p>
              </div>
            </div>
          </Reveal>

          {/* CONTACT */}
          <Reveal style={{ padding:"0 24px 80px" }}>
            <section id="contact" style={{ maxWidth:1100,margin:"0 auto" }}>
              <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:12 }}>
                <div style={{ width:32,height:2,background:C.accent }} />
                <span className="label">Get in touch</span>
              </div>
              <h2 style={{ fontSize:"clamp(28px,4vw,40px)",fontWeight:700,letterSpacing:"-.8px",marginBottom:16 }}>Let's connect.</h2>
              <p style={{ color:C.textMuted,fontSize:16,lineHeight:1.7,maxWidth:520,marginBottom:36 }}>Whether you have a project idea, an opportunity, or just want to say hello — I'd love to hear from you.</p>
              <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:14 }}>
                {[
                  { label:"LinkedIn", value:"/in/mustafa-gokberk-bidak", href:"https://www.linkedin.com/in/mustafa-gokberk-bidak-09749739b/", icon:<svg width="22" height="22" viewBox="0 0 24 24" fill={C.accent}><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
                  { label:"Email", value:"mgbidak@gmail.com", href:"mailto:mgbidak@gmail.com", icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C.accent} strokeWidth="1.5"><rect x="2" y="4" width="20" height="16" rx="3"/><path d="M2 7l10 6 10-6"/></svg> },
                ].map((c, i) => (
                  <a key={i} href={c.href||undefined} target={c.href?"_blank":undefined} rel="noopener noreferrer" className="card" style={{ display:"flex",alignItems:"center",gap:16,textDecoration:"none",color:C.text,cursor:c.href?"pointer":"default",opacity:c.href?1:.5 }}>
                    <div style={{ width:44,height:44,display:"flex",alignItems:"center",justifyContent:"center",background:C.accentGlow,borderRadius:10,flexShrink:0 }}>{c.icon}</div>
                    <div>
                      <div style={{ fontWeight:600,fontSize:14 }}>{c.label}</div>
                      <div style={{ color:C.textMuted,fontSize:12,fontFamily:"'JetBrains Mono',monospace" }}>{c.value}</div>
                    </div>
                  </a>
                ))}
              </div>

              {/* CONTACT FORM */}
              <ContactForm />
            </section>
          </Reveal>

          {/* CTA */}
          <Reveal style={{ padding:"20px 24px 100px" }}>
            <div style={{ maxWidth:800,margin:"0 auto",textAlign:"center",background:`linear-gradient(135deg,${C.surface},${C.surfaceLight})`,border:`1px solid ${C.border}`,borderRadius:20,padding:"56px 32px",position:"relative",overflow:"hidden" }}>
              <div style={{ position:"absolute",top:-50,right:-50,width:220,height:220,background:C.accentGlow,borderRadius:"50%",filter:"blur(80px)" }} />
              <h2 style={{ fontSize:"clamp(24px,3.5vw,34px)",fontWeight:700,marginBottom:16,position:"relative" }}>Let's build something <span style={{ color:C.accent }}>together.</span></h2>
              <p style={{ color:C.textMuted,fontSize:15,maxWidth:480,margin:"0 auto 28px",lineHeight:1.7,position:"relative" }}>If you're working on a project, have an idea, or just want to connect — reach out. Always open to a good conversation.</p>
              <a href="https://www.linkedin.com/in/mustafa-gokberk-bidak-09749739b/" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ position:"relative" }}>Connect on LinkedIn <ExtLink /></a>
            </div>
          </Reveal>
        </>
      )}

      {/* FOOTER */}
      <footer style={{ borderTop:`1px solid ${C.border}`,padding:"40px 24px",textAlign:"center" }}>
        <div style={{ maxWidth:1100,margin:"0 auto" }}>
          <div style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:10,marginBottom:12 }}>
            <Gear size={18} />
            <span style={{ fontWeight:700,fontSize:14 }}>Mustafa Gokberk Bidak</span>
          </div>
          <p style={{ color:C.textMuted,fontSize:13,marginBottom:16 }}>Mechanical Engineering · University of Illinois at Chicago</p>
          <div style={{ display:"flex",gap:20,justifyContent:"center",marginBottom:20 }}>
            <a href="https://www.linkedin.com/in/mustafa-gokberk-bidak-09749739b/" target="_blank" rel="noopener noreferrer" style={{ color:C.textMuted }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
          </div>
          <p style={{ color:C.textMuted,fontSize:12,opacity:.5 }}>© 2026 Mustafa Gokberk Bidak. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}