import { useState } from "react";
import { useTranslation } from "react-i18next";
import { T, GRAD, mono, display } from "../theme";
import Seo from "../components/Seo";
import PageHeader from "../components/sections/PageHeader";
import Reveal from "../components/ui/Reveal";
import Icon from "../components/ui/Icon";

const inputStyle = {
  width: "100%", padding: "13px 15px", borderRadius: 10, border: `1px solid ${T.border}`,
  fontSize: 14.5, fontFamily: "inherit", color: T.ink, background: "#fff",
};

const CONTACT_ROWS = [
  { key: "email", icon: "Mail", href: "mailto:hello@devline.digital", value: "hello@devline.digital" },
  { key: "phone", icon: "Phone", href: "tel:+995555000000", value: "+995 555 00 00 00" },
  { key: "address", icon: "MapPin" },
];

export default function ContactPage() {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`${t("contact.form.subjectPrefix")} — ${form.name || t("contact.form.newContact")}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:hello@devline.digital?subject=${subject}&body=${body}`;
  };

  return (
    <>
      <Seo title={t("contact.seo.title")} description={t("contact.seo.description")} />
      <PageHeader
        eyebrow={t("contact.header.eyebrow")}
        title={t("contact.header.title")}
        text={t("contact.header.text")}
      />
      <section className="max-w-6xl mx-auto px-5 py-20 md:py-24" style={{ position: "relative", overflow: "hidden" }}>
        <span aria-hidden style={{
          position: "absolute", width: 360, height: 360, top: -140, left: -160, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(79,140,255,.10), transparent 70%)", pointerEvents: "none",
        }} />
        <span aria-hidden style={{
          position: "absolute", width: 300, height: 300, bottom: -120, right: -140, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139,92,246,.10), transparent 70%)", pointerEvents: "none",
        }} />

        <div className="grid md:grid-cols-2 gap-14" style={{ position: "relative" }}>
          <Reveal>
            <p style={{ ...mono, fontSize: 13, letterSpacing: ".12em", color: T.blue }}>{t("contact.getInTouch.eyebrow")}</p>
            <h2 style={{ ...display, fontWeight: 700, fontSize: "clamp(24px,3.5vw,34px)", marginTop: 10 }}>
              {t("contact.getInTouch.title")}
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 30 }}>
              {CONTACT_ROWS.map((row, i) => (
                <Reveal key={row.key} delay={80 + i * 90}>
                  <div
                    className="dl-card dl-contact-row"
                    style={{ display: "flex", alignItems: "center", gap: 16, background: T.panel, border: `1px solid ${T.border}`, borderRadius: 14, padding: "16px 18px" }}
                  >
                    <span aria-hidden className="dl-contact-icon" style={{ width: 42, height: 42, borderRadius: 12, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", background: GRAD }}>
                      <Icon name={row.icon} size={19} />
                    </span>
                    <div>
                      <div style={{ ...mono, fontSize: 11.5, color: T.muted, letterSpacing: ".08em" }}>{t(`contact.getInTouch.${row.key}Label`)}</div>
                      {row.href ? (
                        <a href={row.href} style={{ ...display, fontWeight: 600, fontSize: 16.5, color: T.ink, textDecoration: "none" }}>{row.value}</a>
                      ) : (
                        <div style={{ ...display, fontWeight: 600, fontSize: 16.5, color: T.ink }}>{t("contact.getInTouch.addressValue")}</div>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>

          <Reveal delay={150}>
            <form
              onSubmit={handleSubmit}
              className="dl-card"
              style={{ display: "flex", flexDirection: "column", gap: 14, background: T.panel, border: `1px solid ${T.border}`, borderRadius: 20, padding: 26, boxShadow: "0 20px 50px rgba(16,26,51,.06)" }}
            >
              <input required className="dl-input" placeholder={t("contact.form.namePlaceholder")} value={form.name} onChange={update("name")} style={inputStyle} />
              <input required type="email" className="dl-input" placeholder={t("contact.form.emailPlaceholder")} value={form.email} onChange={update("email")} style={inputStyle} />
              <textarea required className="dl-input" placeholder={t("contact.form.messagePlaceholder")} rows={5} value={form.message} onChange={update("message")} style={{ ...inputStyle, resize: "vertical" }} />
              <button type="submit" className="dl-btn" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 15, fontWeight: 600, background: GRAD, color: "#fff", padding: "14px 28px", borderRadius: 999, border: "none", cursor: "pointer", width: "fit-content" }}>
                {t("contact.form.submit").replace("→", "").trim()}
                <span aria-hidden className="dl-btn-arrow"><Icon name="ArrowRight" size={17} /></span>
              </button>
              <p style={{ fontSize: 12.5, color: T.muted, margin: 0 }}>{t("contact.form.hint")}</p>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}
