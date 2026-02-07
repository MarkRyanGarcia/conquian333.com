import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DownloadButton from "./DownloadButton";
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);

export default function NavHero() {
    const { t } = useTranslation();

    const heroInnerRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);
    const buttonsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: "body",
                    start: "top top",
                    end: "500",
                    scrub: true,
                }
            });

            // Shrink the height of the main bar
            tl.to(heroInnerRef.current, {
                height: "110px",
                // backgroundColor: 'rgba(10, 10, 10, 0.5)',
                backdropFilter: "blur(10px)",
                ease: "none"
            }, 0);

            // Animate Logo: Move from center-top to left-middle
            tl.to(logoRef.current, {
                x: () => -(window.innerWidth / 2) + 250, // Move to left side
                y: -20, // Move to exact vertical center
                scale: 0.7,
                ease: "none"
            }, 0);

            // Animate Buttons: Move from center-bottom to right-middle
            tl.to(buttonsRef.current, {
                x: () => (window.innerWidth / 2) - 840,
                y: 0,
                scale: 0.8,
                ease: "none"
            }, 0);
        });

        return () => ctx.revert();
    }, []);

    return (
        <nav className="fixed top-0 left-0 w-full z-100 pointer-events-none">
            <div
                ref={heroInnerRef}
                className="w-full max-w-7xl mx-auto h-screen flex items-center justify-center pointer-events-auto relative overflow-hidden"
            >
                {/* Both elements are absolute and centered via top-50/left-50.
                   We use 'y' in the style to create the Hero "stack" initially.
                */}

                {/* LOGO */}
                <div
                    ref={logoRef}
                    className="absolute top-1/2 left-1/2 -translate-x-1/6 -translate-y-1/2 flex items-center gap-4 whitespace-nowrap"
                    style={{ transform: 'translate(-50%, -150%)' }} // Initial Hero Position (Higher)
                >
                    <img src="./coin256.png" className="h-16 md:h-20" alt="logo" />
                    <h1 className="text-3xl md:text-6xl font-bold text-white">Conquian 333</h1>
                </div>

                {/* BUTTONS */}
                <div
                    ref={buttonsRef}
                    className="absolute top-2/5 left-8/12 -translate-x-1/2 -translate-y-1/2 flex gap-6 font-bold items-center"
                    style={{ transform: 'translate(-50%, 100%)' }} // Initial Hero Position (Lower)
                >
                    <button className="text-white/80 hover:text-white">{t('tutorial')}</button>
                    <button className="text-white/80 hover:text-white">{t('reviews')}</button>
                    <DownloadButton>{t('download')}</DownloadButton>
                </div>

            </div>
        </nav>
    );
}