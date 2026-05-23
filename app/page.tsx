import Navbar from '@/components/Navbar';
import MenuSection from '@/components/MenuSection';
import AboutSection from '@/components/AboutSection';
import BookingForm from '@/components/BookingForm';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="bg-stone-950">
      <Navbar />
      <MenuSection />
      <AboutSection />
      <BookingForm />
      <Footer />
    </main>
  );
}