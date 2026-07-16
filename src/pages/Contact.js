import { useState } from "react";
import { useTranslation } from "react-i18next";
import { T, GRAD, mono, display } from "../theme";
import Seo from "../components/Seo";
import PageHeader from "../components/sections/PageHeader";
import Reveal from "../components/ui/Reveal";

const inputStyle = {
  width: "100%", padding: "12px 14px", borderRadius: 10, border: `1px solid ${T.border}`,
  fontSize: 14.5, fontFamily: "inherit", color: T.ink, background: "#fff",
};

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
      <section className="max-w-6xl mx-auto px-5 py-20 md:py-24">
        <div className="grid md:grid-cols-2 gap-14">
          <Reveal>
            <p style={{ ...mono, fontSize: 13, letterSpacing: ".12em", color: T.blue }}>{t("contact.getInTouch.eyebrow")}</p>
            <h2 style={{ ...display, fontWeight: 700, fontSize: "clamp(24px,3.5vw,34px)", marginTop: 10 }}>
              {t("contact.getInTouch.title")}
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 18, marginTop: 26 }}>
              <div>
                <div style={{ ...mono, fontSize: 12, color: T.muted, letterSpacing: ".08em" }}>{t("contact.getInTouch.emailLabel")}</div>
                <a href="mailto:hello@devline.digital" style={{ ...display, fontWeight: 600, fontSize: 17, color: T.ink, textDecoration: "none" }}>hello@devline.digital</a>
              </div>
              <div>
                <div style={{ ...mono, fontSize: 12, color: T.muted, letterSpacing: ".08em" }}>{t("contact.getInTouch.phoneLabel")}</div>
                <a href="tel:+995555000000" style={{ ...display, fontWeight: 600, fontSize: 17, color: T.ink, textDecoration: "none" }}>+995 555 00 00 00</a>
              </div>
              <div>
                <div style={{ ...mono, fontSize: 12, color: T.muted, letterSpacing: ".08em" }}>{t("contact.getInTouch.addressLabel")}</div>
                <div style={{ ...display, fontWeight: 600, fontSize: 17, color: T.ink }}>{t("contact.getInTouch.addressValue")}</div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <input required placeholder={t("contact.form.namePlaceholder")} value={form.name} onChange={update("name")} style={inputStyle} />
              <input required type="email" placeholder={t("contact.form.emailPlaceholder")} value={form.email} onChange={update("email")} style={inputStyle} />
              <textarea required placeholder={t("contact.form.messagePlaceholder")} rows={5} value={form.message} onChange={update("message")} style={{ ...inputStyle, resize: "vertical" }} />
              <button type="submit" className="dl-btn" style={{ fontSize: 15, fontWeight: 600, background: GRAD, color: "#fff", padding: "14px 28px", borderRadius: 999, border: "none", cursor: "pointer", width: "fit-content" }}>
                {t("contact.form.submit")}
              </button>
              <p style={{ fontSize: 12.5, color: T.muted, margin: 0 }}>{t("contact.form.hint")}</p>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}
