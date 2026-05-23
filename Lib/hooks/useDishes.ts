'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/Lib/supabaseClient';

export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'entradas' | 'principales' | 'antojitos' | 'bebidas';
  image_url: string | null;
  tags: string[];
  is_available: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

interface UseDishesResult {
  dishes: Dish[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useDishes(category?: string): UseDishesResult {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDishes = async () => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from('dishes')
        .select('*')
        .eq('is_available', true)
        .order('display_order', { ascending: true });

      if (category) {
        query = query.eq('category', category);
      }

      const { data, error: supabaseError } = await query;

      if (supabaseError) {
        throw new Error(supabaseError.message);
      }

      setDishes(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching dishes');
      console.error('Error fetching dishes:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDishes();

    // Suscribirse a cambios en tiempo real
    const subscription = supabase
      .channel('dishes-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'dishes',
        },
        () => {
          fetchDishes();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [category]);

  return {
    dishes,
    loading,
    error,
    refetch: fetchDishes,
  };
}