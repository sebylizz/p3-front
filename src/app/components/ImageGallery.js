import React from 'react';

export default function ImageGallery({ images = [], onImageSelect }) {
  if (!images || images.length === 0) {
    return <p>No images available</p>;
  }

  return (
    <div className="flex flex-col space-y-2">
      {images.map((image, index) => (
        <img
          key={index}
          src={image} // Use the full path here
          alt={`Thumbnail ${index}`}
          onClick={() => onImageSelect(image)}
          className="cursor-pointer rounded-md border border-neutral-200 hover:opacity-80 transition-opacity"
          style={{ maxWidth: '100%', objectFit: 'cover' }}
          onError={(e) => {
            e.target.onerror = null; // Prevent loop on error
            e.target.src = '/placeholder.jpg'; // Fallback image for thumbnails
          }}
        />
      ))}
    </div>
  );
}
