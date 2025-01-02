import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Event, Photo } from '../types';

export function useEvent(eventId: string) {
  const [event, setEvent] = useState<Event | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchEvent = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', eventId)
        .single();

      if (error) throw error;
      setEvent(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Error fetching event'));
    }
  };

  const fetchPhotos = async () => {
    try {
      const { data, error } = await supabase
        .from('photos')
        .select('*')
        .eq('event_id', eventId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPhotos(data || []);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Error fetching photos'));
    }
  };

  const refreshPhotos = () => {
    fetchPhotos();
  };

  useEffect(() => {
    Promise.all([fetchEvent(), fetchPhotos()]).finally(() => setLoading(false));
  }, [eventId]);

  return { event, photos, loading, error, refreshPhotos };
}