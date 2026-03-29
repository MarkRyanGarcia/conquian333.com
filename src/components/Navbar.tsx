import { useEffect, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import DownloadButton from "./DownloadButton";
import { SmootherContext } from "../context/SmootherContext";

export default function Navbar() {
    const { t, i18n } = useTranslation();
    const { scrollTo } = useContext(SmootherContext);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
            scrolled ? "bg-black/70 backdrop-blur-md shadow-lg py-3" : "bg-transparent py-5"
        }`}>
            <div className="max-w-5xl mx-auto px-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <img src="./coin256.png" className="h-8" alt="logo" />
                    <span className="text-white font-bold text-lg">Conquian 333</span>
                </div>

                <div className="flex items-center gap-4 sm:gap-6">
                    <button className="text-white/70 hover:text-white text-sm transition-colors cursor-pointer" onClick={() => scrollTo('#tutorial')}>
                        {t('tutorial')}
                    </button>
                    <button className="text-white/70 hover:text-white text-sm transition-colors cursor-pointer" onClick={() => scrollTo('#reviews')}>
                        {t('reviews')}
                    </button>

                    <div className="flex items-center bg-white/10 rounded-lg px-2 py-1 border border-white/20">
                        <select
                            onChange={(e) => i18n.changeLanguage(e.target.value)}
                            value={i18n.language}
                            className="bg-transparent text-white text-sm outline-none cursor-pointer appearance-none px-1"
                        >
                            <option value="en" className="text-black">EN</option>
                            <option value="es" className="text-black">ES</option>
                        </select>
                        <span className="text-white/40 text-xs pointer-events-none">▼</span>
                    </div>

                    <DownloadButton onClick={() => scrollTo('#download')}>{t('download')}</DownloadButton>
                </div>
            </div>
        </nav>
    );
}
