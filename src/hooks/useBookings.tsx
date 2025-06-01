
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

export interface Booking {
  id: string;
  property_id: string;
  check_in_date: string;
  check_out_date: string;
  guest_count: number;
  total_amount: number;
  status: string;
  created_at: string;
  properties?: {
    title: string;
    location: string;
    images: string[];
    profiles?: {
      first_name: string;
      last_name: string;
    };
  };
}

export const useBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchBookings();
    }
  }, [user]);

  const fetchBookings = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          properties (
            title,
            location,
            images,
            profiles:host_id (
              first_name,
              last_name
            )
          )
        `)
        .eq('guest_id', user.id)
        .order('check_in_date', { ascending: false });

      if (error) {
        console.error('Error fetching bookings:', error);
        toast({
          title: "Error",
          description: "Failed to load bookings",
          variant: "destructive",
        });
        return;
      }

      setBookings(data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getUpcomingBookings = () => {
    const today = new Date().toISOString().split('T')[0];
    return bookings.filter(booking => booking.check_in_date >= today);
  };

  const getPastBookings = () => {
    const today = new Date().toISOString().split('T')[0];
    return bookings.filter(booking => booking.check_out_date < today);
  };

  return { 
    bookings, 
    loading, 
    upcomingBookings: getUpcomingBookings(),
    pastBookings: getPastBookings(),
    refetch: fetchBookings 
  };
};
