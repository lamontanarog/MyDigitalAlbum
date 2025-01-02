import React from 'react';
import { EventCard } from '../components/EventCard';
import { useEvents } from '../hooks/useEvents';

export function HomePage() {
  const { events, loading, error } = useEvents();

  if (loading) {
    return <div>Loading events...</div>;
  }

  if (error) {
    return <div>Error loading events: {error.message}</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Your Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
      {events.length === 0 && (
        <p className="text-gray-500 text-center">No events yet. Create your first event!</p>
      )}
    </div>
  );
}