import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Different from "./components/Different";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function App() {
    const wrapper = useRef<HTMLDivElement>(null);
    const content = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const mm = gsap.matchMedia();
    
        mm.add("(min-width: 768px)", () => {
            const smoother = ScrollSmoother.create({
                wrapper: wrapper.current,
                content: content.current,
                smooth: 1,
                effects: true,
            });
    
            return () => smoother.kill();
        });
    
        return () => mm.revert();
    }, []);

    return (
        <>
            <Navbar />
            <div ref={wrapper} id="smooth-wrapper">
                <div ref={content} id="smooth-content">
                    {/* <div className="h-[0vh]"></div> */}
                    <Hero />
                    <Different />
                    <div className="h-[300vh]"></div>
                </div>
            </div>
        </>
    );
}
