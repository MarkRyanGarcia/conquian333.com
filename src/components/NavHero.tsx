import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DownloadButton from "./DownloadButton";
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);

export default function NavHero() {
    const { t } = useTranslation();

    const heroRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);
    const buttonsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const wrapperWidth = heroRef.current?.offsetWidth || window.innerWidth;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                }
            });

            // Shrink hero height
            tl.to(heroRef.current, {
                height: "110px",
                backdropFilter: "blur(10px)",
                ease: "none"
            }, 0);

            // Move logo to left on desktop, slightly scale down
            tl.to(logoRef.current, {
                xPercent: -50,
                yPercent: 0,
                scale: 0.7,
                ease: "none"
            }, 0);

            // Move buttons to right on desktop, scale down
            tl.to(buttonsRef.current, {
                xPercent: 50,
                yPercent: 0,
                scale: 0.8,
                ease: "none"
            }, 0);
        });

        return () => ctx.revert();
    }, []);

    return (
        <nav className="fixed top-0 left-0 w-full z-50 pointer-events-none">
            <div
                ref={heroRef}
                className="w-full max-w-7xl mx-auto h-screen flex flex-col md:flex-row items-center justify-center relative overflow-hidden px-4"
            >
                {/* LOGO */}
                <div
                    ref={logoRef}
                    className="flex flex-col md:flex-row items-center gap-4 absolute md:relative"
                    style={{ top: "30%", left: "50%", transform: "translate(-50%, -50%)" }}
                >
                    <img src="./coin256.png" className="h-16 md:h-20" alt="logo" />
                    <h1 className="text-3xl md:text-6xl font-bold text-white text-center md:text-left">Conquian 333</h1>
                </div>

                {/* BUTTONS */}
                <div
                    ref={buttonsRef}
                    className="flex flex-col sm:flex-row gap-4 sm:gap-6 font-bold items-center absolute md:relative mt-4 md:mt-0"
                    style={{ top: "55%", left: "50%", transform: "translate(-50%, -50%)" }}
                >
                    <button className="text-white/80 hover:text-white">{t('tutorial')}</button>
                    <button className="text-white/80 hover:text-white">{t('reviews')}</button>
                    <DownloadButton>{t('download')}</DownloadButton>
                </div>
            </div>
        </nav>
    );
}