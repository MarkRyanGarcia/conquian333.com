import { SmootherContext } from "./context/SmootherContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import StatsStrip from "./components/StatsStrip";
import Different from "./components/Different";
import Features from "./components/Features";
import Tutorial from "./components/Tutorial";
import Reviews from "./components/Reviews";
import Footer from "./components/Footer";

function scrollTo(id: string) {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function App() {
    return (
        <SmootherContext.Provider value={{ scrollTo }}>
            <Navbar />
            <Hero />
            <StatsStrip />
            <Different />
            <Features />
            <Tutorial />
            <Reviews />
            <Footer />
        </SmootherContext.Provider>
    );
}
