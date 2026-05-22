'use client';

import { useState, FormEvent } from 'react';
import { Clock, Users, Mail, Phone } from 'lucide-react';

interface FormState {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  message: string;
}

export default function BookingForm() {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Error al procesar la reserva');
      }

      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        guests: '2',
        message: '',
      });

      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  // Get today's date in YYYY-MM-DD format to set min attribute
  const today = new Date().toISOString().split('T')[0];

  return (
    <section id="booking-form" className="py-24 bg-stone-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-stone-50 mb-4">
            Reserva Tu Mesa
          </h2>
          <p className="text-stone-400 text-lg">
            Asegura tu lugar en nuestro restaurante premium. Solo tienes que llenar el formulario.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-gradient-to-br from-stone-900 to-stone-950 border border-stone-800 rounded-2xl p-8 sm:p-12 shadow-2xl">
          {submitted && (
            <div className="mb-8 p-4 bg-green-500/20 border border-green-500/50 rounded-lg flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-stone-950 font-bold">✓</span>
              </div>
              <div>
                <p className="font-semibold text-green-300">¡Reserva enviada exitosamente!</p>
                <p className="text-green-200 text-sm mt-1">
                  Recibirás una confirmación en tu email en breve. Gracias por elegirnos.
                </p>
              </div>
            </div>
          )}

          {error && (
            <div className="mb-8 p-4 bg-red-500/20 border border-red-500/50 rounded-lg flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-stone-950 font-bold">!</span>
              </div>
              <div>
                <p className="font-semibold text-red-300">Error</p>
                <p className="text-red-200 text-sm mt-1">{error}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Row 1: Name & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-stone-300 font-medium mb-2">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Juan Pérez"
                  className="w-full px-4 py-3 bg-stone-800 border border-stone-700 rounded-lg text-stone-50 placeholder-stone-600 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-stone-300 font-medium mb-2">
                  Correo Electrónico *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="juan@ejemplo.com"
                  className="w-full px-4 py-3 bg-stone-800 border border-stone-700 rounded-lg text-stone-50 placeholder-stone-600 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
                />
              </div>
            </div>

            {/* Row 2: Phone */}
            <div>
              <label htmlFor="phone" className="block text-stone-300 font-medium mb-2">
                Teléfono de Contacto
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+34 600 123 456"
                className="w-full px-4 py-3 bg-stone-800 border border-stone-700 rounded-lg text-stone-50 placeholder-stone-600 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
              />
            </div>

            {/* Row 3: Date & Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="date" className="block text-stone-300 font-medium mb-2">
                  Fecha *
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  min={today}
                  className="w-full px-4 py-3 bg-stone-800 border border-stone-700 rounded-lg text-stone-50 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all cursor-pointer"
                />
              </div>
              <div>
                <label htmlFor="time" className="block text-stone-300 font-medium mb-2 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Hora *
                </label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-stone-800 border border-stone-700 rounded-lg text-stone-50 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all cursor-pointer"
                />
              </div>
            </div>

            {/* Row 4: Guests */}
            <div>
              <label htmlFor="guests" className="block text-stone-300 font-medium mb-2 flex items-center gap-2">
                <Users className="w-4 h-4" />
                Número de Personas *
              </label>
              <select
                id="guests"
                name="guests"
                value={formData.guests}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-stone-800 border border-stone-700 rounded-lg text-stone-50 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all cursor-pointer"
              >
                {[...Array(12)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1} {i === 0 ? 'Persona' : 'Personas'}
                  </option>
                ))}
              </select>
            </div>

            {/* Row 5: Message */}
            <div>
              <label htmlFor="message" className="block text-stone-300 font-medium mb-2">
                Mensaje Especial (Opcional)
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Cuéntanos si tienes alguna solicitud especial..."
                rows={4}
                className="w-full px-4 py-3 bg-stone-800 border border-stone-700 rounded-lg text-stone-50 placeholder-stone-600 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-semibold rounded-lg hover:shadow-xl hover:shadow-amber-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none text-base font-serif"
            >
              {loading ? 'Procesando...' : 'Confirmar Reserva'}
            </button>

            <p className="text-center text-stone-500 text-sm">
              Tus datos serán tratados de forma confidencial. * Campos requeridos.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}