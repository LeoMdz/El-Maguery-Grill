export default function Footer() {
  return (
    <footer id="contact" className="bg-stone-950 border-t border-stone-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Column 1: About */}
          <div>
            <h3 className="font-serif text-xl font-bold text-stone-50 mb-4">Restaurant Premium</h3>
            <p className="text-stone-400 text-sm leading-relaxed">
              Desde 2015, ofrecemos una experiencia gastronómica única donde la pasión por la cocina se encuentra
              con la excelencia en el servicio.
            </p>
          </div>

          {/* Column 2: Hours */}
          <div>
            <h4 className="font-semibold text-stone-50 mb-4">Horario</h4>
            <div className="space-y-2 text-stone-400 text-sm">
              <p>Martes - Jueves: 18:00 - 23:00</p>
              <p>Viernes - Sábado: 18:00 - 00:00</p>
              <p>Domingo: 12:30 - 23:00</p>
              <p className="text-amber-500 font-semibold mt-2">Cerrado los lunes</p>
            </div>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4 className="font-semibold text-stone-50 mb-4">Contacto</h4>
            <div className="space-y-2 text-stone-400 text-sm">
              <p>📍 Calle Principal 123, Madrid 28001</p>
              <p>📞 +34 123 456 789</p>
              <p>📧 info@restaurantpremium.es</p>
              <div className="flex gap-4 mt-4">
                <a href="#" className="text-amber-500 hover:text-amber-400 transition-colors">
                  Instagram
                </a>
                <a href="#" className="text-amber-500 hover:text-amber-400 transition-colors">
                  Facebook
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-stone-800 pt-8">
          <p className="text-center text-stone-500 text-sm">
            &copy; 2024 Restaurant Premium. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}