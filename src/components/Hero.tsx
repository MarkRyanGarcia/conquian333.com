import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import { gsap } from 'gsap';
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const { t } = useTranslation();
    const desc = useRef(null)
    const textRef = useRef(null)
    const imgRef = useRef(null)

    useGSAP(
        () => {
            gsap.from([textRef.current, imgRef.current], {
                opacity: 0,
                y: 40,
                stagger: 0.15,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: desc.current,
                    start: "top 80%",
                    markers: false,
                }
            });
        },
        { scope: desc }
    )

    return (
        <section title='hero' className='relative flex flex-col max-w-5xl justify-center pt-70 md:pt-200 items-center mx-auto pointer-events-none'>
            <main ref={desc}>
                <div className='header flex flex-col md:flex-row gap-10 justify-between items-center w-full mx-auto' data-speed={0.4}>
                    <div ref={textRef} className='flex flex-col gap-2 p-5'>
                        <h2 className='w-full text-3xl font-bold'>
                            {t("the_classic_card_game")}
                        </h2>
                        <h3 className='font-bold'>
                            {t("created_with_100p_mexican_talent")}
                        </h3>
                        <ul>
                            <li>
                               - {t("play_online")}
                            </li>
                            <li>
                               - {t("play_conquian_against_the_computer")}
                            </li>
                            <li>
                               - {t("save_your_wins_losses_and_standings_in_the_cloud")}
                            </li>
                        </ul>
                    </div>
                    <img ref={imgRef} src='./01.png' className='phone w-100'></img>
                </div>
            </main>
        </section>
    )
}
