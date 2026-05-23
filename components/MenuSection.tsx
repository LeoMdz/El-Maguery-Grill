'use client';

import { useState } from 'react';
import { Leaf, Flame, Star } from 'lucide-react';
import { useDishes } from '@/Lib/hooks/useDishes';

const TAG_CONFIG = {
  especialidad: { icon: Flame, label: 'Especialidad', color: 'bg-red-500/20 text-red-300 border-red-500/40' },
  popular: { icon: Star, label: 'Popular', color: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40' },
  vegano: { icon: Leaf, label: 'Vegetariano', color: 'bg-green-500/20 text-green-300 border-green-500/40' },
};

const CATEGORIES = [
  { key: 'entradas', label: 'Entradas' },
  { key: 'principales', label: 'Al Grill' },
  { key: 'antojitos', label: 'Antojitos' },
  { key: 'bebidas', label: 'Bebidas' },
];

export default function MenuSection() {
  const [activeTab, setActiveTab] = useState<'entradas' | 'principales' | 'antojitos' | 'bebidas'>('principales');
  const { dishes, loading, error } = useDishes(activeTab);

  return (
    <section id="menu" className="py-24 bg-gradient-to-b from-stone-950 to-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-stone-50 mb-4">
            Nuestro Menú
          </h2>
          <p className="text-stone-400 text-lg max-w-2xl mx-auto">
            Descubre nuestra selección curada de platillos, todos preparados con ingredientes frescos y cocinados al carbón con maestría.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-3 mb-12 flex-wrap">
          {CATEGORIES.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as typeof activeTab)}
              className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === tab.key
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 shadow-lg shadow-amber-500/50 scale-105'
                  : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-6 text-center">
            <p className="text-red-300 font-semibold">Error al cargar el menú</p>
            <p className="text-red-200 text-sm mt-2">{error}</p>
          </div>
        )}

        {/* Menu Items Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {dishes.length > 0 ? (
              dishes.map((item, index) => (
                <div
                  key={item.id}
                  className="group bg-stone-800/50 backdrop-blur-sm border border-stone-700 rounded-xl overflow-hidden hover:border-amber-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Image Container */}
                  <div className="relative h-48 overflow-hidden bg-stone-700">
                    {item.image_url && item.image_url.length > 0 ? (
                      <>
                        <img
                          src={item.image_url}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-stone-700 to-stone-800">
                        <span className="text-stone-500 text-sm">Sin imagen</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Top Section: Name and Price */}
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-serif text-xl font-bold text-stone-50 flex-1 group-hover:text-amber-400 transition-colors">
                        {item.name}
                      </h3>
                      <span className="ml-4 font-serif text-2xl font-bold text-amber-500 whitespace-nowrap">
                        ${item.price.toFixed(0)}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-stone-400 text-sm mb-4 line-clamp-2">
                      {item.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {item.tags && item.tags.length > 0 && item.tags.map((tag) => {
                        const config = TAG_CONFIG[tag as keyof typeof TAG_CONFIG];
                        if (!config) return null;
                        const Icon = config.icon;
                        return (
                          <div
                            key={tag}
                            className={`flex items-center gap-1 px-3 py-1 rounded-full border text-xs font-medium ${config.color}`}
                          >
                            <Icon className="w-3 h-3" />
                            <span>{config.label}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-stone-400 text-lg">No hay platillos disponibles en esta categoría</p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}