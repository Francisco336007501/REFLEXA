import { useTheme, VIEWS } from "../context/ThemeContext";
import { useUser, useT } from "../context/UserContext";

export function Home({ setView }) {
  const { theme } = useTheme();
  const { userName } = useUser();
  const t = useT();

  return (
    <div
      className="home-menu"
      style={{
        maxWidth: 520,
        margin: "0 auto",
        padding: "40px 24px 56px",
      }}
    >
      <div className="home-marco">
        <div
          className="home-marco-inner"
          style={{
            position: "relative",
            borderRadius: 24,
            background: theme.bg,
            padding: "40px 28px 44px",
            overflow: "hidden",
          }}
        >
          {/* Fondo: símbolos varios tamaños, distintas direcciones, se difuminan al acercarse al contenido */}
          <div
            aria-hidden
            className="home-bg-wrap"
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 0,
              borderRadius: 24,
              overflow: "hidden",
              pointerEvents: "none",
            }}
          >
            <div
              className="home-bg-layer home-bg-layer-1"
              style={{
                backgroundImage: "url(/imagenes/interrogacion.png)",
                backgroundRepeat: "repeat",
                backgroundSize: "70px 70px",
                filter: "blur(2px) brightness(0.55)",
                opacity: 0.25,
              }}
            />
            <div
              className="home-bg-layer home-bg-layer-2"
              style={{
                backgroundImage: "url(/imagenes/interrogacion.png)",
                backgroundRepeat: "repeat",
                backgroundSize: "110px 110px",
                filter: "blur(2px) brightness(0.55)",
                opacity: 0.22,
              }}
            />
            <div
              className="home-bg-layer home-bg-layer-3"
              style={{
                backgroundImage: "url(/imagenes/interrogacion.png)",
                backgroundRepeat: "repeat",
                backgroundSize: "90px 90px",
                filter: "blur(2px) brightness(0.55)",
                opacity: 0.2,
              }}
            />
            {/* Viñeta en los bordes para que no se vea el límite del patrón */}
            <div
              aria-hidden
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: 24,
                background: `radial-gradient(ellipse 110% 70% at 50% 34%, transparent 68%, ${theme.bg} 100%)`,
                pointerEvents: "none",
              }}
            />
          </div>
          <div style={{ position: "relative", zIndex: 1 }}>
          {/* Mensaje principal: tipografía + detalle sutil para que no se sienta vacío */}
          <div
            style={{
              textAlign: "center",
              marginBottom: 44,
              padding: "40px 20px 0",
            }}
          >
            <div
              className="home-intro-line"
              style={{
                width: 40,
                height: 3,
                margin: "0 auto 28px",
                borderRadius: 2,
                background: theme.accent,
                opacity: 0.6,
              }}
            />
            <h1
              className="home-intro-title"
              style={{
                margin: "0 0 14px",
                fontSize: "clamp(1.45rem, 5.5vw, 1.8rem)",
                fontWeight: 700,
                letterSpacing: -0.02,
                lineHeight: 1.4,
                color: theme.text,
              }}
            >
              {userName ? t("welcomeName", { name: userName }) : t("notATest")}
            </h1>
            <p
              className="home-intro-subtitle"
              style={{
                margin: 0,
                fontSize: 14,
                color: theme.sub,
                fontWeight: 500,
                lineHeight: 1.45,
                letterSpacing: 0.02,
              }}
            >
              {t("spaceToThink")}
            </p>
          </div>

          {/* CTA principal con marco decorativo */}
          <div className="home-intro-cta">
            <div className="home-cta-wrap">
            <button
              type="button"
              className="home-cta"
              onClick={() => setView(VIEWS.MODE_ROOT)}
              style={{
                width: "100%",
                padding: "24px 28px",
                fontSize: 17,
                fontWeight: 700,
                letterSpacing: 0.04,
                borderRadius: 20,
                border: "none",
                background: `linear-gradient(135deg, ${theme.accent} 0%, ${theme.accent}dd 100%)`,
                color: "#fff",
                cursor: "pointer",
                boxShadow: `0 8px 32px ${theme.accent}40, 0 0 0 1px rgba(255,255,255,0.15) inset`,
              }}
            >
              {t("enter")}
            </button>
            </div>
          </div>

          {/* Accesos secundarios */}
          <div
            className="home-intro-sec"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 20,
              marginTop: 32,
            }}
          >
            <button
              type="button"
              className="home-sec-btn"
              onClick={() => setView(VIEWS.ABOUT)}
              style={{
                padding: "22px 20px",
                borderRadius: 20,
                border: `1px solid ${theme.border}`,
                background: "rgba(32,32,38,0.94)",
                color: theme.text,
                fontSize: 15,
                fontWeight: 600,
                cursor: "pointer",
                textAlign: "center",
                boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
              }}
            >
              {t("whatIsThis")}
            </button>
            <button
              type="button"
              className="home-sec-btn"
              onClick={() => setView(VIEWS.SETTINGS)}
              style={{
                padding: "22px 20px",
                borderRadius: 20,
                border: `1px solid ${theme.border}`,
                background: "rgba(32,32,38,0.94)",
                color: theme.text,
                fontSize: 15,
                fontWeight: 600,
                cursor: "pointer",
                textAlign: "center",
                boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
              }}
            >
              {t("settings")}
            </button>
          </div>

          {/* Aviso en segundo plano */}
          <div
            className="home-intro-footer"
            style={{
              marginTop: 44,
              padding: "16px 0 0",
              textAlign: "center",
              borderTop: `1px solid ${theme.border}`,
            }}
          >
            <div style={{ fontWeight: 600, fontSize: 11, color: theme.sub, marginBottom: 6, letterSpacing: 0.06, opacity: 0.85 }}>
              {t("noRegisterNoJudgment")}
            </div>
            <div style={{ color: theme.sub, fontSize: 13, lineHeight: 1.5, fontWeight: 500, opacity: 0.8 }}>
              {t("noStoreName")} <i>{t("notDecidingIsDeciding")}</i>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
