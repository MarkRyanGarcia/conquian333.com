import { useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import DownloadButton from "./DownloadButton";
import { gsap } from 'gsap';

export default function NavHero() {
    const { t } = useTranslation();

    const heroRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);
    const buttonsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                }
            });

            // shrink hero
            tl.to(heroRef.current, {
                height: 110,
                // backdropFilter: "blur(10px)",
                ease: "none"
            }, 0);

            // move logo to left-top corner
            tl.to(logoRef.current, {
                x: () => -window.innerWidth / 2.8,
                y: 10,
                scale: 0.7,
                ease: "none"
            }, 0);

            // move buttons to right-top corner
            tl.to(buttonsRef.current, {
                x: () => window.innerWidth / 4,
                y: 0,
                scale: 0.8,
                ease: "none"
            }, 0);
        });

        return () => ctx.revert();
    }, []);

    return (
        <nav className="fixed top-0 left-0 w-full z-50">
            <div
                ref={heroRef}
                className="w-full h-screen relative overflow-hidden px-4"
            >
                {/* LOGO */}
                <div
                    ref={logoRef}
                    className="absolute flex items-center gap-4"
                    style={{ top: "40%", left: "50%", transform: "translate(-50%, -50%)" }}
                >
                    <img src="./coin256.png" className="h-16 md:h-20" alt="logo" />
                    <h1 className="text-3xl md:text-6xl font-bold text-white">Conquian 333</h1>
                </div>

                {/* BUTTONS */}
                <div
                    ref={buttonsRef}
                    className="absolute flex gap-4 sm:gap-6 font-bold items-center"
                    style={{ top: "48%", left: "55%", transform: "translate(-50%, -50%)" }}
                >
                    <button className="text-white/80 hover:text-white">{t('tutorial')}</button>
                    <button className="text-white/80 hover:text-white">{t('reviews')}</button>
                    <DownloadButton>{t('download')}</DownloadButton>
                </div>
            </div>
        </nav>
    );
}
