import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

export function QRCodeDisplay({ eventId }) {
  const url = `${window.location.origin}/event/${eventId}`;

  return (
    <div className="flex flex-col items-center space-y-4 p-6 bg-white rounded-lg shadow-md">
      <QRCodeSVG value={url} size={256} />
      <p className="text-sm text-gray-600">
        Scan this QR code to access the event album
      </p>
      <a
        href={url}
        className="text-blue-600 hover:text-blue-800 text-sm"
        target="_blank"
        rel="noopener noreferrer"
      >
        {url}
      </a>
    </div>
  );
}