'use client';

import { useState } from 'react';
import { Leaf, Wheat } from 'lucide-react';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  tags: Array<'vegan' | 'gluten-free' | 'spicy'>;
}

const MENU_DATA: Record<string, MenuItem[]> = {
  entradas: [
    {
      id: 'e1',
      name: 'Tabla de Quesos Artesanales',
      description: 'Selección de quesos premium de la región con mermelada de higos casera',
      price: 18.5,
      tags: ['vegan'],
    },
    {
      id: 'e2',
      name: 'Tarta de Camarones',
      description: 'Camarones frescos con mayonesa casera, puerro y decoración de caviar',
      price: 24.0,
      tags: [],
    },
    {
      id: 'e3',
      name: 'Crema de Champiñones Silvestres',
      description: 'Sopa cremosa con champiñones del bosque, trufa negra y croûtons',
      price: 16.0,
      tags: ['gluten-free'],
    },
    {
      id: 'e4',
      name: 'Remolacha Confitada',
      description: 'Remolacha caramelizada, queso de cabra y vinagreta balsámica',
      price: 14.5,
      tags: ['vegan', 'gluten-free'],
    },
  ],
  fuertes: [
    {
      id: 'f1',
      name: 'Filete de Res Marmóreado',
      description: 'Corte Premium de 250g, acompañado de puré de papas trufado y espárragos',
      price: 52.0,
      tags: ['gluten-free'],
    },
    {
      id: 'f2',
      name: 'Lubina a la Sal',
      description: 'Lubina fresca cocida en corteza de sal marina, limón y hierbas aromáticas',
      price: 48.0,
      tags: ['gluten-free'],
    },
    {
      id: 'f3',
      name: 'Risotto de Hongos y Azafrán',
      description: 'Arroz Carnaroli cremoso con hongos porcini, queso Parmesano y azafrán',
      price: 34.0,
      tags: ['vegan', 'gluten-free'],
    },
    {
      id: 'f4',
      name: 'Pato Confitado',
      description: 'Pato de corral cocido lentamente, acompañado de naranja agria y papas fondant',
      price: 46.0,
      tags: ['gluten-free'],
    },
  ],
  bebidas: [
    {
      id: 'b1',
      name: 'Vino Tinto Reserva',
      description: 'Tempranillo 2018 de La Rioja, con notas de cerezas y especias',
      price: 45.0,
      tags: ['vegan', 'gluten-free'],
    },
    {
      id: 'b2',
      name: 'Champagne Brut',
      description: 'Champagne francés con burbuja fina y notas de manzana verde',
      price: 65.0,
      tags: ['vegan', 'gluten-free'],
    },
    {
      id: 'b3',
      name: 'Agua Mineral Premium',
      description: 'Agua cristalina de manantial, servida con hielo y limón fresco',
      price: 8.0,
      tags: ['vegan', 'gluten-free'],
    },
    {
      id: 'b4',
      name: 'Cóctel de la Casa',
      description: 'Mezcla especial con vodka premium, licor de café y espuma de vainilla',
      price: 16.0,
      tags: ['vegan', 'gluten-free'],
    },
  ],
};

const TAG_CONFIG = {
  vegan: { icon: Leaf, label: 'Vegano', color: 'bg-green-500/20 text-green-300 border-green-500/40' },
  'gluten-free': {
    icon: Wheat,
    label: 'Sin Gluten',
    color: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
  },
  spicy: { icon: null, label: 'Picante', color: 'bg-red-500/20 text-red-300 border-red-500/40' },
};

export default function MenuSection() {
  const [activeTab, setActiveTab] = useState<'entradas' | 'fuertes' | 'bebidas'>('entradas');

  const items = MENU_DATA[activeTab];

  return (
    <section id="menu" className="py-24 bg-gradient-to-b from-stone-950 to-stone-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-stone-50 mb-4">
            Nuestro Menú
          </h2>
          <p className="text-stone-400 text-lg max-w-2xl mx-auto">
            Descubre nuestra selección curada de platos, preparados con ingredientes frescos y de la más alta calidad.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {['entradas', 'fuertes', 'bebidas'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as typeof activeTab)}
              className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 capitalize ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 shadow-lg shadow-amber-500/50'
                  : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
              }`}
            >
              {tab === 'entradas' && 'Entradas'}
              {tab === 'fuertes' && 'Platos Fuertes'}
              {tab === 'bebidas' && 'Bebidas'}
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {items.map((item) => (
            <div
              key={item.id}
              className="group bg-stone-800/50 backdrop-blur-sm border border-stone-700 rounded-xl p-6 hover:border-amber-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10"
            >
              {/* Top Section: Name and Price */}
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-serif text-xl font-bold text-stone-50 flex-1 group-hover:text-amber-400 transition-colors">
                  {item.name}
                </h3>
                <span className="ml-4 font-serif text-2xl font-bold text-amber-500">
                  ${item.price.toFixed(2)}
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
                      {Icon && <Icon className="w-3 h-3" />}
                      <span>{config.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}