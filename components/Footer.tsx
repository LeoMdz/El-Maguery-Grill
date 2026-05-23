import { Share2, Phone, MapPin, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="bg-stone-950 border-t border-stone-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Column 1: About */}
          <div className="animate-fade-in-up">
            <h3 className="font-serif text-2xl font-bold text-amber-400 mb-4">El Maguey - Grill</h3>
            <p className="text-stone-400 text-sm leading-relaxed">
              El auténtico sabor de la parrilla en Iguala. Combinamos la tradición culinaria de Guerrero 
              con el arte de cocinar al carbón. Desde 2015, sirviendo con pasión a nuestra comunidad.
            </p>
            <div className="mt-6 flex gap-4">
              <a
                href="https://www.facebook.com/Elmagueygrillgro/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center text-amber-500 hover:bg-amber-500/40 transition-all"
                title="Facebook"
              >
                <Share2 className="w-5 h-5" />
              </a>
              <a
                href="tel:+527331317075"
                className="w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center text-amber-500 hover:bg-amber-500/40 transition-all"
                title="Teléfono"
              >
                <Phone className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Hours */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <h4 className="font-semibold text-stone-50 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-500" />
              Horario de Atención
            </h4>
            <div className="space-y-3 text-stone-400 text-sm">
              <div>
                <p className="text-amber-400 font-semibold">Lunes a Viernes</p>
                <p>9:00 AM - 3:00 PM</p>
                <p>5:00 PM - 12:00 AM</p>
              </div>
              <div>
                <p className="text-amber-400 font-semibold">Sábado</p>
                <p>9:00 AM - 12:00 AM (Abierto)</p>
              </div>
              <div>
                <p className="text-amber-400 font-semibold">Domingo</p>
                <p>9:00 AM - 3:00 PM</p>
                <p>5:00 PM - 12:00 AM</p>
              </div>
            </div>
          </div>

          {/* Column 3: Contact */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h4 className="font-semibold text-stone-50 mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-amber-500" />
              Ubicación
            </h4>
            <div className="space-y-4 text-stone-400 text-sm">
              <p>
                Periférico Oriente, Col. Periodista<br />
                C.P. 40050<br />
                Iguala de la Independencia, Guerrero<br />
                México
              </p>
              <div className="pt-4 border-t border-stone-800">
                <p className="text-stone-300 font-semibold mb-2">Reservaciones</p>
                <a
                  href="tel:+527331317075"
                  className="text-amber-400 hover:text-amber-500 transition-colors font-semibold text-base"
                >
                  +52 733 131 7075
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-stone-800 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center md:text-left">
            <p className="text-stone-500 text-sm">
              &copy; 2024 El Maguey - Grill. Todos los derechos reservados.
            </p>
            <p className="text-stone-500 text-sm">
              Diseño y Desarrollo con ❤️ para el sabor de Guerrero
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}