import * as React from "react";

/**
 * Asentar logomark + logo. Source of truth: brand/BRAND.md.
 *
 * The mark is an accounting entry ("asiento"):
 *   1. Debe  — top bar, flush left
 *   2. Haber — indented bar (the credit line), the ONLY part in sello green
 *   3. Doble subrayado — the accountant's double rule under a closed total
 *
 * Geometry is fixed. Do not edit coordinates, re-align the Haber bar, or
 * color the Debe bar green.
 */

type Tone = "brand" | "mono";

type MarkProps = Omit<React.SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered height in px. Width follows the 30:27 ratio. Min 16. */
  size?: number;
  /**
   * brand (default): bars + rules in currentColor, Haber in --sello.
   * mono: everything in currentColor (favicons, PDFs, embossing, knockouts on sello).
   */
  tone?: Tone;
  /** Accessible name. Omit when the mark sits next to the wordmark. */
  title?: string;
};

export function AsentarMark({
  size = 24,
  tone = "brand",
  title,
  className,
  ...props
}: MarkProps) {
  const h = Math.max(16, size);
  const w = (h * 30) / 27;
  const haberFill = tone === "brand" ? "var(--sello)" : "currentColor";

  return (
    <svg
      viewBox="0 0 30 27"
      width={w}
      height={h}
      fill="none"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      className={className}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      {/* Debe */}
      <rect x="0" y="0" width="26" height="6" rx="1" fill="currentColor" />
      {/* Haber (indented) */}
      <rect x="8" y="10" width="22" height="6" rx="1" fill={haberFill} />
      {/* Doble subrayado */}
      <rect x="0" y="21" width="30" height="2" fill="currentColor" />
      <rect x="0" y="25" width="30" height="2" fill="currentColor" />
    </svg>
  );
}

type LogoProps = Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> & {
  /** Mark height in px. The wordmark scales from it. */
  size?: number;
  tone?: Tone;
};

/**
 * Horizontal lockup: mark + "asentar" wordmark.
 * Wordmark: Public Sans ExtraBold (800), tracking -0.045em, ALWAYS lowercase.
 * Color comes from the parent via currentColor (text-foreground,
 * text-primary-foreground for knockouts on ink).
 */
export function AsentarLogo({
  size = 24,
  tone = "brand",
  className,
  style,
  ...props
}: LogoProps) {
  return (
    <span
      role="img"
      aria-label="Asentar"
      className={["inline-flex items-center select-none", className]
        .filter(Boolean)
        .join(" ")}
      style={{ gap: size * 0.4, ...style }}
      {...props}
    >
      <AsentarMark size={size} tone={tone} />
      <span
        aria-hidden
        style={{
          fontFamily: "var(--font-sans)",
          fontWeight: 800,
          fontSize: size * 1.15,
          letterSpacing: "-0.045em",
          lineHeight: 1,
          textTransform: "lowercase",
          // optical alignment: sit the x-height on the mark's center
          transform: `translateY(${size * -0.04}px)`,
        }}
      >
        asentar
      </span>
    </span>
  );
}

export default AsentarLogo;
