import React from 'react';
import { StampType } from '../types';

interface VintageArtworkProps {
  type: string;
  className?: string;
  accentColor?: string;
}

export const VintageArtwork: React.FC<VintageArtworkProps> = ({ 
  type, 
  className = "w-full h-full",
  accentColor = "#c5a059" 
}) => {
  switch (type) {
    case 'rainy-umbrella':
      return (
        <svg viewBox="0 0 400 300" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="rainSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#17202a" />
              <stop offset="100%" stopColor="#0c1117" />
            </linearGradient>
            <radialGradient id="rainGlow" cx="0.5" cy="0.4" r="0.5">
              <stop offset="0%" stopColor={accentColor} stopOpacity="0.25" />
              <stop offset="100%" stopColor="#000" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="400" height="300" fill="url(#rainSky)" />
          <rect width="400" height="300" fill="url(#rainGlow)" />
          
          {/* Subtle Rain lines */}
          <g stroke="#ffffff" strokeOpacity="0.18" strokeWidth="1" strokeLinecap="round">
            <line x1="30" y1="20" x2="15" y2="90" />
            <line x1="80" y1="10" x2="65" y2="80" />
            <line x1="140" y1="30" x2="125" y2="100" />
            <line x1="190" y1="15" x2="175" y2="85" />
            <line x1="250" y1="25" x2="235" y2="95" />
            <line x1="310" y1="10" x2="295" y2="80" />
            <line x1="360" y1="35" x2="345" y2="105" />
            <line x1="50" y1="110" x2="35" y2="180" />
            <line x1="110" y1="120" x2="95" y2="190" />
            <line x1="280" y1="110" x2="265" y2="180" />
            <line x1="340" y1="125" x2="325" y2="195" />
          </g>

          {/* Vintage Street Lamp */}
          <path d="M70 260 L70 90 M60 90 L80 90 M65 90 L70 70 L75 90" stroke={accentColor} strokeWidth="2" />
          <circle cx="70" cy="80" r="16" fill={accentColor} fillOpacity="0.2" />
          <circle cx="70" cy="80" r="8" fill="#fff6d6" fillOpacity="0.7" />

          {/* Vintage Umbrella & Romantic Couple Silhouette */}
          <g transform="translate(140, 70)">
            {/* Umbrella Canopy */}
            <path d="M10 90 Q60 25 110 90 C95 86 85 86 70 90 C55 86 45 86 30 90 Z" fill="#2d1b22" stroke={accentColor} strokeWidth="1.5" />
            {/* Umbrella handle */}
            <path d="M60 85 L60 150 C60 155 54 157 52 153" stroke={accentColor} strokeWidth="2" strokeLinecap="round" fill="none" />
            {/* Silhouettes */}
            <ellipse cx="50" cy="115" rx="9" ry="11" fill="#181316" />
            <ellipse cx="70" cy="113" rx="8" ry="10" fill="#181316" />
            <path d="M42 126 C42 120 48 118 52 122 C56 122 62 120 62 126 L60 170 L40 170 Z" fill="#181316" />
            <path d="M63 123 C65 120 72 120 78 124 L82 170 L63 170 Z" fill="#181316" />
          </g>

          {/* Ground reflection & water ripples */}
          <ellipse cx="200" cy="250" rx="140" ry="10" fill={accentColor} fillOpacity="0.08" />
          <ellipse cx="200" cy="250" rx="90" ry="5" fill="#fff" fillOpacity="0.05" />
        </svg>
      );

    case 'vintage-rose':
      return (
        <svg viewBox="0 0 400 300" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="300" fill="#1b1215" />
          <radialGradient id="roseGlow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#9c2f3d" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#000" stopOpacity="0" />
          </radialGradient>
          <rect width="400" height="300" fill="url(#roseGlow)" />
          
          {/* Ornate Vintage Filigree corner flourishes */}
          <g stroke={accentColor} strokeWidth="1.2" strokeOpacity="0.6" fill="none">
            <path d="M20 20 Q50 20 60 50 Q60 20 90 20" />
            <path d="M380 20 Q350 20 340 50 Q340 20 310 20" />
            <path d="M20 280 Q50 280 60 250 Q60 280 90 280" />
            <path d="M380 280 Q350 280 340 250 Q340 280 310 280" />
          </g>

          {/* Engraved Vintage Rose Illustration */}
          <g transform="translate(150, 60)" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
            {/* Petals */}
            <path d="M50 45 C45 30 65 25 70 35 C75 25 95 30 90 45 C100 55 95 70 85 75 C75 80 65 80 55 75 C45 70 40 55 50 45 Z" fill="#661b24" fillOpacity="0.6" />
            <path d="M60 40 C65 35 75 35 80 40 C85 45 80 55 70 55 C60 55 55 45 60 40 Z" fill="#9c2f3d" fillOpacity="0.7" />
            <path d="M65 43 Q70 41 75 43 Q73 48 68 47 Z" fill="#cf4356" />
            {/* Outer Petals */}
            <path d="M42 55 C35 65 42 85 55 90 C65 95 75 95 85 90 C98 85 105 65 98 55" />
            {/* Stem & Leaves */}
            <path d="M70 95 Q68 135 65 175" strokeWidth="2" stroke="#4a5d3f" />
            <path d="M68 120 Q95 105 100 125 C90 135 75 130 68 125 Z" fill="#3a4b33" fillOpacity="0.5" stroke="#4a5d3f" />
            <path d="M66 145 Q40 135 35 155 C45 165 60 158 66 150 Z" fill="#3a4b33" fillOpacity="0.5" stroke="#4a5d3f" />
            {/* Thorns */}
            <path d="M68 130 L74 128" />
            <path d="M65 160 L59 158" />
          </g>
        </svg>
      );

    case 'old-letter':
    case 'quill-ink':
      return (
        <svg viewBox="0 0 400 300" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="300" fill="#181411" />
          {/* Airmail stripes border top and bottom */}
          <g transform="translate(0, 0)">
            <rect x="0" y="0" width="400" height="6" fill="#8f2d38" />
            <line x1="0" y1="8" x2="400" y2="8" stroke={accentColor} strokeWidth="1" strokeDasharray="8,6" />
            <rect x="0" y="294" width="400" height="6" fill="#2d4a66" />
            <line x1="0" y1="292" x2="400" y2="292" stroke={accentColor} strokeWidth="1" strokeDasharray="8,6" />
          </g>

          {/* Postal Stamp & Postmark Graphic on top right */}
          <g transform="translate(280, 25)">
            {/* Perforated stamp */}
            <rect x="0" y="0" width="80" height="95" rx="3" fill="#ecd9bd" stroke="#8a6c47" strokeWidth="2" strokeDasharray="3,3" />
            <rect x="6" y="6" width="68" height="83" fill="#2b1f1a" />
            <circle cx="40" cy="40" r="22" stroke={accentColor} strokeWidth="1" fill="none" />
            <text x="40" y="44" fill={accentColor} fontSize="18" textAnchor="middle" fontFamily="serif">৳ ২</text>
            <text x="40" y="75" fill="#e8d5bc" fontSize="9" textAnchor="middle" fontFamily="serif">BANGLADESH</text>
            {/* Cancellation wavy ink lines */}
            <path d="M-25 25 Q-10 15 5 25 T35 25 T65 25 T95 25" stroke="#000" strokeWidth="2" strokeOpacity="0.4" />
            <path d="M-30 45 Q-15 35 0 45 T30 45 T60 45 T90 45" stroke="#000" strokeWidth="2" strokeOpacity="0.4" />
            <path d="M-25 65 Q-10 55 5 65 T35 65 T65 65 T95 65" stroke="#000" strokeWidth="2" strokeOpacity="0.4" />
            {/* Circle Postmark Dhaka GPO */}
            <g transform="translate(-15, 45)">
              <circle cx="0" cy="0" r="24" stroke="#000" strokeWidth="1.5" strokeOpacity="0.45" fill="none" />
              <text x="0" y="-8" fill="#000" fillOpacity="0.5" fontSize="7" textAnchor="middle" fontWeight="bold">DHAKA G.P.O.</text>
              <text x="0" y="4" fill="#000" fillOpacity="0.5" fontSize="7" textAnchor="middle">12.11.1974</text>
              <text x="0" y="14" fill="#000" fillOpacity="0.5" fontSize="6" textAnchor="middle">POSTED</text>
            </g>
          </g>

          {/* Faint quill pen and ink bottle in corner */}
          <g transform="translate(30, 180)" opacity="0.3">
            <path d="M20 70 L60 20 Q55 10 45 15 L15 65 Z" fill={accentColor} />
            <rect x="70" y="60" width="25" height="25" rx="3" fill="#2d221c" stroke={accentColor} strokeWidth="1" />
            <rect x="77" y="55" width="11" height="5" fill={accentColor} />
          </g>
        </svg>
      );

    case 'moonlight-night':
      return (
        <svg viewBox="0 0 400 300" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="300" fill="#0e131c" />
          {/* Subtle night stars */}
          <g fill="#f0f4f8" opacity="0.4">
            <circle cx="45" cy="40" r="1.5" />
            <circle cx="110" cy="65" r="1" />
            <circle cx="180" cy="30" r="1.5" />
            <circle cx="230" cy="80" r="1" />
            <circle cx="290" cy="35" r="1.8" />
            <circle cx="350" cy="70" r="1.2" />
            <circle cx="75" cy="110" r="1" />
            <circle cx="330" cy="130" r="1.5" />
          </g>
          {/* Crescent Moon */}
          <g transform="translate(310, 30)">
            <circle cx="30" cy="30" r="30" fill="#fff7d6" fillOpacity="0.12" />
            <path d="M40 10 A25 25 0 0 0 40 50 A20 20 0 0 1 40 10 Z" fill="#ffeaa7" />
          </g>
          {/* Night Horizon & Tree Silhouette */}
          <path d="M0 240 Q100 230 200 235 T400 230 L400 300 L0 300 Z" fill="#080b10" />
          {/* Old Banyam / Pine silhouette */}
          <g transform="translate(20, 150)" fill="#05070a">
            <path d="M35 120 L38 50 Q20 30 10 10 Q35 25 40 45 Q55 20 70 10 Q60 35 44 50 L46 120 Z" />
            <ellipse cx="25" cy="20" rx="20" ry="12" opacity="0.8" />
            <ellipse cx="60" cy="18" rx="22" ry="14" opacity="0.8" />
            <ellipse cx="40" cy="10" rx="18" ry="10" opacity="0.9" />
          </g>
        </svg>
      );

    case 'railway-station':
      return (
        <svg viewBox="0 0 400 300" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="300" fill="#181310" />
          <radialGradient id="steamGlow" cx="0.7" cy="0.4" r="0.5">
            <stop offset="0%" stopColor="#b48342" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#000" stopOpacity="0" />
          </radialGradient>
          <rect width="400" height="300" fill="url(#steamGlow)" />
          {/* Vintage Station Clock & Platform roof */}
          <path d="M0 20 L400 20 L350 70 L0 70 Z" fill="#241b16" opacity="0.8" />
          <g transform="translate(60, 40)">
            <rect x="18" y="0" width="4" height="25" fill={accentColor} />
            <circle cx="20" cy="35" r="18" fill="#f5ecd8" stroke={accentColor} strokeWidth="2" />
            {/* Clock hands showing 6:15 */}
            <line x1="20" y1="35" x2="20" y2="24" stroke="#1a110a" strokeWidth="2" strokeLinecap="round" />
            <line x1="20" y1="35" x2="29" y2="38" stroke="#1a110a" strokeWidth="1.5" strokeLinecap="round" />
          </g>
          {/* Railway Tracks vanishing into perspective */}
          <g stroke="#4a3728" strokeWidth="2">
            <line x1="160" y1="200" x2="30" y2="300" />
            <line x1="190" y1="200" x2="160" y2="300" />
            {/* Track ties */}
            <line x1="155" y1="210" x2="195" y2="210" />
            <line x1="140" y1="225" x2="190" y2="225" />
            <line x1="115" y1="245" x2="185" y2="245" />
            <line x1="85" y1="270" x2="180" y2="270" />
            <line x1="45" y1="295" x2="170" y2="295" strokeWidth="3" />
          </g>
          {/* Vintage Steam Train Silhouette on horizon */}
          <g transform="translate(200, 150)" fill="#140e0b">
            <rect x="30" y="30" width="90" height="40" rx="3" />
            <rect x="100" y="15" width="25" height="55" rx="2" />
            <rect x="40" y="18" width="14" height="20" />
            {/* Steam clouds */}
            <ellipse cx="45" cy="5" rx="15" ry="10" fill="#fff" fillOpacity="0.12" />
            <ellipse cx="60" cy="-5" rx="22" ry="14" fill="#fff" fillOpacity="0.1" />
            <ellipse cx="85" cy="-12" rx="28" ry="16" fill="#fff" fillOpacity="0.08" />
          </g>
        </svg>
      );

    case 'coffee-cup':
      return (
        <svg viewBox="0 0 400 300" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="300" fill="#1b130e" />
          <radialGradient id="coffeeGlow" cx="0.5" cy="0.6" r="0.4">
            <stop offset="0%" stopColor="#c59d5f" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#000" stopOpacity="0" />
          </radialGradient>
          <rect width="400" height="300" fill="url(#coffeeGlow)" />
          {/* Wood tabletop grain lines */}
          <line x1="0" y1="220" x2="400" y2="220" stroke="#38261c" strokeWidth="2" />
          <line x1="0" y1="250" x2="400" y2="250" stroke="#2c1e16" strokeWidth="1" strokeDasharray="40,20" />
          {/* Vintage ceramic cup and saucer */}
          <g transform="translate(145, 110)">
            {/* Steam spirals */}
            <path d="M45 20 Q55 5 45 -10 T55 -25" stroke={accentColor} strokeWidth="1.5" strokeOpacity="0.4" fill="none" />
            <path d="M60 25 Q70 10 60 -5 T70 -20" stroke={accentColor} strokeWidth="1.5" strokeOpacity="0.4" fill="none" />
            {/* Saucer */}
            <ellipse cx="55" cy="115" rx="65" ry="14" fill="#2d2019" stroke={accentColor} strokeWidth="1.5" />
            {/* Cup */}
            <path d="M20 40 Q15 95 55 98 Q95 95 90 40 Z" fill="#2a1c14" stroke={accentColor} strokeWidth="2" />
            {/* Handle */}
            <path d="M88 50 Q112 55 105 75 Q98 90 85 85" stroke={accentColor} strokeWidth="3" fill="none" strokeLinecap="round" />
            {/* Coffee surface */}
            <ellipse cx="55" cy="42" rx="34" ry="9" fill="#130b07" stroke="#684227" strokeWidth="1" />
            {/* Steam ring / foam art heart */}
            <path d="M50 40 C50 38 52 36 55 38 C58 36 60 38 60 40 C60 43 55 45 55 45 C55 45 50 43 50 40 Z" fill="#c59d5f" fillOpacity="0.5" />
          </g>
        </svg>
      );

    case 'gramophone-melody':
    case 'gramophone':
      return (
        <svg viewBox="0 0 400 300" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="300" fill="#181310" />
          {/* Gramophone horn in brass */}
          <g transform="translate(130, 50)">
            {/* Musical notes floating */}
            <g fill={accentColor} opacity="0.5">
              <text x="140" y="20" fontSize="18" fontFamily="serif">♪</text>
              <text x="175" y="45" fontSize="22" fontFamily="serif">♫</text>
              <text x="155" y="80" fontSize="16" fontFamily="serif">♩</text>
            </g>
            {/* Horn Flare */}
            <path d="M110 30 Q145 10 150 70 Q145 130 110 105 Q70 80 40 90 L40 105 L25 105 L25 80 Q60 65 110 30 Z" 
              fill="#c59d5f" fillOpacity="0.8" stroke="#dfb76c" strokeWidth="2" />
            {/* Horn opening rings */}
            <ellipse cx="130" cy="70" rx="15" ry="35" fill="#543e1d" stroke="#dfb76c" strokeWidth="2" />
            {/* Wooden Base Box */}
            <rect x="0" y="110" width="90" height="45" rx="3" fill="#3a2517" stroke={accentColor} strokeWidth="1.5" />
            {/* Turntable platter & vinyl */}
            <ellipse cx="45" cy="110" rx="42" ry="12" fill="#100d0c" stroke="#333" strokeWidth="1" />
            <circle cx="45" cy="110" r="10" fill="#8f2d38" />
            <circle cx="45" cy="110" r="3" fill="#d4af37" />
            {/* Tone arm */}
            <path d="M80 115 L60 108 L48 112" stroke={accentColor} strokeWidth="2" strokeLinecap="round" fill="none" />
          </g>
        </svg>
      );

    case 'boat-river':
      return (
        <svg viewBox="0 0 400 300" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="300" fill="#171217" />
          {/* Sunset sky gradient */}
          <linearGradient id="riverSunset" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3d1e28" />
            <stop offset="45%" stopColor="#873e3b" />
            <stop offset="70%" stopColor="#b5673d" />
            <stop offset="100%" stopColor="#1a1114" />
          </linearGradient>
          <rect width="400" height="200" fill="url(#riverSunset)" />
          {/* Sun setting */}
          <circle cx="200" cy="140" r="35" fill="#fcd385" fillOpacity="0.85" />
          {/* Distant river banks */}
          <path d="M0 160 Q120 150 200 155 T400 150 L400 170 L0 170 Z" fill="#2c161a" />
          {/* Water reflection */}
          <rect x="0" y="170" width="400" height="130" fill="#181014" />
          <g stroke="#fcd385" strokeOpacity="0.25" strokeWidth="1.5">
            <line x1="160" y1="180" x2="240" y2="180" />
            <line x1="140" y1="195" x2="260" y2="195" />
            <line x1="120" y1="215" x2="280" y2="215" />
            <line x1="100" y1="240" x2="300" y2="240" />
          </g>
          {/* Traditional Bengali Country Boat (ডিঙ্গি নৌকা) */}
          <g transform="translate(130, 195)">
            <path d="M10 25 Q70 38 130 25 Q120 15 70 15 Q20 15 10 25 Z" fill="#0c0809" stroke={accentColor} strokeWidth="1" />
            {/* Chhoi (Bamboo Hood canopy) */}
            <path d="M45 17 Q70 2 95 17 Z" fill="#221518" stroke={accentColor} strokeWidth="1" />
            {/* Majhi silhouette with oar */}
            <circle cx="35" cy="12" r="4" fill="#0c0809" />
            <line x1="33" y1="15" x2="25" y2="35" stroke="#0c0809" strokeWidth="2" />
          </g>
        </svg>
      );

    case 'post-box':
      return (
        <svg viewBox="0 0 400 300" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="300" fill="#161211" />
          <radialGradient id="boxGlow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#8f2d38" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#000" stopOpacity="0" />
          </radialGradient>
          <rect width="400" height="300" fill="url(#boxGlow)" />
          {/* Classic Vintage Bengali Post Box */}
          <g transform="translate(160, 40)">
            {/* Dome top */}
            <path d="M10 50 Q40 10 70 50 Z" fill="#781d28" stroke={accentColor} strokeWidth="1.5" />
            <circle cx="40" cy="18" r="5" fill={accentColor} />
            {/* Cylinder body */}
            <rect x="10" y="50" width="60" height="110" rx="4" fill="#641620" stroke={accentColor} strokeWidth="1.5" />
            {/* Mail slot */}
            <rect x="22" y="65" width="36" height="8" rx="2" fill="#1a080a" stroke={accentColor} strokeWidth="1" />
            <text x="40" y="90" fill="#e8d5bc" fontSize="8" textAnchor="middle" fontFamily="serif" fontWeight="bold">POST BOX</text>
            <text x="40" y="102" fill={accentColor} fontSize="7" textAnchor="middle" fontFamily="serif">চিঠির বাক্স</text>
            {/* Clearance hours plate */}
            <rect x="25" y="112" width="30" height="24" fill="#2d1014" stroke="#8a6c47" strokeWidth="1" />
            <text x="40" y="124" fill="#f0e2cf" fontSize="6" textAnchor="middle">ডাক ছাড়ার সময়</text>
            <text x="40" y="132" fill="#f0e2cf" fontSize="6" textAnchor="middle">১০:০০ ও ১৭:০০</text>
            {/* Pillar post */}
            <rect x="32" y="160" width="16" height="50" fill="#2a1c17" />
            <rect x="20" y="210" width="40" height="10" rx="2" fill="#1c130f" />
          </g>
          {/* Blue Love Letter leaning against post */}
          <g transform="translate(210, 185) rotate(-15)">
            <rect x="0" y="0" width="45" height="30" rx="2" fill="#2e4d6d" stroke={accentColor} strokeWidth="1" />
            <path d="M0 0 L22 16 L45 0" stroke={accentColor} strokeWidth="1" fill="none" />
            {/* Tiny red wax seal */}
            <circle cx="22" cy="16" r="4" fill="#9c2f3d" />
          </g>
        </svg>
      );

    case 'bengali-kadam':
    case 'kadam-flower':
      return (
        <svg viewBox="0 0 400 300" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="300" fill="#141813" />
          {/* Rain backdrop */}
          <g stroke="#ffffff" strokeOpacity="0.12" strokeWidth="1">
            <line x1="50" y1="20" x2="35" y2="120" />
            <line x1="120" y1="40" x2="105" y2="140" />
            <line x1="280" y1="10" x2="265" y2="110" />
            <line x1="350" y1="30" x2="335" y2="130" />
          </g>
          {/* Kadam Flower (কদম ফুল) with radial stamens */}
          <g transform="translate(180, 130)">
            {/* Green leaves */}
            <path d="M-60 20 Q-20 -10 0 0 Q-10 40 -60 20 Z" fill="#2d4228" stroke="#4a6344" strokeWidth="1" />
            <path d="M60 20 Q20 -10 0 0 Q10 40 60 20 Z" fill="#2d4228" stroke="#4a6344" strokeWidth="1" />
            {/* Flower Center Sphere */}
            <circle cx="0" cy="0" r="32" fill="#e69c24" />
            {/* Radial white-yellow stamens pins */}
            {Array.from({ length: 32 }).map((_, i) => {
              const angle = (i * 360) / 32;
              const rad = (angle * Math.PI) / 180;
              const x1 = Math.cos(rad) * 30;
              const y1 = Math.sin(rad) * 30;
              const x2 = Math.cos(rad) * 46;
              const y2 = Math.sin(rad) * 46;
              return (
                <g key={i}>
                  <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#fff9e6" strokeWidth="1.5" />
                  <circle cx={x2} cy={y2} r="1.5" fill="#fff" />
                </g>
              );
            })}
            {/* Center glow */}
            <circle cx="0" cy="0" r="18" fill="#f5af38" />
          </g>
        </svg>
      );

    case 'lantern-night':
    default:
      return (
        <svg viewBox="0 0 400 300" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="300" fill="#141110" />
          {/* Warm lantern glow */}
          <radialGradient id="lanternGlow" cx="0.5" cy="0.5" r="0.45">
            <stop offset="0%" stopColor="#f5af38" stopOpacity="0.4" />
            <stop offset="60%" stopColor="#b47828" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#000" stopOpacity="0" />
          </radialGradient>
          <rect width="400" height="300" fill="url(#lanternGlow)" />
          {/* Vintage Kerosene Hurricane Lantern */}
          <g transform="translate(170, 70)">
            {/* Top Loop */}
            <circle cx="30" cy="15" r="10" stroke={accentColor} strokeWidth="2" fill="none" />
            {/* Cap */}
            <path d="M15 25 L45 25 L40 40 L20 40 Z" fill="#2d1f17" stroke={accentColor} strokeWidth="1.5" />
            {/* Glass Chimney */}
            <path d="M20 40 Q10 75 22 105 L38 105 Q50 75 40 40 Z" fill="#fff2c2" fillOpacity="0.25" stroke={accentColor} strokeWidth="1.5" />
            {/* Flame */}
            <path d="M30 65 Q35 78 30 85 Q25 78 30 65 Z" fill="#ffdd59" />
            <circle cx="30" cy="78" r="4" fill="#ff5e3a" />
            {/* Side Wire Guards */}
            <path d="M10 50 Q0 75 12 105" stroke={accentColor} strokeWidth="1.5" fill="none" />
            <path d="M50 50 Q60 75 48 105" stroke={accentColor} strokeWidth="1.5" fill="none" />
            {/* Base tank */}
            <rect x="10" y="105" width="40" height="30" rx="3" fill="#2c1e16" stroke={accentColor} strokeWidth="1.5" />
            <line x1="5" y1="135" x2="55" y2="135" stroke={accentColor} strokeWidth="2" />
          </g>
        </svg>
      );
  }
};

