// Jaya Mahesh Ayurveda and Wellness - Official Brand Logo Component
import React from 'react';

/**
 * Official Logo Component for Jaya Mahesh Ayurveda and Wellness
 * Renders the official leaf sprout emblem and bespoke typography
 */
export default function Logo({ 
  variant = 'full', 
  theme = 'light', 
  size = 'md',
  showSubtitle = true,
  className = ''
}) {
  // Dimensions based on size
  const iconSizes = {
    sm: 34,
    md: 44,
    lg: 56,
    xl: 72
  };

  const currentIconSize = typeof size === 'number' ? size : (iconSizes[size] || 44);

  // Colors
  const emeraldGreen = '#0B823D';
  const leafLime = '#8DC63F';
  const leafLimeGlow = '#9FE046';
  const textTitleColor = theme === 'dark' ? '#FAF8F5' : '#142E22';
  const textSubtitleColor = theme === 'dark' ? '#C59A44' : '#4E6857';

  // SVG Emblem of the official "JM" leaf sprout
  const LeafEmblem = ({ width = currentIconSize, height = currentIconSize }) => (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 120 120" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', flexShrink: 0 }}
      aria-label="Jaya Mahesh Emblem"
    >
      <defs>
        {/* Subtle gradients for organic depth */}
        <linearGradient id="jmEmeraldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#109647" />
          <stop offset="100%" stopColor="#086B30" />
        </linearGradient>
        <linearGradient id="jmLimeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9DE043" />
          <stop offset="100%" stopColor="#7EBA2E" />
        </linearGradient>
        <linearGradient id="jmCapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0B823D" />
          <stop offset="55%" stopColor="#0B823D" />
          <stop offset="60%" stopColor="#8DC63F" />
          <stop offset="100%" stopColor="#9DE043" />
        </linearGradient>
      </defs>

      {/* Top Arching Leaf Cap */}
      <path 
        d="M 52 28 C 50 14, 68 8, 92 8 C 96 11, 98 16, 92 23 C 84 31, 68 33, 52 28 Z" 
        fill="url(#jmCapGrad)" 
      />

      {/* Left "J" Stem (Emerald Green) with elegant serif hook */}
      <path 
        d="M 36 28 C 42 27, 49 28, 49 33 C 48 48, 48 64, 49 76 C 48 83, 44 87, 36 87 C 32 87, 28 82, 28 73 C 28 58, 30 40, 27 34 C 26 31, 30 28, 36 28 Z" 
        fill="url(#jmEmeraldGrad)" 
      />

      {/* Middle "M" Left Pillar (Vibrant Lime Green) */}
      <path 
        d="M 53 37 C 59 36, 68 39, 68 46 C 68 59, 66 73, 68 83 C 67 87, 63 90, 57 88 C 51 86, 52 79, 53 72 C 54 62, 53 49, 51 43 C 50 39, 51 37, 53 37 Z" 
        fill="url(#jmLimeGrad)" 
      />

      {/* Right "M" Right Pillar (Vibrant Lime Green) */}
      <path 
        d="M 75 36 C 81 35, 90 39, 89 46 C 88 59, 88 74, 91 83 C 91 87, 87 90, 81 88 C 76 86, 76 80, 77 72 C 78 61, 78 49, 75 42 C 74 38, 74 36, 75 36 Z" 
        fill="url(#jmLimeGrad)" 
      />
    </svg>
  );

  // Just the emblem
  if (variant === 'icon') {
    return (
      <div className={`jm-logo-icon ${className}`} style={{ display: 'inline-flex', alignItems: 'center' }}>
        <LeafEmblem />
      </div>
    );
  }

  // Full stacked logo (like the brand sheet)
  if (variant === 'stacked') {
    return (
      <div 
        className={`jm-logo-stacked ${className}`} 
        style={{ 
          display: 'inline-flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          textAlign: 'center' 
        }}
      >
        <LeafEmblem width={currentIconSize * 1.3} height={currentIconSize * 1.3} />
        
        <div style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '1.4rem',
          fontWeight: 700,
          color: textTitleColor,
          letterSpacing: '0.08em',
          marginTop: '6px',
          textTransform: 'uppercase'
        }}>
          Jaya Mahesh
        </div>

        {showSubtitle && (
          <div style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.68rem',
            fontWeight: 700,
            color: textSubtitleColor,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            marginTop: '2px'
          }}>
            Ayurveda and Wellness
          </div>
        )}
      </div>
    );
  }

  // Default horizontal logo (Navbar, Footer, Headers)
  return (
    <div 
      className={`jm-logo-full ${className}`} 
      style={{ 
        display: 'inline-flex', 
        alignItems: 'center', 
        gap: '12px',
        textDecoration: 'none'
      }}
    >
      {/* Emblem with subtle glowing container */}
      <div style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }}>
        <LeafEmblem width={currentIconSize} height={currentIconSize} />
      </div>

      {/* Typography */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{
          fontFamily: 'var(--font-heading)',
          fontSize: size === 'sm' ? '1.1rem' : size === 'lg' ? '1.5rem' : '1.3rem',
          fontWeight: 700,
          color: textTitleColor,
          letterSpacing: '0.04em',
          lineHeight: 1.15,
          textTransform: 'uppercase'
        }}>
          Jaya Mahesh
        </div>

        {showSubtitle && (
          <div style={{
            fontFamily: 'var(--font-body)',
            fontSize: size === 'sm' ? '0.58rem' : size === 'lg' ? '0.72rem' : '0.64rem',
            fontWeight: 700,
            color: textSubtitleColor,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            lineHeight: 1.2,
            marginTop: '2px'
          }}>
            Ayurveda and Wellness
          </div>
        )}
      </div>
    </div>
  );
}
