import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import { gsap } from 'gsap';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const hero = useRef(null)
    useGSAP(
        () => {
            ScrollTrigger.create({
                trigger: '.box',
                start: 'center center',
                end: '+=500',
                pin: true,
                markers: true,
            })
        },
        { scope: hero }
    )

    return (
        <div className='flex flex-col max-w-5xl justify-center align-center mx-auto'>
            <main ref={hero}>
                <div className=''>
                    {/* <h1 className='font-bold text-5xl text-center'>CONQUIAN 333</h1> */}
                    <div className='h-[50vh]'></div>
                    {/* <div className='box w-30 bg-red-500 h-30' data-speed={0.5}></div> */}
                    <img src='./coin256.png' className='box w-30' data-speed={0.5}></img>
                    <div className='h-screen' ></div>
                </div>
            </main>
        </div>
    )
}

