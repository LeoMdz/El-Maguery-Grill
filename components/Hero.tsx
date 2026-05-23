'use client';

import { useState } from 'react';
import { Leaf, Flame, Star } from 'lucide-react';
import Image from 'next/image';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  tags: Array<'especialidad' | 'popular' | 'vegano'>;
}

const MENU_DATA: Record<string, MenuItem[]> = {
  entradas: [
    {
      id: 'e1',
      name: 'Chicharrón de Arrachera',
      description: 'Crujientes trozos de arrachera servidos con guacamole fresco y tortillas hechas a mano',
      price: 85,
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=400&fit=crop',
      tags: ['especialidad'],
    },
    {
      id: 'e2',
      name: 'Queso Fundido Maguey',
      description: 'Delicioso queso derretido con una mezcla de chorizo o champiñones al gusto',
      price: 95,
      image: 'https://images.unsplash.com/photo-1618069a63900-949f0ee66f9b?w=500&h=400&fit=crop',
      tags: ['popular'],
    },
    {
      id: 'e3',
      name: 'Guacamole Especial',
      description: 'Preparado al momento con un toque de pico de gallo y totopos crujientes',
      price: 75,
      image: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd41985?w=500&h=400&fit=crop',
      tags: ['vegano'],
    },
    {
      id: 'e4',
      name: 'Cebollitas y Nopales Asados',
      description: 'El acompañamiento perfecto para abrir el apetito, asados al carbón',
      price: 65,
      image: 'https://images.unsplash.com/photo-1585238341710-4913dfdfaec3?w=500&h=400&fit=crop',
      tags: ['vegano'],
    },
  ],
  principales: [
    {
      id: 'p1',
      name: 'Arrachera Marinada',
      description: 'Suave y jugosa arrachera asada al carbón, servida con guarnición de la casa',
      price: 280,
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ae1?w=500&h=400&fit=crop',
      tags: ['especialidad', 'popular'],
    },
    {
      id: 'p2',
      name: 'Corte Rib Eye',
      description: 'Corte de calidad premium cocinado a tu término ideal, jugoso y tierno',
      price: 320,
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=400&fit=crop',
      tags: ['especialidad'],
    },
    {
      id: 'p3',
      name: 'New York',
      description: 'Corte de lujo, sabroso y con el punto perfecto, acompañado de papas al horno',
      price: 310,
      image: 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=500&h=400&fit=crop',
      tags: ['especialidad'],
    },
    {
      id: 'p4',
      name: 'Costillas al Grill',
      description: 'Bañadas en salsa artesanal, tiernas y llenas de sabor, cocinadas lentamente',
      price: 240,
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ae1?w=500&h=400&fit=crop',
      tags: ['popular'],
    },
    {
      id: 'p5',
      name: 'Parrillada "El Maguey"',
      description: 'La combinación perfecta de carnes, ideal para compartir en el centro de la mesa',
      price: 550,
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=400&fit=crop',
      tags: ['especialidad'],
    },
  ],
  antojitos: [
    {
      id: 'a1',
      name: 'Tacos al Carbón',
      description: 'Variedad de carnes servidas en tortilla caliente con sus respectivas salsas caseras (3 tacos)',
      price: 120,
      image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500&h=400&fit=crop',
      tags: ['popular'],
    },
    {
      id: 'a2',
      name: 'Hamburguesa de la Casa',
      description: 'Carne selecta al grill, queso derretido, tocino y vegetales frescos en pan tostado',
      price: 150,
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=400&fit=crop',
      tags: [],
    },
  ],
  bebidas: [
    {
      id: 'b1',
      name: 'Aguas Frescas del Día',
      description: 'Horchata, Jamaica o Frutas de temporada, bebidas refrescantes caseras',
      price: 25,
      image: 'https://images.unsplash.com/photo-1590080876-a370317a4aca?w=500&h=400&fit=crop',
      tags: ['vegano'],
    },
    {
      id: 'b2',
      name: 'Cervezas Nacionales e Importadas',
      description: 'Servidas bien frías, ideales en cubetas o para acompañar tu comida',
      price: 50,
      image: 'https://images.unsplash.com/photo-1608270861620-7300c8b0de5e?w=500&h=400&fit=crop',
      tags: [],
    },
    {
      id: 'b3',
      name: 'Micheladas Preparadas',
      description: 'Con el toque especial de la casa, cerveza con salsas caseras y especias',
      price: 60,
      image: 'https://images.unsplash.com/photo-1608270861620-7300c8b0de5e?w=500&h=400&fit=crop',
      tags: ['popular'],
    },
    {
      id: 'b4',
      name: 'Coctelería con Tequila y Mezcal',
      description: 'Haciendo honor a nuestro nombre, cócteles artesanales con destilados premium',
      price: 85,
      image: 'https://images.unsplash.com/photo-1609291203637-5e5d6b0f62f9?w=500&h=400&fit=crop',
      tags: ['especialidad'],
    },
  ],
};

const TAG_CONFIG = {
  especialidad: { icon: Flame, label: 'Especialidad', color: 'bg-red-500/20 text-red-300 border-red-500/40' },
  popular: { icon: Star, label: 'Popular', color: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40' },
  vegano: { icon: Leaf, label: 'Vegetariano', color: 'bg-green-500/20 text-green-300 border-green-500/40' },
};

export default function MenuSection() {
  const [activeTab, setActiveTab] = useState<'entradas' | 'principales' | 'antojitos' | 'bebidas'>('principales');

  const items = MENU_DATA[activeTab];

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
          {[
            { key: 'entradas', label: 'Entradas' },
            { key: 'principales', label: 'Al Grill' },
            { key: 'antojitos', label: 'Antojitos' },
            { key: 'bebidas', label: 'Bebidas' },
          ].map((tab) => (
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

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {items.map((item, index) => (
            <div
              key={item.id}
              className="group bg-stone-800/50 backdrop-blur-sm border border-stone-700 rounded-xl overflow-hidden hover:border-amber-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden bg-stone-700">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Top Section: Name and Price */}
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-serif text-xl font-bold text-stone-50 flex-1 group-hover:text-amber-400 transition-colors">
                    {item.name}
                  </h3>
                  <span className="ml-4 font-serif text-2xl font-bold text-amber-500 whitespace-nowrap">
                    ${item.price}
                  </span>
                </div>

                {/* Description */}
                <p className="text-stone-400 text-sm mb-4 line-clamp-2">
                  {item.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => {
                    const config = TAG_CONFIG[tag];
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
          ))}
        </div>
      </div>
    </section>
  );
}