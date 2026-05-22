'use client';

import { ArrowDown } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/hero-bg.jpg')`,
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/70 via-stone-950/50 to-stone-950/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
        <div className="mb-6 inline-block">
          <span className="inline-block px-4 py-2 bg-amber-500/20 border border-amber-500/40 rounded-full text-amber-300 text-sm font-medium backdrop-blur-sm">
            Bienvenido a la Excelencia Culinaria
          </span>
        </div>

        <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-stone-50 mb-6 leading-tight">
          Experiencia Gastronómica <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
            de Lujo
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-stone-300 mb-10 font-light">
          Disfruta de una experiencia culinaria única, donde la tradición se encuentra con la innovación.
          Cada plato cuenta una historia de sabor y dedicación.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-semibold rounded-lg hover:shadow-xl hover:shadow-amber-500/50 transition-all duration-300 text-base font-serif"
          >
            Haz tu Reserva
          </button>
          <button
            onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3 border-2 border-amber-500 text-amber-400 font-semibold rounded-lg hover:bg-amber-500/10 transition-all duration-300 text-base font-serif"
          >
            Ver Menú
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <ArrowDown className="w-6 h-6 text-amber-500" />
      </div>
    </section>
  );
}