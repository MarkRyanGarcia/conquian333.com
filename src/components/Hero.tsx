import { useTranslation } from 'react-i18next';

const IOS_URL = 'https://apps.apple.com/us/app/conquian-333/id1069186374'
const ANDROID_URL = 'https://play.google.com/store/apps/details?id=com.alexga.Conquian333'

export default function Hero() {
    const { t } = useTranslation();

    return (
        <section
            title="hero"
            className="relative flex flex-col items-center justify-center pt-28 pb-12"
        >
            <div className="max-w-5xl mx-auto px-6 w-full flex flex-col md:flex-row gap-10 items-center justify-between pointer-events-none">
                {/* Text block — staggered children */}
                <div className="flex flex-col gap-3 max-w-md hero-text-stagger">
                    <h2 className="text-3xl sm:text-4xl font-bold leading-tight">
                        {t("the_classic_card_game")}
                    </h2>
                    <h3 className="font-semibold text-white/80">
                        {t("created_with_100p_mexican_talent")}
                    </h3>
                    <ul className="flex flex-col gap-1 text-white/70 mt-1">
                        <li>— {t("play_online")}</li>
                        <li>— {t("play_conquian_against_the_computer")}</li>
                        <li>— {t("save_your_wins_losses_and_standings_in_the_cloud")}</li>
                    </ul>

                    {/* Download badges — pointer-events re-enabled */}
                    <div className="flex gap-3 mt-4 pointer-events-auto">
                        <a href={IOS_URL} target="_blank" rel="noopener noreferrer">
                            <img src="./app-store.png" alt="Download on the App Store" className="h-10 hover:opacity-80 transition-opacity" />
                        </a>
                        <a href={ANDROID_URL} target="_blank" rel="noopener noreferrer">
                            <img src="./google-play.png" alt="Get it on Google Play" className="h-10 hover:opacity-80 transition-opacity" />
                        </a>
                    </div>
                </div>

                {/* Phone */}
                <img
                    src="./01.png"
                    className="w-64 sm:w-80 md:w-96 animate-fade-in-right"
                    alt="app screenshot"
                />
            </div>

        </section>
    );
}
