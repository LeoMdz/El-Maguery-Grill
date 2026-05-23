import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import MenuSection from '@/components/MenuSection';
import AboutSection from '@/components/AboutSection';
import BookingForm from '@/components/BookingForm';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="bg-stone-950">
      <Navbar />
      <Hero />
      <MenuSection />
      <AboutSection />
      <BookingForm />
      <Footer />
    </main>
  );
}