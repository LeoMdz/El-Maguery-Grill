'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/Lib/supabaseClient';
import { Edit2, Trash2, Eye, EyeOff, Search } from 'lucide-react';

interface Dish {
  id: string;
  name: string;
  price: number;
  category: string;
  is_available: boolean;
  image_url?: string;
  display_order: number;
}

interface DishListProps {
  onEdit: (dish: Dish) => void;
}

export default function DishList({ onEdit }: DishListProps) {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetchDishes();

    // Suscribirse a cambios en tiempo real
    const subscription = supabase
      .channel('dishes-list-changes')
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
  }, []);

  const fetchDishes = async () => {
    try {
      const { data, error } = await supabase
        .from('dishes')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setDishes(data || []);
    } catch (err) {
      console.error('Error fetching dishes:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteDish = async (id: string) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este platillo? Esta acción no se puede deshacer.')) {
      return;
    }

    setDeleting(id);
    try {
      const { error } = await supabase
        .from('dishes')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setDishes(dishes.filter(d => d.id !== id));
    } catch (err) {
      console.error('Error deleting dish:', err);
      alert('Error al eliminar el platillo');
    } finally {
      setDeleting(null);
    }
  };

  const handleToggleAvailability = async (id: string, current: boolean) => {
    try {
      const { error } = await supabase
        .from('dishes')
        .update({ is_available: !current })
        .eq('id', id);

      if (error) throw error;
      setDishes(dishes.map(d => d.id === id ? { ...d, is_available: !current } : d));
    } catch (err) {
      console.error('Error updating dish:', err);
      alert('Error al actualizar el platillo');
    }
  };

  const categories = ['all', ...new Set(dishes.map(d => d.category))];

  const filteredDishes = dishes.filter(d => {
    const matchCategory = selectedCategory === 'all' || d.category === selectedCategory;
    const matchSearch = d.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-serif font-bold text-stone-50 mb-6">📋 Gestionar Platillos</h2>

      {/* Filters Section */}
      <div className="bg-stone-900 border border-stone-800 rounded-xl p-6 mb-8">
        {/* Search */}
        <div className="mb-6">
          <label className="block text-stone-300 font-medium mb-2">Buscar Platillo</label>
          <div className="relative">
            <Search className="absolute left-4 top-3 w-5 h-5 text-stone-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Busca por nombre..."
              className="w-full pl-12 pr-4 py-2 bg-stone-800 border border-stone-700 rounded-lg text-stone-50 placeholder-stone-600 focus:outline-none focus:border-amber-500 transition-all"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div>
          <label className="block text-stone-300 font-medium mb-3">Filtrar por Categoría</label>
          <div className="flex gap-2 flex-wrap">
            {categories.map(cat => {
              const categoryLabel = {
                all: 'Todas',
                entradas: 'Entradas',
                principales: 'Al Grill',
                antojitos: 'Antojitos',
                bebidas: 'Bebidas',
              }[cat] || cat;

              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedCategory === cat
                      ? 'bg-amber-500 text-stone-950 shadow-lg shadow-amber-500/50'
                      : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                  }`}
                >
                  {categoryLabel}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Table */}
      {filteredDishes.length > 0 ? (
        <div className="bg-stone-900 border border-stone-800 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-stone-800 border-b border-stone-700">
                <tr>
                  <th className="px-6 py-4 text-stone-300 font-semibold">Nombre</th>
                  <th className="px-6 py-4 text-stone-300 font-semibold">Categoría</th>
                  <th className="px-6 py-4 text-stone-300 font-semibold">Precio</th>
                  <th className="px-6 py-4 text-stone-300 font-semibold">Estado</th>
                  <th className="px-6 py-4 text-stone-300 font-semibold">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-700">
                {filteredDishes.map(dish => (
                  <tr key={dish.id} className="hover:bg-stone-800/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {dish.image_url && (
                          <img
                            src={dish.image_url}
                            alt={dish.name}
                            className="w-10 h-10 rounded object-cover border border-stone-700"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        )}
                        <span className="text-stone-50 font-medium">{dish.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-stone-400">
                      <span className="capitalize px-3 py-1 bg-stone-800 rounded-full text-xs">
                        {dish.category === 'principales' ? 'Al Grill' : dish.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-amber-400 font-semibold text-lg">
                        ${dish.price.toFixed(0)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium inline-block ${
                        dish.is_available
                          ? 'bg-green-500/20 text-green-300'
                          : 'bg-red-500/20 text-red-300'
                      }`}>
                        {dish.is_available ? '✓ Disponible' : '✗ No disponible'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleToggleAvailability(dish.id, dish.is_available)}
                          className="p-2 text-stone-400 hover:text-amber-400 hover:bg-stone-800 rounded transition-all"
                          title={dish.is_available ? 'Marcar como no disponible' : 'Marcar como disponible'}
                        >
                          {dish.is_available ? (
                            <Eye className="w-4 h-4" />
                          ) : (
                            <EyeOff className="w-4 h-4" />
                          )}
                        </button>
                        <button
                          onClick={() => onEdit(dish)}
                          className="p-2 text-amber-500 hover:text-amber-400 hover:bg-stone-800 rounded transition-all"
                          title="Editar"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteDish(dish.id)}
                          disabled={deleting === dish.id}
                          className="p-2 text-red-500 hover:text-red-400 hover:bg-stone-800 rounded transition-all disabled:opacity-50"
                          title="Eliminar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-stone-900 border border-stone-800 rounded-xl">
          <p className="text-stone-400 text-lg">
            {searchTerm ? 'No se encontraron platillos con ese nombre' : 'No hay platillos en esta categoría'}
          </p>
        </div>
      )}

      {/* Summary */}
      <div className="mt-6 flex justify-between items-center text-stone-400 text-sm">
        <div>
          Mostrando <span className="text-amber-400 font-semibold">{filteredDishes.length}</span> de{' '}
          <span className="text-amber-400 font-semibold">{dishes.length}</span> platillos
        </div>
        {filteredDishes.length !== dishes.length && (
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
            }}
            className="text-amber-400 hover:text-amber-500 transition-colors text-sm font-medium"
          >
            Limpiar filtros
          </button>
        )}
      </div>
    </div>
  );
}