interface PostalStampProps {
  type: StampType;
  accentColor?: string;
  className?: string;
}

export const PostalStamp: React.FC<PostalStampProps> = ({
  type,
  accentColor = "#c5a059",
  className = "w-20 h-24"
}) => {
  switch (type) {
    case 'dhaka-gpo':
      return (
        <div className={`relative flex flex-col items-center justify-between p-1.5 bg-[#2a1d17] border-2 border-dashed border-[#d4af37]/60 rounded shadow-md text-center ${className}`}>
          <div className="w-full flex justify-between items-center text-[8px] text-[#c5a059] font-mono font-bold tracking-wider">
            <span>🇧🇩 BD</span>
            <span>৳ ৫</span>
          </div>
          <div className="w-12 h-12 rounded-full border border-[#c5a059]/40 flex flex-col items-center justify-center p-1 bg-[#1a120d]">
            <span className="text-[7px] text-[#fbf6ee] font-serif font-bold uppercase tracking-wider">DHAKA</span>
            <span className="text-[6px] text-[#c5a059]">G.P.O.</span>
            <span className="text-[6px] text-[#e8d5bc]">1974</span>
          </div>
          <span className="text-[7px] text-[#e8d5bc] tracking-widest uppercase font-serif">পোস্ট অফিস</span>
          {/* Postmark ink mark overlay */}
          <div className="absolute -left-3 -top-2 w-14 h-14 border border-black/35 rounded-full pointer-events-none rotate-12 flex items-center justify-center">
            <span className="text-[6px] text-black/40 font-mono tracking-tighter">POSTED</span>
          </div>
        </div>
      );

    case 'vintage-rose':
      return (
        <div className={`relative flex flex-col items-center justify-between p-1.5 bg-[#3b151b] border-2 border-dashed border-[#dfb76c]/60 rounded shadow-md text-center ${className}`}>
          <div className="w-full flex justify-between items-center text-[8px] text-[#dfb76c] font-mono">
            <span>POST</span>
            <span>৳ ১০</span>
          </div>
          <div className="text-xl">🌹</div>
          <span className="text-[7px] text-[#f5ebd9] font-serif tracking-wider uppercase">VINTAGE ROSE</span>
        </div>
      );

    case 'love-seal':
      return (
        <div className={`relative flex flex-col items-center justify-center p-1.5 bg-[#3a1818] border-2 border-double border-[#d4af37] rounded-full shadow-lg text-center aspect-square ${className}`}>
          <span className="text-lg">💌</span>
          <span className="text-[6px] text-[#e8d5bc] font-serif font-bold uppercase tracking-widest">ETERNAL</span>
          <span className="text-[5px] text-[#c5a059]">LOVE</span>
        </div>
      );

    case 'royal-mail':
      return (
        <div className={`relative flex flex-col items-center justify-between p-1.5 bg-[#1a2332] border-2 border-dashed border-[#c5a059]/70 rounded shadow-md text-center ${className}`}>
          <div className="w-full flex justify-between items-center text-[7px] text-[#c5a059] font-mono font-bold">
            <span>SPECIAL</span>
            <span>৳ ২০</span>
          </div>
          <div className="text-lg">👑</div>
          <span className="text-[6px] text-[#fbf6ee] font-serif uppercase tracking-wider">ROYAL POST</span>
        </div>
      );

    case 'wax-seal':
      return (
        <div className={`relative flex flex-col items-center justify-center p-2 bg-[#6b1d24] border-2 border-[#d4af37] rounded-full shadow-inner text-center aspect-square ring-2 ring-[#4a1217] ${className}`}>
          <span className="text-xl">❦</span>
          <span className="text-[6px] text-[#fbf6ee] font-serif tracking-widest uppercase">SEALED</span>
        </div>
      );

    case 'chittagong-post':
    default:
      return (
        <div className={`relative flex flex-col items-center justify-between p-1.5 bg-[#2b241c] border-2 border-dashed border-[#b48342] rounded shadow-md text-center ${className}`}>
          <div className="w-full flex justify-between items-center text-[8px] text-[#b48342] font-mono">
            <span>CTG</span>
            <span>৳ ২</span>
          </div>
          <div className="w-10 h-10 border border-[#b48342]/40 rounded-full flex flex-col items-center justify-center">
            <span className="text-[6px] text-[#fbf6ee]">PORT</span>
            <span className="text-[6px] text-[#b48342]">1982</span>
          </div>
          <span className="text-[6px] text-[#e8d5bc] tracking-wider uppercase font-serif">CHITTAGONG</span>
        </div>
      );
  }
};
