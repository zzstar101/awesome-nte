import { useId } from "react";

/**
 * Custom diagonal slash-cut "NTE" wordmark faithfully adapted from assets/badge.svg.
 */
export function NteWordmark({
  className = "h-6 w-auto",
  fill = "currentColor",
}: {
  className?: string;
  fill?: string;
}) {
  const maskId = useId();
  return (
    <svg
      viewBox="0 0 33 11.4"
      className={className}
      fill="none"
      aria-label="NTE"
      role="img"
    >
      <defs>
        <mask id={maskId}>
          <rect x="-2" y="-2" width="38" height="16" fill="#FFFFFF" />
          <line x1="-1.5" y1="11.1" x2="11.5" y2="5.9" stroke="#000000" strokeWidth="0.82" />
          <line x1="13.5" y1="11.4" x2="21.0" y2="8.4" stroke="#000000" strokeWidth="0.82" />
          <line x1="25.5" y1="11.8" x2="34.5" y2="8.2" stroke="#000000" strokeWidth="0.82" />
        </mask>
      </defs>
      <g mask={`url(#${maskId})`} fill={fill}>
        <path d="M 0.8 0 L 3.3 0 L 7.4 6.5 L 7.4 0 L 9.9 0 L 9.9 11.2 L 7.5 11.2 L 3.4 4.7 L 3.4 11.2 L 0.8 11.2 Z" />
        <path d="M 11.5 0.9 C 11.5 0.3 11.9 0 12.5 0 L 20.5 0 C 21.1 0 21.5 0.3 21.5 0.9 L 21.5 2.9 L 20.6 2.9 C 20.4 2.4 20.0 2.2 19.3 2.2 L 17.8 2.2 L 17.8 11.2 L 15.2 11.2 L 15.2 2.2 L 13.7 2.2 C 13.0 2.2 12.6 2.4 12.4 2.9 L 11.5 2.9 Z" />
        <path d="M 23.8 0 L 32.0 0 C 32.3 0 32.5 0.2 32.5 0.5 L 32.5 2.2 L 26.2 2.2 C 25.7 2.2 25.5 2.4 25.5 2.9 L 25.5 4.4 L 31.6 4.4 L 30.9 6.6 L 25.5 6.6 L 25.5 8.9 L 32.5 8.9 L 32.5 11.2 L 23.0 11.2 L 23.0 0.8 C 23.0 0.3 23.3 0 23.8 0 Z" />
      </g>
    </svg>
  );
}

/**
 * Mint's iconic black ghost-cat silhouette adapted from assets/badge.svg.
 * Supports optional eye-blink animation when used as the site mascot.
 */
export function GhostCatIcon({
  className = "h-6 w-6",
  bodyFill = "#171824",
  blink = false,
}: {
  className?: string;
  bodyFill?: string;
  blink?: boolean;
}) {
  return (
    <svg viewBox="0 0 24 22" className={className} fill="none" aria-hidden="true">
      <path
        d="M 4.1 12.0 C 3.5 8.8 4.6 5.5 6.5 3.3 C 7.1 2.6 8.1 2.9 8.6 4.1 L 9.7 6.7 C 11.2 6.3 12.8 6.3 14.3 6.7 L 15.4 4.1 C 15.9 2.9 16.9 2.6 17.5 3.3 C 19.4 5.5 20.5 8.8 19.9 12.0 C 20.9 13.3 20.8 15.2 19.7 16.4 C 18.6 17.6 17.1 17.6 16.2 17.1 C 14.9 18.2 13.5 18.7 12.0 18.7 C 10.5 18.7 9.1 18.2 7.8 17.1 C 6.9 17.6 5.4 17.6 4.3 16.4 C 3.2 15.2 3.1 13.3 4.1 12.0 Z"
        fill={bodyFill}
      />
      <circle
        cx="8.6"
        cy="11.2"
        r="2.25"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="1.45"
        className={blink ? "nte-cat-eye" : undefined}
      />
      <circle
        cx="15.4"
        cy="11.2"
        r="2.25"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="1.45"
        className={blink ? "nte-cat-eye" : undefined}
      />
      <path d="M 10.4 15.1 L 12.0 12.8 L 13.6 15.1 Z" fill="#FF2E7E" />
      <path d="M 11.4 13.6 L 12.0 14.5 L 12.6 13.6 Z" fill="#FFFFFF" />
    </svg>
  );
}

/**
 * Hero-grade animated Mint Ghost-Cat sticker emblem matching assets/logo.svg 1:1,
 * with halftone yellow base, diagonal pink/mint corner slash, and live blinking eyes.
 */
