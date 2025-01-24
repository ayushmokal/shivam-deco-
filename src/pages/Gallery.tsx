import { Gallery } from "@/components/Gallery";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const GalleryPage = () => {
  return (
    <div className="min-h-screen bg-accent">
      <Header />
      <Gallery />
      <Footer />
    </div>
  );
};

export default GalleryPage;