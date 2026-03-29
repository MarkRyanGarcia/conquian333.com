import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import { gsap } from 'gsap';
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);

export default function Different() {
    const { t } = useTranslation();
    const desc = useRef(null)
    const imgRef = useRef(null)
    const textRef = useRef(null)

    useGSAP(
        () => {
            gsap.from([imgRef.current, textRef.current], {
                opacity: 0,
                x: -30,
                stagger: 0.15,
                duration: 0.6,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: desc.current,
                    start: "top 75%",
                }
            });
        },
        { scope: desc }
    )

    return (
        <section title='different' className='relative flex flex-col max-w-5xl justify-center pt-70 md:pt-227 items-center mx-auto pointer-events-none'>
            <main ref={desc}>
                <div className='header flex flex-col-reverse md:flex-row gap-10 justify-between items-center w-full mx-auto'>
                    <img ref={imgRef} src='./02.png' className='phone w-100'></img>
                    <div ref={textRef} className='flex flex-col gap-2 p-5'>
                        <h2 className='w-full text-3xl font-bold'>
                            {t("conquian_is_different")}
                        </h2>
                        <ul>
                            <li>
                                - {t("shuffled_in_3d")}
                            </li>
                            <li>
                                - {t("tilt_your_phone")}
                            </li>
                            <li>
                                - {t("hd_quality")}
                            </li>
                            <li>
                                - {t("only_valid_plays")}
                            </li>
                        </ul>
                    </div>
                </div>
            </main>
        </section>
    )
}
