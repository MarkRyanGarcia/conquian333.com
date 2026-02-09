import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import NavHero from "./components/NavHero";
import Description from "./components/Description";

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
            <NavHero />
            <div ref={wrapper} id="smooth-wrapper">
                <div ref={content} id="smooth-content">
                    <div className="h-[40vh]"></div>
                    <Description />
                    <div className="h-[300vh]"></div>
                </div>
            </div>
        </>
    );
}
