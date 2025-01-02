import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export function useEvent(eventId) {
  const [event, setEvent] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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