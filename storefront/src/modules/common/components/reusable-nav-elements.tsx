import LocalizedClientLink from "@modules/common/components/localized-client-link";

export const IconPhone = () => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
    <path d="M17.707 16.293a1 1 0 00-1.414 0l-2.121 2.121a15.978 15.978 0 01-7.586-7.586l2.121-2.121a1 1 0 000-1.414L5.293 4.293a1 1 0 00-1.414 0L2.293 5.879c-.39.39-.39 1.024 0 1.414C5.86 13.86 10.14 18.14 16.707 21.707c.39.39 1.024.39 1.414 0l1.586-1.586a1 1 0 000-1.414l-2-2z" stroke="#22C55E" strokeWidth="2" fill="#E6FCE5"/>
  </svg>
);

export const IconMail = () => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
    <rect x="3" y="5" width="18" height="14" rx="2" fill="#E6FCE5" stroke="#22C55E" strokeWidth="2"/>
    <path d="M3 5l9 7 9-7" stroke="#22C55E" strokeWidth="2" fill="none"/>
    <path d="M3 19l6-6" stroke="#22C55E" strokeWidth="2" fill="none"/>
    <path d="M21 19l-6-6" stroke="#22C55E" strokeWidth="2" fill="none"/>
  </svg>
);

export const IconUser = () => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" stroke="#22C55E" strokeWidth="2" fill="#E6FCE5"/>
    <circle cx="12" cy="10" r="4" fill="#22C55E"/>
    <path d="M12 14c-3 0-6 1.5-6 3v1h12v-1c0-1.5-3-3-6-3z" fill="#22C55E" opacity="0.2"/>
  </svg>
);

export const IconCart = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
    <rect x="4" y="7" width="16" height="10" rx="2" fill="#E6FCE5" stroke="#22C55E" strokeWidth="2"/>
    <path d="M7 7V5a2 2 0 012-2h6a2 2 0 012 2v2" stroke="#22C55E" strokeWidth="2" fill="none"/>
    <circle cx="8" cy="19" r="1.5" fill="#22C55E"/>
    <circle cx="16" cy="19" r="1.5" fill="#22C55E"/>
  </svg>
)

export const IconSearch = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="8" stroke="#22C55E" strokeWidth="2"/>
    <path d="M21 21l-4.35-4.35" stroke="#22C55E" strokeWidth="2"/>
  </svg>
);

// Logo
export const Logo = () => (
  <span className="flex items-center gap-2 min-w-[180px]">
    <svg width="36" height="36" fill="none" viewBox="0 0 40 40">
      <rect x="8" y="13" width="25" height="15" rx="4" fill="#E6FCE5" stroke="#22C55E" strokeWidth="2"/>
      <rect x="34" y="18" width="2.5" height="5" rx="1.25" fill="#22C55E"/>
      <path d="M20 16l-3.75 6.25h2.5v3.75l3.75-6.25h-2.5V16z" fill="#2DD4BF"/>
    </svg>
    <span className="flex flex-col leading-tight">
      <span className="text-green-900 font-bold tracking-wide">EV SERVICE</span>
      <span className="text-xs text-green-600 font-normal tracking-wide">CHARGING SOLUTIONS</span>
    </span>
  </span>
);

// Utility style
export const navLink = "font-semibold text-green-900 hover:text-green-700 transition-colors";