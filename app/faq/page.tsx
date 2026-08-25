import { getTranslations } from "next-intl/server";
import { colors, cardStyle } from "@/lib/theme";

export const dynamic = "force-dynamic";

// จำนวนคำถามสูงสุดที่จะลองมองหา — ตั้งเผื่อไว้มากพอ ไม่ต้องแก้ตอนเพิ่มคำถามใหม่
const MAX_FAQ_ITEMS = 30;

export default async function FaqPage() {
  const t = await getTranslations("faq");

  // *** สร้างรายการอัตโนมัติจากไฟล์ภาษา แทนการพิมพ์ q1..qN ตายตัว ***
  // เดิมเขียนตายตัวไว้แค่ q1-q6 ทำให้คำถามข้อ 7 ที่เพิ่มในไฟล์ภาษาไม่เคยแสดงบนหน้าเว็บเลย
  // ตอนนี้ถ้าเพิ่ม q8/a8 ในไฟล์ภาษา จะขึ้นเองทันทีโดยไม่ต้องกลับมาแก้ไฟล์นี้
  const items: { q: string; a: string }[] = [];
  for (let i = 1; i <= MAX_FAQ_ITEMS; i++) {
    let question: string;
    try {
      question = t(`q${i}`);
    } catch {
      break; // ไม่มีคำถามข้อนี้แล้ว หยุดนับ
    }
    // next-intl คืนค่าเป็นชื่อคีย์เองถ้าหาข้อความไม่เจอ — เช็คกันกรณีนั้นด้วย
    if (!question || question === `q${i}` || question === `faq.q${i}`) break;

    let answer = "";
    try {
      answer = t(`a${i}`);
      if (answer === `a${i}` || answer === `faq.a${i}`) answer = "";
    } catch {
      answer = "";
    }

    items.push({ q: question, a: answer });
  }

  return (
    <div style={{ maxWidth: 640, margin: "0 auto" }}>
      <h1 style={{ fontSize: 20, margin: "0 0 4px" }}>{t("title")}</h1>
      <p style={{ color: colors.textSecondary, fontSize: 13, margin: "0 0 24px" }}>{t("subtitle")}</p>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {items.map((item, i) => (
          <div key={i} style={cardStyle}>
            <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 6, color: colors.primaryDark }}>
              {item.q}
            </div>
            <div style={{ fontSize: 13, color: colors.textSecondary, lineHeight: 1.7 }}>
              {item.a}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