export function AnimatedCatLogo({
  className = "h-24 w-24",
}: {
  className?: string;
}) {
  const dotsId = useId();
  const clipId = useId();

  return (
    <svg
      viewBox="0 0 116 116"
      className={className}
      fill="none"
      role="img"
      aria-label="Awesome NTE Mint Ghost-Cat Logo"
    >
      <defs>
        <pattern id={dotsId} width="12" height="12" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="1.8" fill="#FFFFFF" opacity="0.48" />
          <circle cx="9" cy="9" r="1.8" fill="#FFFFFF" opacity="0.48" />
        </pattern>
        <clipPath id={clipId}>
          <rect x="4" y="4" width="108" height="108" rx="24" />
        </clipPath>
      </defs>

      <g clipPath={`url(#${clipId})`}>
        <rect x="4" y="4" width="108" height="108" fill="#FFD92E" />
        <rect x="4" y="4" width="108" height="108" fill={`url(#${dotsId})`} />

        {/* Diagonal mint-cyan corner slash */}
        <polygon points="112,80 112,112 72,112" fill="#17E2CE" />
        <polygon points="112,92 112,102 92,112 82,112" fill="#FFFFFF" opacity="0.28" />

        {/* Hot-pink diagonal racing stripe */}
        <polygon points="112,70 112,80 72,112 59,112" fill="#FF2E7E" />
        <line x1="112" y1="70" x2="59" y2="112" stroke="#171824" strokeWidth="3.2" />
        <line x1="112" y1="80" x2="72" y2="112" stroke="#171824" strokeWidth="3.2" />
      </g>

      {/* Crisp ink outline */}
      <rect x="4" y="4" width="108" height="108" rx="24" stroke="#171824" strokeWidth="4.5" />

      {/* Ghost-cat with animated blinking eyes */}
      <g transform="translate(6.4, 10.2) scale(4.25)">
        <path
          d="M 4.1 12.0 C 3.5 8.8 4.6 5.5 6.5 3.3 C 7.1 2.6 8.1 2.9 8.6 4.1 L 9.7 6.7 C 11.2 6.3 12.8 6.3 14.3 6.7 L 15.4 4.1 C 15.9 2.9 16.9 2.6 17.5 3.3 C 19.4 5.5 20.5 8.8 19.9 12.0 C 20.9 13.3 20.8 15.2 19.7 16.4 C 18.6 17.6 17.1 17.6 16.2 17.1 C 14.9 18.2 13.5 18.7 12.0 18.7 C 10.5 18.7 9.1 18.2 7.8 17.1 C 6.9 17.6 5.4 17.6 4.3 16.4 C 3.2 15.2 3.1 13.3 4.1 12.0 Z"
          fill="#171824"
        />
        <circle
          cx="8.6"
          cy="11.2"
          r="2.25"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="1.45"
          className="nte-cat-eye"
        />
        <circle
          cx="15.4"
          cy="11.2"
          r="2.25"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="1.45"
          className="nte-cat-eye"
        />
        <path d="M 10.4 15.1 L 12.0 12.8 L 13.6 15.1 Z" fill="#FF2E7E" />
        <path d="M 11.4 13.6 L 12.0 14.5 L 12.6 13.6 Z" fill="#FFFFFF" />
      </g>

      {/* Tilted sparkle inside sticker */}
      <g transform="translate(94.5, 23.5) rotate(16)">
        <path
          d="M 0 -9.5 L 2.6 -2.6 L 9.5 0 L 2.6 2.6 L 0 9.5 L -2.6 2.6 L -9.5 0 L -2.6 -2.6 Z"
          fill="#FF2E7E"
        />
        <path
          d="M 0 -4.2 L 1.2 -1.2 L 4.2 0 L 1.2 1.2 L 0 4.2 L -1.2 1.2 L -4.2 0 L -1.2 -1.2 Z"
          fill="#FFFFFF"
        />
      </g>
    </svg>
  );
}

/**
 * Mint's signature 16-degree tilted 4-point cross sparkle.
 */
export function CrossSparkle({
  className = "h-4 w-4",
  outerFill = "#FF2E7E",
  innerFill = "#FFFFFF",
  twinkle = false,
}: {
  className?: string;
  outerFill?: string;
  innerFill?: string;
  twinkle?: boolean;
}) {
  return (
    <svg
      viewBox="-6 -6 12 12"
      className={`${className} ${twinkle ? "nte-sparkle-twinkle" : ""}`}
      fill="none"
      aria-hidden="true"
    >
      <g transform="rotate(16)">
        <path
          d="M 0 -5.2 L 1.45 -1.45 L 5.2 0 L 1.45 1.45 L 0 5.2 L -1.45 1.45 L -5.2 0 L -1.45 -1.45 Z"
          fill={outerFill}
        />
        <path
          d="M 0 -2.3 L 0.64 -0.64 L 2.3 0 L 0.64 0.64 L 0 2.3 L -0.64 0.64 L -2.3 0 L -0.64 -0.64 Z"
          fill={innerFill}
        />
      </g>
    </svg>
  );
}
