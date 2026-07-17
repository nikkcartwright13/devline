import { T, GRAD, mono, display } from "../../theme";
import { STEPS } from "../../data/process";
import Reveal from "../ui/Reveal";

export default function Process() {
  return (
    <section id="process" style={{ background: "#EFF3F9", borderBottom: `1px solid ${T.border}` }}>
      <div className="max-w-6xl mx-auto px-5 py-20 md:py-24">
        <Reveal>
          <p style={{ ...mono, fontSize: 13, letterSpacing: ".12em", color: T.blue }}>PROCESS</p>
          <h2 style={{ ...display, fontWeight: 700, fontSize: "clamp(26px,4vw,40px)", marginTop: 10 }}>როგორ ვმუშაობთ</h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
          {STEPS.map((st, i) => (
            <Reveal key={st.n} delay={i * 100}>
              <div className="dl-card" style={{ background: T.panel, border: `1px solid ${T.border}`, borderRadius: 16, padding: "26px 24px", height: "100%", position: "relative" }}>
                <span style={{ ...display, fontWeight: 700, fontSize: 40, background: GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", opacity: 0.9 }}>{st.n}</span>
                <h3 style={{ ...display, fontWeight: 700, fontSize: 19, margin: "12px 0 8px" }}>{st.title}</h3>
                <p style={{ color: T.muted, fontSize: 14.5, lineHeight: 1.65, margin: 0 }}>{st.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
