'use client';

import { Star, MapPin, Clock, Award } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-stone-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left: Text Content */}
          <div className="animate-fade-in-up">
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-stone-50 mb-6">
              Sobre El Maguey - Grill
            </h2>

            <p className="text-stone-300 text-lg mb-6 leading-relaxed">
              En El Maguey - Grill combinamos la tradición culinaria de Guerrero con el arte de la parrilla. 
              Con una calificación de <span className="text-amber-400 font-semibold">4.3 estrellas</span>, 
              nuestro compromiso es ofrecerte ingredientes de la más alta calidad, un servicio excepcional y 
              un espacio donde cada comida se convierte en una celebración.
            </p>

            <p className="text-stone-300 text-lg mb-8 leading-relaxed">
              Ya sea una reunión familiar, una comida de negocios o una noche con amigos, aquí siempre 
              encontrarás una mesa lista para ti. Nuestro equipo de chefs expertos prepara cada platillo 
              con pasión y dedicación, asegurando que cada visita sea memorable.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 mt-10">
              <div className="bg-stone-900 border border-stone-800 rounded-lg p-4 hover:border-amber-500/50 transition-all">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-5 h-5 text-amber-500" />
                  <span className="text-2xl font-bold text-amber-400">4.3</span>
                </div>
                <p className="text-stone-400 text-sm">Calificación en Google</p>
              </div>
              <div className="bg-stone-900 border border-stone-800 rounded-lg p-4 hover:border-amber-500/50 transition-all">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-5 h-5 text-amber-500" />
                  <span className="text-2xl font-bold text-amber-400">+10</span>
                </div>
                <p className="text-stone-400 text-sm">Años sirviendo</p>
              </div>
            </div>
          </div>

          {/* Right: Image */}
          <div className="relative h-96 rounded-xl overflow-hidden animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <img
              src="https://emxcdsdltozacduiqhui.supabase.co/storage/v1/object/public/MagueyGrill/image.webp"
              alt="El Maguey Grill - Interior"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/40 to-transparent"></div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Location */}
          <div className="bg-gradient-to-br from-stone-900 to-stone-800 border border-stone-700 rounded-xl p-8 hover:border-amber-500/50 transition-all duration-300 group animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-amber-500/20 rounded-lg flex items-center justify-center group-hover:bg-amber-500/30 transition-all">
                <MapPin className="w-6 h-6 text-amber-500" />
              </div>
              <h3 className="text-xl font-semibold text-stone-50">Ubicación</h3>
            </div>
            <p className="text-stone-300 text-sm leading-relaxed">
              Periférico Oriente, Col. Periodista, C.P. 40050, Iguala de la Independencia, Guerrero, México.
            </p>
            <a
              href="https://maps.google.com/?q=Periférico+Oriente+Iguala+Guerrero"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 text-amber-400 hover:text-amber-500 transition-colors text-sm font-semibold"
            >
              Ver en Google Maps →
            </a>
          </div>

          {/* Hours */}
          <div className="bg-gradient-to-br from-stone-900 to-stone-800 border border-stone-700 rounded-xl p-8 hover:border-amber-500/50 transition-all duration-300 group animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-amber-500/20 rounded-lg flex items-center justify-center group-hover:bg-amber-500/30 transition-all">
                <Clock className="w-6 h-6 text-amber-500" />
              </div>
              <h3 className="text-xl font-semibold text-stone-50">Horarios</h3>
            </div>
            <div className="space-y-2 text-stone-300 text-sm">
              <p><span className="text-amber-400 font-semibold">Lunes a Viernes:</span> 9:00 AM – 3:00 PM y 5:00 PM – 12:00 AM</p>
              <p><span className="text-amber-400 font-semibold">Sábado:</span> 9:00 AM – 12:00 AM (Horario corrido)</p>
              <p><span className="text-amber-400 font-semibold">Domingo:</span> 9:00 AM – 3:00 PM y 5:00 PM – 12:00 AM</p>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-gradient-to-br from-stone-900 to-stone-800 border border-stone-700 rounded-xl p-8 hover:border-amber-500/50 transition-all duration-300 group animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-amber-500/20 rounded-lg flex items-center justify-center group-hover:bg-amber-500/30 transition-all">
                <span className="text-amber-500 font-bold">📞</span>
              </div>
              <h3 className="text-xl font-semibold text-stone-50">Contacto</h3>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-stone-400 text-sm mb-1">Reservaciones / Delivery</p>
                <a
                  href="tel:+527331317075"
                  className="text-amber-400 hover:text-amber-500 transition-colors text-lg font-semibold"
                >
                  +52 733 131 7075
                </a>
              </div>
              <div className="pt-4 border-t border-stone-700">
                <p className="text-stone-400 text-sm mb-3">Síguenos en:</p>
                <a
                  href="https://www.facebook.com/Elmagueygrillgro/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-amber-400 hover:text-amber-500 transition-colors font-semibold"
                >
                  Facebook →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}