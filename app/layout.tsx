import type { Metadata } from 'next';
import { Playfair_Display, Lato } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['400', '700', '900'],
});

const lato = Lato({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: 'Restaurant Premium | Experiencia Gastronómica de Lujo',
  description:
    'Descubre un mundo de sabores exquisitos en nuestro restaurante de gama media-alta. Menú Premium, Chef experto y servicio impecable.',
  keywords: 'restaurante, premium, gastronómico, Madrid, reservas',
  openGraph: {
    title: 'Restaurant Premium',
    description: 'Experiencia Gastronómica de Lujo',
    images: [
      {
        url: '/hero-bg.jpg',
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${playfair.variable} ${lato.variable} scroll-smooth`}>
      <body className="bg-stone-950 text-stone-50 antialiased">
        {children}
      </body>
    </html>
  );
}