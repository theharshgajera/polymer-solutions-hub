/**
 * BrandName — renders "Multi-Tech" in Times Ten Bold Italic (or nearest serif fallback).
 * Use this component wherever the brand name appears in body/paragraph text.
 */
const BrandName = ({ className = "" }: { className?: string }) => (
  <span
    className={className}
    style={{
      fontFamily: "'Times Ten', 'Times New Roman', 'Times', serif",
      fontWeight: "bold",
      fontStyle: "italic",
    }}
  >
    Multi-Tech
  </span>
);

export default BrandName;
