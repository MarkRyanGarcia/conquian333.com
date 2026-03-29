import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SmootherContext } from "./context/SmootherContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Different from "./components/Different";
import Features from "./components/Features";
import Tutorial from "./components/Tutorial";
import Reviews from "./components/Reviews";
import Footer from "./components/Footer";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function App() {
    const wrapper = useRef<HTMLDivElement>(null);
    const content = useRef<HTMLDivElement>(null);
    const [smoother, setSmoother] = useState<ScrollSmoother | null>(null);

    useEffect(() => {
        const mm = gsap.matchMedia();

        mm.add("(min-width: 768px)", () => {
            const instance = ScrollSmoother.create({
                wrapper: wrapper.current,
                content: content.current,
                smooth: 1,
                effects: true,
            });

            setSmoother(instance);

            return () => {
                instance.kill();
                setSmoother(null);
            };
        });

        return () => mm.revert();
    }, []);

    return (
        <SmootherContext.Provider value={{ smoother }}>
            <Navbar />
            <div ref={wrapper} id="smooth-wrapper">
                <div ref={content} id="smooth-content">
                    <Hero />
                    <Different />
                    <Features />
                    <Tutorial />
                    <Reviews />
                    <Footer />
                </div>
            </div>
        </SmootherContext.Provider>
    );
}
