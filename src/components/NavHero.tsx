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

                // shrink hero
                tl.to(heroRef.current, {
                    height: 110,
                    ease: "none"
                }, 0);

                // move logo to left-top corner
                tl.to(logoRef.current, {
                    x: () => -window.innerWidth / 4,
                    y: 20,
                    scale: 0.7,
                    ease: "none"
                }, 0);

                // move buttons to right-top corner
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

                tl.to(heroRef.current, {
                    height: 120,
                    ease: "none"
                }, 0);

                tl.to(logoRef.current, {
                    yPercent: -20,
                    scale: 0.75,
                    transformOrigin: "center center",
                    ease: "none"
                }, 0);

                tl.to(buttonsRef.current, {
                    yPercent: -100,
                    scale: 0.85,
                    transformOrigin: "center center",
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
                <div
                    ref={logoRef}
                    className="flex items-center gap-3 md:gap-4 justify-center w-full"
                >
                    <img src="./coin256.png" className="h-12 md:h-20" />
                    <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white">
                        Conquian 333
                    </h1>
                </div>

                <div
                    ref={buttonsRef}
                    className="mt-6 flex gap-4 sm:gap-6 font-bold items-center justify-center w-full"
                >
                    <button className="text-white/80 hover:text-white cursor-pointer">{t('tutorial')}</button>
                    <button className="text-white/80 hover:text-white cursor-pointer">{t('reviews')}</button>
                    <DownloadButton>{t('download')}</DownloadButton>
                </div>
            </div>
        </nav>
    );
}