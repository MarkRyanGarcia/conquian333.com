import { useRef, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import DownloadButton from "./DownloadButton";
import { gsap } from 'gsap';
import { SmootherContext } from "../context/SmootherContext";
import { getPlatformStoreUrl } from "../utils/platform";

export default function NavHero() {
    const { t, i18n } = useTranslation();
    const { smoother } = useContext(SmootherContext);
    const heroRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);
    const buttonsRef = useRef<HTMLDivElement>(null);

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    useEffect(() => {
        const mm = gsap.matchMedia();

        mm.add("(min-width: 768px)", () => {
            const ctx = gsap.context(() => {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: heroRef.current,
                        start: "top top",
                        end: "bottom top",
                        scrub: true,
                    }
                });

                tl.to(heroRef.current, { height: 110, ease: "none" }, 0);

                tl.to(logoRef.current, {
                    x: () => -window.innerWidth / 4,
                    y: 20,
                    scale: 0.7,
                    ease: "none"
                }, 0);

                tl.to(buttonsRef.current, {
                    x: () => window.innerWidth / 4,
                    y: -60,
                    scale: 0.8,
                    ease: "none"
                }, 0);
            });
            return () => ctx.revert();
        });

        mm.add("(max-width: 767px)", () => {
            const ctx = gsap.context(() => {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: heroRef.current,
                        start: "top top",
                        end: "bottom top",
                        scrub: true,
                    }
                });

                tl.to(heroRef.current, { height: 100, ease: "none" }, 0);

                tl.to(logoRef.current, {
                    y: 0,
                    scale: 0.7,
                    ease: "none"
                }, 0);

                tl.to(buttonsRef.current, {
                    y: -30,
                    scale: 0.75,
                    ease: "none"
                }, 0);
            });
            return () => ctx.revert();
        });

        return () => mm.revert();
    }, []);

    return (
        <nav className="fixed top-0 left-0 w-full z-50">
            <div
                ref={heroRef}
                className="w-full h-[45vh] md:h-[60vh] relative overflow-hidden flex flex-col items-center justify-center px-4"
            >
                <div ref={logoRef} className="flex items-center gap-3 md:gap-4 justify-center w-full">
                    <img src="./coin256.png" className="h-10 md:h-20" alt="logo" />
                    <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold text-white">
                        Conquian 333
                    </h1>
                </div>

                <div
                    ref={buttonsRef}
                    className="mt-6 flex flex-nowrap gap-3 sm:gap-6 font-bold items-center justify-center w-full"
                >
                    <button
                        className="text-white/80 hover:text-white text-xs sm:text-base cursor-pointer"
                        onClick={() => smoother?.scrollTo('#tutorial', true)}
                    >
                        {t('tutorial')}
                    </button>

                    <button
                        className="text-white/80 hover:text-white text-xs sm:text-base cursor-pointer"
                        onClick={() => smoother?.scrollTo('#reviews', true)}
                    >
                        {t('reviews')}
                    </button>


                    <div className="flex items-center bg-white/10 rounded-lg px-2 py-1 border border-white/20">
                        <select
                            onChange={(e) => changeLanguage(e.target.value)}
                            value={i18n.language}
                            className="bg-transparent text-white text-sm outline-none cursor-pointer appearance-none px-2"
                        >
                            <option value="en" className="text-black">EN</option>
                            <option value="es" className="text-black">ES</option>
                        </select>
                        <span className="text-white/40 text-xs pointer-events-none">▼</span>
                    </div>

                    <DownloadButton onClick={() => smoother?.scrollTo('#download', true)}>{t('download')}</DownloadButton>
                </div>
            </div>
        </nav>
    );
}
