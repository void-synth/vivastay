
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Property {
  id: string;
  title: string;
  description: string;
  location: string;
  price_per_night: number;
  max_guests: number;
  bedrooms: number;
  bathrooms: number;
  property_type: string;
  amenities: string[];
  images: string[];
  available: boolean;
  host_id: string;
  created_at: string;
  profiles?: {
    first_name: string;
    last_name: string;
    avatar_url?: string;
  };
}

export interface PropertyFilters {
  search: string;
  minPrice: string;
  maxPrice: string;
  propertyType: string;
  minGuests: string;
  amenities: string[];
}

export const useProperties = (filters: PropertyFilters) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchProperties();
  }, [filters]);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('properties')
        .select(`
          *,
          profiles:host_id (
            first_name,
            last_name,
            avatar_url
          )
        `)
        .eq('available', true);

      // Apply search filter
      if (filters.search) {
        query = query.or(`title.ilike.%${filters.search}%,location.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
      }

      // Apply price filters
      if (filters.minPrice) {
        query = query.gte('price_per_night', parseFloat(filters.minPrice));
      }
      if (filters.maxPrice) {
        query = query.lte('price_per_night', parseFloat(filters.maxPrice));
      }

      // Apply property type filter
      if (filters.propertyType && filters.propertyType !== 'all') {
        query = query.eq('property_type', filters.propertyType);
      }

      // Apply guest filter
      if (filters.minGuests) {
        query = query.gte('max_guests', parseInt(filters.minGuests));
      }

      // Apply amenities filter
      if (filters.amenities.length > 0) {
        query = query.contains('amenities', filters.amenities);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching properties:', error);
        toast({
          title: "Error",
          description: "Failed to load properties",
          variant: "destructive",
        });
        return;
      }

      setProperties(data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return { properties, loading, refetch: fetchProperties };
};
