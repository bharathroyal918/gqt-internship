const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'public', 'images', 'companies');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const svgs = {
  'titan.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <rect width="200" height="200" rx="32" fill="#0A192F"/>
  <circle cx="100" cy="100" r="74" fill="none" stroke="#D4AF37" stroke-width="6"/>
  <circle cx="100" cy="100" r="64" fill="none" stroke="#D4AF37" stroke-width="1.5" stroke-dasharray="4 4"/>
  <path d="M70 70 H130 V86 H108 V142 H92 V86 H70 Z" fill="#FFFFFF"/>
  <text x="100" y="166" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="800" fill="#D4AF37" text-anchor="middle" letter-spacing="4">TITAN</text>
</svg>`,

  'tejas.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <rect width="200" height="200" rx="32" fill="#FFFFFF"/>
  <path d="M45 100 C 65 60, 135 60, 155 100" fill="none" stroke="#0066B3" stroke-width="12" stroke-linecap="round"/>
  <path d="M60 115 C 75 85, 125 85, 140 115" fill="none" stroke="#78BE20" stroke-width="10" stroke-linecap="round"/>
  <circle cx="100" cy="76" r="10" fill="#0066B3"/>
  <text x="100" y="152" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="800" fill="#0066B3" text-anchor="middle" letter-spacing="1.5">TEJAS</text>
  <text x="100" y="172" font-family="system-ui, -apple-system, sans-serif" font-size="10" font-weight="700" fill="#78BE20" text-anchor="middle" letter-spacing="3">NETWORKS</text>
</svg>`,

  'ltimindtree.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <rect width="200" height="200" rx="32" fill="#0B2545"/>
  <defs>
    <linearGradient id="ltiG" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00A3E0"/>
      <stop offset="100%" stop-color="#002D72"/>
    </linearGradient>
  </defs>
  <path d="M65 60 L100 95 L135 60 L120 45 L100 65 L80 45 Z" fill="#00A3E0"/>
  <path d="M100 95 L135 130 L100 165 L65 130 Z" fill="url(#ltiG)"/>
  <text x="100" y="145" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="900" fill="#FFFFFF" text-anchor="middle" letter-spacing="1">LTIMindtree</text>
</svg>`,

  'kpit.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <rect width="200" height="200" rx="32" fill="#FFFFFF"/>
  <rect x="35" y="60" width="130" height="55" rx="14" fill="#00529B"/>
  <circle cx="145" cy="62" r="14" fill="#E84E0F"/>
  <text x="100" y="99" font-family="system-ui, -apple-system, sans-serif" font-size="34" font-weight="900" fill="#FFFFFF" text-anchor="middle" letter-spacing="3">KPIT</text>
  <text x="100" y="148" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#E84E0F" text-anchor="middle" letter-spacing="1.5">TECHNOLOGIES</text>
</svg>`,

  'subex.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <rect width="200" height="200" rx="32" fill="#FFFFFF"/>
  <path d="M70 55 L130 55 L95 105 L135 105 L65 155 L85 100 L55 100 Z" fill="#D31245"/>
  <text x="100" y="178" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="800" fill="#202A44" text-anchor="middle" letter-spacing="2">SUBEX</text>
</svg>`,

  'happiestminds.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <rect width="200" height="200" rx="32" fill="#FFFFFF"/>
  <circle cx="75" cy="80" r="10" fill="#3AA655"/>
  <circle cx="125" cy="80" r="10" fill="#0099DA"/>
  <path d="M60 105 C 75 140, 125 140, 140 105" fill="none" stroke="#F58220" stroke-width="10" stroke-linecap="round"/>
  <text x="100" y="162" font-family="system-ui, -apple-system, sans-serif" font-size="15" font-weight="800" fill="#1C3F5E" text-anchor="middle" letter-spacing="0.5">happiest minds</text>
  <text x="100" y="178" font-family="system-ui, -apple-system, sans-serif" font-size="8" font-weight="600" fill="#708090" text-anchor="middle">The Mindful IT Company</text>
</svg>`,

  'tataelxsi.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <rect width="200" height="200" rx="32" fill="#0B4F6C"/>
  <path d="M60 70 H140 V82 H107 V135 H93 V82 H60 Z" fill="#FFFFFF"/>
  <path d="M100 45 L115 65 H85 Z" fill="#00A896"/>
  <text x="100" y="160" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="800" fill="#FFFFFF" text-anchor="middle" letter-spacing="3">TATA ELXSI</text>
</svg>`,

  'micron.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <rect width="200" height="200" rx="32" fill="#FFFFFF"/>
  <path d="M45 135 V65 L75 105 L100 75 L125 105 L155 65 V135 H138 V95 L125 112 L100 82 L75 112 L62 95 V135 Z" fill="#004C97"/>
  <text x="100" y="168" font-family="system-ui, -apple-system, sans-serif" font-size="19" font-weight="800" fill="#004C97" text-anchor="middle" letter-spacing="4">Micron</text>
</svg>`,

  'sonata.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <rect width="200" height="200" rx="32" fill="#002D62"/>
  <path d="M60 85 C 60 70, 140 70, 140 85 C 140 105, 60 100, 60 120 C 60 135, 140 135, 140 120" fill="none" stroke="#00A3E0" stroke-width="12" stroke-linecap="round"/>
  <text x="100" y="165" font-family="system-ui, -apple-system, sans-serif" font-size="17" font-weight="800" fill="#FFFFFF" text-anchor="middle" letter-spacing="2">SONATA</text>
</svg>`,

  'mphasis.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <rect width="200" height="200" rx="32" fill="#FFFFFF"/>
  <path d="M50 130 V70 L85 105 L120 70 L150 100 V130 H135 V105 L120 90 L85 125 L65 105 V130 Z" fill="#1C2541"/>
  <circle cx="150" cy="65" r="12" fill="#E6004C"/>
  <text x="100" y="165" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="800" fill="#1C2541" text-anchor="middle" letter-spacing="2">Mphasis</text>
</svg>`,

  'cyient.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <rect width="200" height="200" rx="32" fill="#FFFFFF"/>
  <path d="M100 50 L145 76 V128 L100 154 L55 128 V76 Z" fill="none" stroke="#007788" stroke-width="10"/>
  <circle cx="100" cy="102" r="18" fill="#E35205"/>
  <text x="100" y="180" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="800" fill="#003B46" text-anchor="middle" letter-spacing="2">CYIENT</text>
</svg>`,

  'birlasoft.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <rect width="200" height="200" rx="32" fill="#FFFFFF"/>
  <circle cx="100" cy="85" r="45" fill="#E2231A"/>
  <path d="M85 65 H108 C118 65, 122 70, 122 76 C122 81, 118 84, 112 85 C119 86, 124 90, 124 96 C124 103, 118 107, 107 107 H85 Z M97 73 V82 H106 C110 82, 113 80, 113 77 C113 74, 110 73, 106 73 Z M97 89 V99 H107 C112 99, 115 97, 115 94 C115 91, 112 89, 107 89 Z" fill="#FFFFFF"/>
  <text x="100" y="160" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="900" fill="#1C2D42" text-anchor="middle" letter-spacing="2">birlasoft</text>
</svg>`,

  'gqt.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <rect width="200" height="200" rx="32" fill="#0B5ED7"/>
  <circle cx="100" cy="100" r="65" fill="none" stroke="#FFFFFF" stroke-width="8"/>
  <path d="M100 50 L100 150 M50 100 L150 100" stroke="#FFFFFF" stroke-width="6" opacity="0.4"/>
  <circle cx="100" cy="100" r="30" fill="#FFFFFF"/>
  <text x="100" y="109" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="900" fill="#0B5ED7" text-anchor="middle">GQT</text>
  <text x="100" y="184" font-family="system-ui, -apple-system, sans-serif" font-size="10" font-weight="700" fill="#FFFFFF" text-anchor="middle" letter-spacing="2">GLOBAL QUEST</text>
</svg>`,

  'cred.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <rect width="200" height="200" rx="32" fill="#121212"/>
  <path d="M60 55 H140 V120 C140 145, 100 160, 100 160 C100 160, 60 145, 60 120 Z" fill="none" stroke="#FFFFFF" stroke-width="10" stroke-linejoin="round"/>
  <path d="M85 85 H115 V115 C115 125, 100 132, 100 132 C100 132, 85 125, 85 115 Z" fill="#FFFFFF"/>
  <text x="100" y="184" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="900" fill="#FFFFFF" text-anchor="middle" letter-spacing="4">CRED</text>
</svg>`,

  'groww.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <rect width="200" height="200" rx="32" fill="#FFFFFF"/>
  <circle cx="85" cy="85" r="35" fill="#00D09C"/>
  <circle cx="118" cy="85" r="35" fill="#5367FF" fill-opacity="0.85"/>
  <circle cx="102" cy="112" r="30" fill="#FFB703" fill-opacity="0.85"/>
  <text x="100" y="172" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="800" fill="#44475B" text-anchor="middle">Groww</text>
</svg>`,

  'kreditbee.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <rect width="200" height="200" rx="32" fill="#1E2A38"/>
  <circle cx="100" cy="85" r="38" fill="#FFC72C"/>
  <path d="M85 70 Q100 60 115 70 Q100 100 85 70 Z M90 85 H110 M93 95 H107" stroke="#1E2A38" stroke-width="4" fill="#1E2A38"/>
  <text x="100" y="152" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="900" fill="#FFFFFF" text-anchor="middle">Kredit<tspan fill="#FFC72C">Bee</tspan></text>
</svg>`,

  'inmobi.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <rect width="200" height="200" rx="32" fill="#FFFFFF"/>
  <defs>
    <linearGradient id="inmobiG" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FF5A00"/>
      <stop offset="100%" stop-color="#E5004F"/>
    </linearGradient>
  </defs>
  <path d="M100 45 C125 70, 155 100, 135 130 C120 150, 80 150, 65 130 C45 100, 75 70, 100 45 Z" fill="url(#inmobiG)"/>
  <circle cx="100" cy="115" r="14" fill="#FFFFFF"/>
  <text x="100" y="176" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="900" fill="#2D3142" text-anchor="middle" letter-spacing="1">InMobi</text>
</svg>`,

  'musigma.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <rect width="200" height="200" rx="32" fill="#111827"/>
  <text x="75" y="112" font-family="serif" font-size="70" font-weight="bold" fill="#06B6D4" text-anchor="middle">μ</text>
  <text x="125" y="112" font-family="serif" font-size="65" font-weight="bold" fill="#F59E0B" text-anchor="middle">Σ</text>
  <text x="100" y="162" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="800" fill="#FFFFFF" text-anchor="middle" letter-spacing="3">MU SIGMA</text>
</svg>`,

  'acko.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <rect width="200" height="200" rx="32" fill="#4B286D"/>
  <circle cx="100" cy="90" r="42" fill="#68329B"/>
  <path d="M78 105 L100 62 L122 105 Z M86 97 H114" fill="none" stroke="#FFFFFF" stroke-width="7" stroke-linecap="round"/>
  <text x="100" y="162" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="900" fill="#FFFFFF" text-anchor="middle" letter-spacing="3">ACKO</text>
</svg>`,

  'urbancompany.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <rect width="200" height="200" rx="32" fill="#000000"/>
  <rect x="52" y="55" width="42" height="42" rx="10" fill="#FFFFFF"/>
  <rect x="106" y="55" width="42" height="42" rx="10" fill="#D4AF37"/>
  <text x="73" y="85" font-family="system-ui, -apple-system, sans-serif" font-size="26" font-weight="900" fill="#000000" text-anchor="middle">U</text>
  <text x="127" y="85" font-family="system-ui, -apple-system, sans-serif" font-size="26" font-weight="900" fill="#000000" text-anchor="middle">C</text>
  <text x="100" y="138" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="800" fill="#FFFFFF" text-anchor="middle" letter-spacing="1">URBAN COMPANY</text>
</svg>`,

  'ather.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <rect width="200" height="200" rx="32" fill="#FFFFFF"/>
  <path d="M100 45 L145 130 H115 L100 100 L85 130 H55 Z" fill="#000000"/>
  <circle cx="100" cy="85" r="8" fill="#13EBA2"/>
  <text x="100" y="168" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="900" fill="#000000" text-anchor="middle" letter-spacing="4">ATHER</text>
</svg>`,

  'olaelectric.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <rect width="200" height="200" rx="32" fill="#0F172A"/>
  <circle cx="100" cy="90" r="45" fill="none" stroke="#22C55E" stroke-width="12"/>
  <path d="M100 55 A 35 35 0 0 1 135 90" fill="none" stroke="#E2E8F0" stroke-width="8" stroke-linecap="round"/>
  <text x="100" y="160" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="900" fill="#FFFFFF" text-anchor="middle" letter-spacing="2">OLA</text>
  <text x="100" y="178" font-family="system-ui, -apple-system, sans-serif" font-size="9" font-weight="700" fill="#22C55E" text-anchor="middle" letter-spacing="2">ELECTRIC</text>
</svg>`
};

Object.entries(svgs).forEach(([filename, content]) => {
  const filePath = path.join(dir, filename);
  fs.writeFileSync(filePath, content.trim(), 'utf8');
  console.log('Saved vector SVG:', filename);
});

console.log('Finished saving all 22 company SVGs.');
