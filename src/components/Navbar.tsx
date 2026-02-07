import { useRef, useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DownloadButton from "./DownloadButton";

export default function Navbar() {
    const navRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!navRef.current) return;

        const trigger = ScrollTrigger.create({
            trigger: navRef.current,
            start: "top top",
            end: 99999,
            pin: true,
            pinSpacing: false,
        });

        return () => trigger.kill();
    }, []);

    return (
        <nav ref={navRef} className="w-full sticky top-0 z-50">
            <div className="relative h-20 pt-5 overflow-visible">

                {/* BLUR LAYER */}
                <div
                    className="
                                pointer-events-none
                                absolute top-0 left-0 right-0
                                h-45
                                -z-10
                                bg-base/70 md:bg-transparent
                                md:backdrop-blur-md
                                md:mask-[linear-gradient(to_bottom,black,black_60%,transparent)]
                              "
                />

                <div className="relative z-10 flex justify-between w-full max-w-7xl mx-auto">
                    <div className="flex items-center gap-7">
                        <img src="./coin256.png" className="h-20" />
                        <h1 className="text-3xl font-bold text-white">Conquian 333</h1>
                    </div>
                    


                    <div className="flex items-center gap-5 font-bold">
                        
                        <button className="text-offwhite-2 hover:text-white hover:underline">Tutorial</button>
                        <button className="text-offwhite-2 hover:text-white hover:underline">Reseñas</button>
                        <button className="text-offwhite-2 hover:text-white hover:underline">Mercancía</button>
                        <DownloadButton>Descargalo</DownloadButton>
                    </div>
                </div>

            </div>
        </nav>

    )
}
