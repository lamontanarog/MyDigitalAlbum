import React from 'react';
import { CreateEventForm } from '../components/CreateEventForm';

export function CreateEventPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Create New Event</h1>
      <CreateEventForm />
    </div>
  );
}