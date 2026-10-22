import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import AboutSection from "./components/AboutSection";
import NewsSection from "./components/NewsSection";
import EmailSection from "./components/EmailSection";
import Footer from "./components/Footer";
import AchievementsSection from "./components/AchievementsSection";
import AlternanceSection from "./components/AlternanceSection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[#121212]">
      <Navbar />
      <div className="container mt-24 mx-auto px-4 sm:px-8 lg:px-12 py-4">
        <HeroSection />
        <AchievementsSection />
        <AboutSection />
        <AlternanceSection />
        <NewsSection />
        <EmailSection />
      </div>
      <Footer />
    </main>
  );
}
