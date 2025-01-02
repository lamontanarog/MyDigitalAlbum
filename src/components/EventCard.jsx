import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, QrCode } from 'lucide-react';

export function EventCard({ event }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
      <p className="text-gray-600 mb-4">{event.description}</p>
      <div className="flex items-center gap-4 text-gray-500">
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          <span>{new Date(event.date).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center gap-1">
          <QrCode className="w-4 h-4" />
          <Link 
            to={`/event/${event.id}/qr`}
            className="text-blue-500 hover:text-blue-600"
          >
            View QR Code
          </Link>
        </div>
      </div>
      <Link
        to={`/event/${event.id}`}
        className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
      >
        View Album
      </Link>
    </div>
  );
}