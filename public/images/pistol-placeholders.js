// This file creates placeholder images for pistols
// Run this in browser console to create placeholder images

const pistols = [
  "glock-19-shadow.jpg",
  "desert-eagle-chrome.jpg", 
  "beretta-92fs-blood.jpg",
  "sig-p226-night.jpg",
  "colt-1911-demon.jpg",
  "walther-ppk-assassin.jpg",
  "fn-five-seven-armor.jpg",
  "cz-shadow2-comp.jpg",
  "hk-usp-tactical.jpg",
  "sw-mp-shadow.jpg"
];

// Create placeholder SVGs for each pistol
pistols.forEach(name => {
  const svg = `
    <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#1a1a1a;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#0a0a0a;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#grad)" />
      <text x="200" y="150" font-family="Arial" font-size="16" fill="#ff0000" text-anchor="middle" dominant-baseline="middle">
        ${name.replace('.jpg', '').replace(/-/g, ' ').toUpperCase()}
      </text>
      <text x="200" y="170" font-family="Arial" font-size="12" fill="#666666" text-anchor="middle">
        PISTOL
      </text>
    </svg>
  `;
  
  console.log(`Create ${name} with SVG:`);
  console.log(encodeURIComponent(svg));
});
