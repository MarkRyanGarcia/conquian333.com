import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import { gsap } from 'gsap';
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);

export default function Description() {
    const { t } = useTranslation();
    const desc = useRef(null)
    useGSAP(
        () => {
            ScrollTrigger.create({
                trigger: '.phone',
                start: 'bottom top',
                end: '+=100',
                pin: false,
                markers: true,
            });


        },
        { scope: desc }
    )

    return (
        <section title='description' className='relative flex flex-col max-w-5xl justify-center pt-[100vh] items-center mx-auto'>
            <main ref={desc}>
                <div className='flex flex-col-reverse md:flex-row gap-10 justify-between w-full mx-auto'>
                    <img src='./01.png' className='phone w-100' data-speed={0.67}></img>
                    <div className='flex flex-col gap-2 just'>
                        <h2 className='w-full text-3xl font-bold'>
                            {t("the_classic_card_game")}
                        </h2>
                        <h3 className='font-bold'>
                            {t("created_with_100p_mexican_talent")}
                        </h3>
                        <ul>
                            <li>
                                {t("play_online")}
                            </li>
                            <li>
                                {t("play_conquian_against_the_computer")}
                            </li>
                            <li>
                                {t("save_your_wins_losses_and_standings_in_the_cloud")}
                            </li>
                        </ul>
                    </div>
                </div>
            </main>
        </section>
    )
}

