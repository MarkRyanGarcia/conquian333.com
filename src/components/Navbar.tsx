import { useEffect, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { SmootherContext } from "../context/SmootherContext";

export default function Navbar() {
    const { t, i18n } = useTranslation();
    const { scrollTo } = useContext(SmootherContext);
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const handleNav = (id: string) => {
        scrollTo(id);
        setMenuOpen(false);
    };

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
            scrolled ? "bg-black/70 backdrop-blur-md shadow-lg py-3" : "bg-transparent py-5"
        }`}>
            <div className="max-w-5xl mx-auto px-4 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <img src="./coin256.png" className="h-8" alt="logo" />
                    <span className="text-white font-bold text-lg">Conquian 333</span>
                </div>

                {/* Desktop nav */}
                <div className="hidden sm:flex items-center gap-4 sm:gap-6">
                    <button className="text-white/70 hover:text-white text-sm transition-colors cursor-pointer" onClick={() => handleNav('#tutorial')}>
                        {t('tutorial')}
                    </button>
                    <button className="text-white/70 hover:text-white text-sm transition-colors cursor-pointer" onClick={() => handleNav('#reviews')}>
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
                </div>

                {/* Mobile: lang selector + hamburger */}
                <div className="flex sm:hidden items-center gap-3">
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

                    <button
                        onClick={() => setMenuOpen((o) => !o)}
                        className="text-white p-1 cursor-pointer"
                        aria-label="Toggle menu"
                    >
                        {menuOpen ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile dropdown menu */}
            {menuOpen && (
                <div className="sm:hidden bg-black/80 backdrop-blur-md border-t border-white/10 px-4 py-4 flex flex-col gap-4">
                    <button className="text-white/70 hover:text-white text-sm transition-colors cursor-pointer text-left" onClick={() => handleNav('#tutorial')}>
                        {t('tutorial')}
                    </button>
                    <button className="text-white/70 hover:text-white text-sm transition-colors cursor-pointer text-left" onClick={() => handleNav('#reviews')}>
                        {t('reviews')}
                    </button>
                </div>
            )}
        </nav>
    );
}
