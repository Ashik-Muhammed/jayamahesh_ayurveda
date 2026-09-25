// Gallery Page with Category Filter and Interactive Lightbox Modal
import React, { useState } from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Image as ImageIcon,
  ZoomIn
} from 'lucide-react';
import { GALLERY_ITEMS } from '../services/initialData';

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const categories = [
    'All',
    'Center & Architecture',
    'Therapy Rooms',
    'Herbal Garden & Oils',
    'Healing Moments'
  ];

  const filteredItems = activeCategory === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === activeCategory);

  const openLightbox = (index) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextImage = () => {
    setLightboxIndex((prev) => (prev + 1) % filteredItems.length);
  };

  const prevImage = () => {
    setLightboxIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
  };

  const currentItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <div>
      {/* Banner */}
      <section style={{
        background: 'linear-gradient(180deg, #0E2E24 0%, #081F18 100%)',
        color: '#FBFAF7',
        padding: '64px 0 76px 0',
        textAlign: 'center',
        borderBottom: '2px solid #C59A44'
      }}>
        <div className="container-narrow">
          <span className="badge-gold" style={{ marginBottom: '14px' }}>
            Sanctuary Visual Tour
          </span>
          <h1 style={{ fontSize: '3rem', color: '#FBFAF7', marginBottom: '16px' }}>
            The Healing <br />
            <span style={{ color: '#E4C078', fontStyle: 'italic' }}>Environment & Sanctuaries</span>
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#D6DED9', lineHeight: 1.7, margin: '0 auto' }}>
            Glimpse the peaceful Nalukettu architecture, authentic wooden Droni therapy rooms, fragrant herbal gardens, and serene clinical spaces of Jaya Mahesh.
          </p>
        </div>
      </section>

      {/* Filter Tabs & Grid */}
      <section style={{ padding: '60px 0 100px 0', background: 'var(--color-paper-white)' }}>
        <div className="container">
          {/* Categories Filter */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            justifyContent: 'center',
            marginBottom: '48px'
          }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '9px 20px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  transition: 'all 0.2s ease',
                  border: activeCategory === cat ? '1px solid #C69A45' : '1px solid #D6DED9',
                  background: activeCategory === cat ? '#173A30' : 'var(--color-pure-white)',
                  color: activeCategory === cat ? '#E4C078' : '#18352D',
                  cursor: 'pointer'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Image Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '24px'
          }}>
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                onClick={() => openLightbox(index)}
                style={{
                  position: 'relative',
                  height: '280px',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  boxShadow: 'var(--shadow-card)',
                  border: '1px solid var(--color-border-soft)'
                }}
                className="ayur-card"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.4s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />

                {/* Overlay on hover */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, transparent 40%, rgba(12,43,36,0.92) 100%)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '20px',
                  color: '#FBFAF7'
                }}>
                  <span style={{ fontSize: '0.72rem', color: '#E4C078', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
                    {item.category}
                  </span>
                  <h4 style={{ color: '#FBFAF7', fontSize: '1.15rem', margin: '4px 0 0 0' }}>
                    {item.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {currentItem && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(12, 43, 36, 0.95)',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeLightbox();
          }}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            style={{
              position: 'absolute',
              top: '20px',
              right: '24px',
              background: 'rgba(255,255,255,0.15)',
              border: 'none',
              borderRadius: '50%',
              width: '42px',
              height: '42px',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 10
            }}
          >
            <X size={22} />
          </button>

          {/* Navigation Controls */}
          {filteredItems.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                style={{
                  position: 'absolute',
                  left: '20px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(255,255,255,0.15)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '44px',
                  height: '44px',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 10
                }}
              >
                <ChevronLeft size={24} />
              </button>

              <button
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                style={{
                  position: 'absolute',
                  right: '20px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(255,255,255,0.15)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '44px',
                  height: '44px',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 10
                }}
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          {/* Image & Caption Container */}
          <div style={{ maxWidth: '900px', width: '100%', textAlign: 'center' }}>
            <img
              src={currentItem.imageUrl}
              alt={currentItem.title}
              style={{
                maxWidth: '100%',
                maxHeight: '75vh',
                borderRadius: 'var(--radius-md)',
                boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                border: '2px solid #C69A45'
              }}
            />
            <div style={{ marginTop: '16px', color: '#FBFAF7' }}>
              <div className="badge-gold" style={{ marginBottom: '6px' }}>{currentItem.category}</div>
              <h3 style={{ color: '#FBFAF7', fontSize: '1.3rem', margin: '4px 0' }}>{currentItem.title}</h3>
              <p style={{ color: '#D6DED9', fontSize: '0.9rem', maxWidth: '600px', margin: '0 auto' }}>
                {currentItem.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
