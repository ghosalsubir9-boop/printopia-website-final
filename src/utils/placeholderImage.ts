export function getPlaceholderImage(title: string, category: string, iconType: string = 'file'): string {
  const primaryColor = "#0C3855"; // Deep Printopia navy
  const accentColor = "#0C7D8D";  // Cyan print accent
  
  // Custom SVG path per iconType
  let iconContent = "";
  if (iconType === 'folder') {
    iconContent = `
      <path d="M40 80 L110 80 L130 100 L260 100 A10 10 0 0 1 270 110 L270 210 A10 10 0 0 1 260 220 L40 220 A10 10 0 0 1 30 210 L30 90 A10 10 0 0 1 40 80 Z" fill="none" stroke="${primaryColor}" stroke-width="6" stroke-linejoin="round"/>
      <line x1="70" y1="140" x2="230" y2="140" stroke="${accentColor}" stroke-width="5" stroke-linecap="round"/>
      <line x1="70" y1="170" x2="180" y2="170" stroke="#94A3B8" stroke-width="5" stroke-linecap="round"/>
    `;
  } else if (iconType === 'box' || iconType === 'package') {
    iconContent = `
      <path d="M150 70 L250 115 L250 205 L150 250 L50 205 L50 115 Z" fill="none" stroke="${primaryColor}" stroke-width="6" stroke-linejoin="round"/>
      <path d="M50 115 L150 160 L250 115" fill="none" stroke="${primaryColor}" stroke-width="6" stroke-linejoin="round"/>
      <line x1="150" y1="160" x2="150" y2="250" stroke="${primaryColor}" stroke-width="6"/>
      <path d="M100 92 L200 137" stroke="${accentColor}" stroke-width="5" stroke-linecap="round"/>
    `;
  } else if (iconType === 'card' || iconType === 'menu') {
    iconContent = `
      <rect x="60" y="70" width="180" height="160" rx="12" fill="none" stroke="${primaryColor}" stroke-width="6"/>
      <line x1="90" y1="110" x2="210" y2="110" stroke="${accentColor}" stroke-width="6" stroke-linecap="round"/>
      <line x1="90" y1="145" x2="180" y2="145" stroke="#94A3B8" stroke-width="5" stroke-linecap="round"/>
      <line x1="90" y1="180" x2="150" y2="180" stroke="#94A3B8" stroke-width="5" stroke-linecap="round"/>
    `;
  } else if (iconType === 'bag') {
    iconContent = `
      <path d="M70 110 L230 110 L220 230 A10 10 0 0 1 210 240 L90 240 A10 10 0 0 1 80 230 Z" fill="none" stroke="${primaryColor}" stroke-width="6" stroke-linejoin="round"/>
      <path d="M110 110 C110 70, 190 70, 190 110" fill="none" stroke="${accentColor}" stroke-width="6" stroke-linecap="round"/>
      <line x1="110" y1="155" x2="190" y2="155" stroke="#94A3B8" stroke-width="5" stroke-linecap="round"/>
    `;
  } else if (iconType === 'envelope') {
    iconContent = `
      <rect x="50" y="85" width="200" height="130" rx="10" fill="none" stroke="${primaryColor}" stroke-width="6"/>
      <path d="M50 90 L150 160 L250 90" fill="none" stroke="${accentColor}" stroke-width="6" stroke-linejoin="round"/>
    `;
  } else if (iconType === 'tag') {
    iconContent = `
      <path d="M60 140 L140 60 L240 60 L240 160 L160 240 Z" fill="none" stroke="${primaryColor}" stroke-width="6" stroke-linejoin="round"/>
      <circle cx="205" cy="95" r="12" fill="${accentColor}"/>
    `;
  } else {
    // Default document / file icon
    iconContent = `
      <path d="M70 60 L180 60 L230 110 L230 240 A10 10 0 0 1 220 250 L70 250 A10 10 0 0 1 60 240 L60 70 A10 10 0 0 1 70 60 Z" fill="none" stroke="${primaryColor}" stroke-width="6" stroke-linejoin="round"/>
      <path d="M180 60 L180 110 L230 110" fill="none" stroke="${primaryColor}" stroke-width="6" stroke-linejoin="round"/>
      <line x1="95" y1="140" x2="195" y2="140" stroke="${accentColor}" stroke-width="5" stroke-linecap="round"/>
      <line x1="95" y1="175" x2="175" y2="175" stroke="#94A3B8" stroke-width="5" stroke-linecap="round"/>
      <line x1="95" y1="210" x2="145" y2="210" stroke="#94A3B8" stroke-width="5" stroke-linecap="round"/>
    `;
  }

  const cleanTitle = title.replace(/</g, "&lt;").replace(/>/g, "&gt;").toUpperCase();
  const cleanCat = category.replace(/</g, "&lt;").replace(/>/g, "&gt;").toUpperCase();

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
    <rect width="100%" height="100%" fill="#F8FAFC"/>
    <rect x="12" y="12" width="376" height="276" rx="16" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="2"/>
    <rect x="24" y="24" width="80" height="20" rx="6" fill="#E0F2FE"/>
    <text x="64" y="38" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="9" font-weight="800" fill="#0C7D8D" letter-spacing="0.5">${cleanCat}</text>
    <g transform="translate(50, 0)">
      ${iconContent}
    </g>
    <text x="50%" y="268" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="700" fill="#0C3855" letter-spacing="0.5">${cleanTitle}</text>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
