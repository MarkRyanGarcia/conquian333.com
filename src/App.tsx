import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import Hero from './components/Hero';
import Navbar from './components/Navbar';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function App() {
    const container = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!container.current) return;

        const smoother = ScrollSmoother.create({
            wrapper: container.current,
            content: container.current.children[0],
            smooth: 1,
            effects: true,
        });

        return () => {
            smoother.kill();
        };
    }, []);

    return (
        <main ref={container}>
            <div>
                <Navbar />
                <Hero />
            </div>
        </main>
    );
}
