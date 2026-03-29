import { useTranslation } from 'react-i18next';
import { useReveal } from '../hooks/useReveal';

export default function Different() {
    const { t } = useTranslation();
    const imgRef = useReveal();
    const textRef = useReveal();

    return (
        <section title='different' className='relative flex flex-col max-w-5xl justify-center pt-20 items-center mx-auto pointer-events-none'>
            <div className='flex flex-col-reverse md:flex-row gap-10 justify-between items-center w-full mx-auto px-6'>
                <img ref={imgRef} src='./02.png' className='w-64 sm:w-80 md:w-96 reveal-left' alt='app screenshot 2' />
                <div ref={textRef} className='flex flex-col gap-2 p-5 reveal-right'>
                    <h2 className='w-full text-3xl font-bold'>
                        {t("conquian_is_different")}
                    </h2>
                    <ul className="flex flex-col gap-1 text-white/70 mt-1">
                        <li>— {t("shuffled_in_3d")}</li>
                        <li>— {t("tilt_your_phone")}</li>
                        <li>— {t("hd_quality")}</li>
                        <li>— {t("only_valid_plays")}</li>
                    </ul>
                </div>
            </div>
        </section>
    );
}
