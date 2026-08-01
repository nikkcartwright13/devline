import { useState } from "react";
import { useTranslation } from "react-i18next";
import { T, GRAD, mono, display } from "../theme";
import Seo from "../components/Seo";
import PageHeader from "../components/sections/PageHeader";
import Reveal from "../components/ui/Reveal";
import Icon from "../components/ui/Icon";
import { SERVICE_CATEGORIES } from "../data/services";

const inputStyle = {
  width: "100%", padding: "13px 15px", borderRadius: 10, border: `1px solid ${T.border}`,
  fontSize: 14.5, fontFamily: "inherit", color: T.ink, background: T.panel,
};

const selectStyle = {
  ...inputStyle,
  appearance: "none", WebkitAppearance: "none", MozAppearance: "none", cursor: "pointer",
  paddingRight: 38,
};

const BUDGET_OPTIONS = ["under5k", "5to15k", "15to50k", "50plus", "notSure"];

const CONTACT_ROWS = [
  { key: "email", icon: "Mail", href: "mailto:hello@devline.digital", value: "hello@devline.digital" },
  { key: "address", icon: "MapPin" },
];

export default function ContactPage() {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: "", email: "", service: "", budget: "", message: "" });
  const [sent, setSent] = useState(false);

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`${t("contact.form.subjectPrefix")} — ${form.name || t("contact.form.newContact")}`);
    const extras = [];
    if (form.service) extras.push(`${t("contact.form.servicePlaceholder")}: ${t(`services.categories.${form.service}.title`)}`);
    if (form.budget) extras.push(`${t("contact.form.budgetPlaceholder")}: ${t(`contact.form.budget.${form.budget}`)}`);
    const body = encodeURIComponent(
      `${form.message}\n\n${extras.length ? extras.join("\n") + "\n\n" : ""}— ${form.name} (${form.email})`
    );
    window.location.href = `mailto:hello@devline.digital?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const sendAnother = () => {
    setForm({ name: "", email: "", service: "", budget: "", message: "" });
    setSent(false);
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
        <span aria-hidden style={{
          position: "absolute", top: 6, right: "8%", fontSize: 30, pointerEvents: "none",
          animation: "dl-web-float 3.6s ease-in-out infinite alternate",
        }}>👋</span>
        <span aria-hidden style={{
          position: "absolute", bottom: "18%", left: "4%", fontSize: 26, pointerEvents: "none",
          animation: "dl-web-float 4.2s ease-in-out infinite alternate", animationDelay: ".6s",
        }}>✨</span>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-14" style={{ position: "relative" }}>
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
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ ...mono, fontSize: 11.5, color: T.muted, letterSpacing: ".08em" }}>{t(`contact.getInTouch.${row.key}Label`)}</div>
                      {row.href ? (
                        <a href={row.href} style={{ ...display, fontWeight: 600, fontSize: "clamp(14px,4vw,16.5px)", color: T.ink, textDecoration: "none", wordBreak: "break-word" }}>{row.value}</a>
                      ) : (
                        <div style={{ ...display, fontWeight: 600, fontSize: "clamp(14px,4vw,16.5px)", color: T.ink, wordBreak: "break-word" }}>{t("contact.getInTouch.addressValue")}</div>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>

          <Reveal delay={150}>
            {sent ? (
              <div
                className="dl-card"
                style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 14, background: T.panel, border: `1px solid ${T.border}`, borderRadius: 20, padding: "48px 26px", boxShadow: "0 20px 50px rgba(16,26,51,.06)" }}
              >
                <span
                  aria-hidden
                  className="dl-fade-in"
                  style={{
                    width: 64, height: 64, borderRadius: "50%", background: GRAD, display: "flex", alignItems: "center", justifyContent: "center",
                    animation: "dl-ticket-pop .5s cubic-bezier(.2,.7,.3,1) both",
                  }}
                >
                  <Icon name="Check" size={30} color="#fff" strokeWidth={3} />
                </span>
                <h3 style={{ ...display, fontWeight: 700, fontSize: "clamp(19px,3vw,23px)", color: T.ink, margin: 0 }}>
                  {t("contact.form.successTitle")}
                </h3>
                <p style={{ color: T.muted, fontSize: 14.5, lineHeight: 1.7, margin: 0, maxWidth: 340 }}>
                  {t("contact.form.successText")}
                </p>
                <button
                  type="button"
                  onClick={sendAnother}
                  className="dl-navlink"
                  style={{ marginTop: 6, background: "none", border: `1px solid ${T.border}`, borderRadius: 999, padding: "10px 20px", fontSize: 13.5, fontWeight: 600, color: T.ink, cursor: "pointer" }}
                >
                  {t("contact.form.sendAnother")}
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="dl-card"
                style={{ display: "flex", flexDirection: "column", gap: 14, background: T.panel, border: `1px solid ${T.border}`, borderRadius: 20, padding: 26, boxShadow: "0 20px 50px rgba(16,26,51,.06)" }}
              >
                <input required className="dl-input" placeholder={t("contact.form.namePlaceholder")} value={form.name} onChange={update("name")} style={inputStyle} />
                <input required type="email" className="dl-input" placeholder={t("contact.form.emailPlaceholder")} value={form.email} onChange={update("email")} style={inputStyle} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div style={{ position: "relative" }}>
                    <select className="dl-input" value={form.service} onChange={update("service")} style={{ ...selectStyle, color: form.service ? T.ink : T.muted }}>
                      <option value="">{t("contact.form.servicePlaceholder")}</option>
                      {SERVICE_CATEGORIES.map((cat) => (
                        <option key={cat.key} value={cat.key}>{t(`services.categories.${cat.key}.title`)}</option>
                      ))}
                    </select>
                    <Icon name="ChevronDown" size={15} color={T.muted} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
                  </div>
                  <div style={{ position: "relative" }}>
                    <select className="dl-input" value={form.budget} onChange={update("budget")} style={{ ...selectStyle, color: form.budget ? T.ink : T.muted }}>
                      <option value="">{t("contact.form.budgetPlaceholder")}</option>
                      {BUDGET_OPTIONS.map((key) => (
                        <option key={key} value={key}>{t(`contact.form.budget.${key}`)}</option>
                      ))}
                    </select>
                    <Icon name="ChevronDown" size={15} color={T.muted} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
                  </div>
                </div>
                <textarea required className="dl-input" placeholder={t("contact.form.messagePlaceholder")} rows={5} value={form.message} onChange={update("message")} style={{ ...inputStyle, resize: "vertical" }} />
                <button type="submit" className="dl-btn" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 15, fontWeight: 600, background: GRAD, color: "#fff", padding: "14px 28px", borderRadius: 999, border: "none", cursor: "pointer", width: "fit-content" }}>
                  {t("contact.form.submit").replace("→", "").trim()}
                  <span aria-hidden className="dl-btn-arrow"><Icon name="ArrowRight" size={17} /></span>
                </button>
                <p style={{ fontSize: 12.5, color: T.muted, margin: 0 }}>{t("contact.form.hint")}</p>
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </>
  );
}
