import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { QRCodeDisplay } from '../components/QRCodeDisplay';
import { useEvent } from '../hooks/useEvent';

export function QRCodePage() {
  const { id } = useParams();
  const { event, loading, error } = useEvent(id);

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
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-2">{event.title}</h1>
      <p className="text-gray-600 mb-6">Share this QR code with your guests</p>
      <QRCodeDisplay eventId={event.id} />
      <div className="mt-6">
        <Link
          to={`/event/${event.id}`}
          className="text-blue-600 hover:text-blue-800"
        >
          ← Back to Event
        </Link>
      </div>
    </div>
  );
}