import React from 'react';
import { useParams } from 'react-router-dom';
import { PhotoGrid } from '../components/PhotoGrid';
import { UploadPhoto } from '../components/UploadPhoto';
import { useEvent } from '../hooks/useEvent';

export function EventPage() {
  const { id } = useParams();
  const { event, photos, loading, error, refreshPhotos } = useEvent(id);

  if (loading) {
    return <div>Loading event...</div>;
  }

  if (error) {
    return <div>Error loading event: {error.message}</div>;
  }

  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">{event.title}</h1>
      <p className="text-gray-600 mb-6">{event.description}</p>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Upload Photos</h2>
        <UploadPhoto eventId={event.id} onUploadComplete={refreshPhotos} />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Photos</h2>
        <PhotoGrid photos={photos} />
        {photos.length === 0 && (
          <p className="text-gray-500 text-center">No photos yet. Be the first to upload!</p>
        )}
      </div>
    </div>
  );
}