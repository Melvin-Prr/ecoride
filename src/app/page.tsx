import Hero from "@/components/Hero";
import SearchBar from "@/components/SearchBar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Hero />
      <SearchBar />
      <Footer />
    </div>
  );
}
