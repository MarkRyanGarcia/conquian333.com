import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DownloadButton from "./DownloadButton";

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
    const navRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLImageElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        if (!navRef.current) return;

        const ctx = gsap.context(() => {
            // timeline that shrinks hero → navbar
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: navRef.current,
                    start: "top top",
                    end: "+=400",
                    scrub: true,
                }
            });

            tl.fromTo(
                navRef.current,
                { height: "100vh" },
                { height: "80px", ease: "none" }
            );

            tl.fromTo(
                logoRef.current,
                { scale: 1.6 },
                { scale: 0.7, ease: "none" },
                0
            );

            tl.fromTo(
                titleRef.current,
                { scale: 1.6 },
                { scale: 0.8, ease: "none" },
                0
            );

            // second trigger that pins forever AFTER shrink
            ScrollTrigger.create({
                trigger: navRef.current,
                start: "top top",
                end: 99999,
                pin: true,
                pinSpacing: false,
            });

        }, navRef);

        return () => ctx.revert();
    }, []);

    return (
        <nav
            ref={navRef}
            className="w-full bg-base z-50 overflow-hidden"
            style={{ height: "100vh" }}
        >
            <div className="w-full h-full flex items-center justify-center">
                <div className="w-full max-w-7xl px-6 flex justify-between items-center">

                    <div className="flex items-center gap-6">
                        <img
                            ref={logoRef}
                            src="./coin256.png"
                            className="h-24"
                        />
                        <h1
                            ref={titleRef}
                            className="text-5xl font-bold text-white"
                        >
                            Conquian 333
                        </h1>
                    </div>

                    <div className="flex items-center gap-5 font-bold">
                        <button className="text-offwhite-2 hover:text-white">Tutorial</button>
                        <button className="text-offwhite-2 hover:text-white">Reseñas</button>
                        <button className="text-offwhite-2 hover:text-white">Mercancía</button>
                        <DownloadButton>Descargalo</DownloadButton>
                    </div>

                </div>
            </div>
        </nav>
    );
}
