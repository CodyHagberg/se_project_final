import { useState } from "react";
import "./ContentCardSet.css";

function ContentCardSet({ set }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  if (!set?.items?.length) return null;

  const closeLightbox = () => setLightboxIndex(null);

  const showPrev = (e) => {
    e.stopPropagation();
    setLightboxIndex((i) => (i > 0 ? i - 1 : set.items.length - 1));
  };

  const showNext = (e) => {
    e.stopPropagation();
    setLightboxIndex((i) => (i < set.items.length - 1 ? i + 1 : 0));
  };

  const activeItem = lightboxIndex !== null ? set.items[lightboxIndex] : null;

  return (
    <div className="contentCardSet">
      {set.name && <p className="contentCardSet__title">{set.name}</p>}

      <div className="contentCardSet__scroll">
        {set.items.map((item, idx) => (
          <button
            key={item._id || idx}
            className="contentCardSet__card"
            onClick={() => item.imageUrl && setLightboxIndex(idx)}
            type="button"
          >
            {item.imageUrl && (
              <img
                src={item.imageUrl}
                alt={item.title || ""}
                className="contentCardSet__img"
                loading="lazy"
              />
            )}
            <div className="contentCardSet__body">
              {item.title && <span className="contentCardSet__itemTitle">{item.title}</span>}
              {item.price && <span className="contentCardSet__price">{item.price}</span>}
              {item.description && (
                <span className="contentCardSet__desc">{item.description}</span>
              )}
            </div>
          </button>
        ))}
      </div>

      {activeItem && (
        <div className="contentCardSet__lightbox" onClick={closeLightbox}>
          <div
            className="contentCardSet__lightboxInner"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="contentCardSet__lightboxClose" onClick={closeLightbox}>
              &times;
            </button>

            {set.items.length > 1 && (
              <button className="contentCardSet__lightboxNav contentCardSet__lightboxNav--prev" onClick={showPrev}>
                &#8249;
              </button>
            )}

            <img
              src={activeItem.imageUrl}
              alt={activeItem.title || ""}
              className="contentCardSet__lightboxImg"
            />

            {set.items.length > 1 && (
              <button className="contentCardSet__lightboxNav contentCardSet__lightboxNav--next" onClick={showNext}>
                &#8250;
              </button>
            )}

            <div className="contentCardSet__lightboxCaption">
              {activeItem.title && (
                <span className="contentCardSet__lightboxTitle">{activeItem.title}</span>
              )}
              {activeItem.price && (
                <span className="contentCardSet__lightboxPrice">{activeItem.price}</span>
              )}
              {activeItem.description && (
                <p className="contentCardSet__lightboxDesc">{activeItem.description}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ContentCardSet;
