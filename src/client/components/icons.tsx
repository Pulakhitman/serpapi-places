interface MapPinIconProps {
  className?: string;
  size?: number;
}

/** Outline pin used for the brand, map empty state, and other place affordances. */
export function MapPinIcon({ className, size = 20 }: MapPinIconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12 21.2s7-6.4 7-11.2a7 7 0 1 0-14 0c0 4.8 7 11.2 7 11.2Z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  );
}
