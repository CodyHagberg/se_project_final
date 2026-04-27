import { useState } from "react";
import "./ContentGalleryPanel.css";

const PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='140' fill='%23ddd'%3E%3Crect width='200' height='140' rx='8'/%3E%3Ctext x='50%25' y='54%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='13' fill='%23999'%3ENo image%3C/text%3E%3C/svg%3E";

/** Convert Google Drive share URLs to direct-image URLs; pass others through. */
function toDirectImageUrl(url) {
  if (!url) return "";
  // https://drive.google.com/file/d/FILE_ID/view...
  const fileMatch = url.match(/drive\.google\.com\/file\/d\/([^/]+)/);
  if (fileMatch) return `https://lh3.googleusercontent.com/d/${fileMatch[1]}`;
  // https://drive.google.com/open?id=FILE_ID
  const openMatch = url.match(/drive\.google\.com\/open\?id=([^&]+)/);
  if (openMatch) return `https://lh3.googleusercontent.com/d/${openMatch[1]}`;
  return url;
}

function ContentGalleryPanel({ contentSet, onBack, mode }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  if (!contentSet?.items?.length) return null;

  const handleImgError = (e) => {
    e.currentTarget.src = PLACEHOLDER;
  };

  const closeLightbox = () => setLightboxIndex(null);

  const showPrev = (e) => {
    e.stopPropagation();
    setLightboxIndex((i) => (i > 0 ? i - 1 : contentSet.items.length - 1));
  };

  const showNext = (e) => {
    e.stopPropagation();
    setLightboxIndex((i) => (i < contentSet.items.length - 1 ? i + 1 : 0));
  };

  const activeItem = lightboxIndex !== null ? contentSet.items[lightboxIndex] : null;
  const backLabel = mode === "voice" ? "Back to ALEI" : "Back to chat";

  return (
    <div className="galleryPanel">
      <div className="galleryPanel__header">
        <button className="galleryPanel__backBtn" onClick={onBack} type="button">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          {backLabel}
        </button>
      </div>

      {contentSet.name && <h3 className="galleryPanel__title">{contentSet.name}</h3>}

      <div className="galleryPanel__grid">
        {contentSet.items.map((item, idx) => (
          <button
            key={item._id || idx}
            className="galleryPanel__card"
            onClick={() => setLightboxIndex(idx)}
            type="button"
          >
            <img
              src={toDirectImageUrl(item.imageUrl) || PLACEHOLDER}
              alt={item.title || ""}
              className="galleryPanel__img"
              loading="lazy"
              onError={handleImgError}
            />
            <div className="galleryPanel__cardBody">
              {item.title && <span className="galleryPanel__cardTitle">{item.title}</span>}
              {item.price && <span className="galleryPanel__cardPrice">{item.price}</span>}
              {item.description && <span className="galleryPanel__cardDesc">{item.description}</span>}
            </div>
          </button>
        ))}
      </div>

      {activeItem && (
        <div className="galleryPanel__lightbox" onClick={closeLightbox}>
          <div className="galleryPanel__lightboxInner" onClick={(e) => e.stopPropagation()}>
            <button className="galleryPanel__lightboxClose" onClick={closeLightbox}>&times;</button>

            {contentSet.items.length > 1 && (
              <button className="galleryPanel__lightboxNav galleryPanel__lightboxNav--prev" onClick={showPrev}>&#8249;</button>
            )}

            <img
              src={toDirectImageUrl(activeItem.imageUrl) || PLACEHOLDER}
              alt={activeItem.title || ""}
              className="galleryPanel__lightboxImg"
              onError={handleImgError}
            />

            {contentSet.items.length > 1 && (
              <button className="galleryPanel__lightboxNav galleryPanel__lightboxNav--next" onClick={showNext}>&#8250;</button>
            )}

            <div className="galleryPanel__lightboxCaption">
              {activeItem.title && <span className="galleryPanel__lightboxTitle">{activeItem.title}</span>}
              {activeItem.price && <span className="galleryPanel__lightboxPrice">{activeItem.price}</span>}
              {activeItem.description && <p className="galleryPanel__lightboxDesc">{activeItem.description}</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ContentGalleryPanel;
