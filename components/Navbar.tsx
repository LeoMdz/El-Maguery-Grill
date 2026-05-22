'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const scrollToSection = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-stone-950/80 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
              <span className="text-stone-950 font-serif font-bold text-lg">R</span>
            </div>
            <span className="hidden sm:block text-xl font-serif font-bold text-stone-50">
              Restaurant Premium
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('menu')}
              className="text-stone-300 hover:text-amber-500 transition-colors text-sm font-medium"
            >
              Menú
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-stone-300 hover:text-amber-500 transition-colors text-sm font-medium"
            >
              Nosotros
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-stone-300 hover:text-amber-500 transition-colors text-sm font-medium"
            >
              Contacto
            </button>
          </div>

          {/* CTA Button Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="tel:+34123456789"
              className="flex items-center space-x-2 text-stone-300 hover:text-amber-500 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="text-sm">+34 123 456 789</span>
            </a>
            <button
              onClick={() => scrollToSection('booking-form')}
              className="px-6 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-semibold rounded-lg hover:shadow-lg hover:shadow-amber-500/50 transition-all duration-300 text-sm"
            >
              Reservar Ahora
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-stone-50 hover:text-amber-500 transition-colors"
            onClick={toggleMenu}
          >
            {isOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-stone-900/95 backdrop-blur-md border-t border-stone-800">
            <div className="px-4 py-4 space-y-4">
              <button
                onClick={() => scrollToSection('menu')}
                className="block w-full text-left text-stone-300 hover:text-amber-500 transition-colors font-medium"
              >
                Menú
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="block w-full text-left text-stone-300 hover:text-amber-500 transition-colors font-medium"
              >
                Nosotros
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="block w-full text-left text-stone-300 hover:text-amber-500 transition-colors font-medium"
              >
                Contacto
              </button>
              <button
                onClick={() => scrollToSection('booking-form')}
                className="w-full px-6 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-semibold rounded-lg hover:shadow-lg transition-all duration-300 mt-4"
              >
                Reservar Ahora
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}