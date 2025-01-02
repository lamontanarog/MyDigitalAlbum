import React from 'react';

export function PhotoGrid({ photos }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {photos.map((photo) => (
        <div key={photo.id} className="aspect-square relative group">
          <img
            src={photo.url}
            alt=""
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity rounded-lg" />
        </div>
      ))}
    </div>
  );
}