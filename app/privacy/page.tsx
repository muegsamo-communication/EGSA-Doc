import { getTranslations } from "next-intl/server";
import { colors, cardStyle } from "@/lib/theme";

export const dynamic = "force-dynamic";

export default async function PrivacyPage() {
  const t = await getTranslations("privacy");

  const sections = [1, 2, 3, 4];

  return (
    <div style={{ maxWidth: 640, margin: "0 auto" }}>
      <h1 style={{ fontSize: 20, margin: "0 0 4px" }}>{t("title")}</h1>
      <p style={{ color: colors.textSecondary, fontSize: 13, margin: "0 0 24px" }}>{t("subtitle")}</p>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {sections.map((n) => (
          <div key={n} style={cardStyle}>
            <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 6, color: colors.primaryDark }}>
              {t(`section${n}Title`)}
            </div>
            <div style={{ fontSize: 13, color: colors.textSecondary, lineHeight: 1.7 }}>
              {t(`section${n}Body`)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
