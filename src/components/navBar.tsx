import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import Loader from "./Loader";
import emailjs from "emailjs-com";

interface Visitor {
    ip: string;
    city: string;
    text: string;
}

export const NavBar = () => {
    const { t, i18n } = useTranslation();

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [languages, setLanguages] = useState<{ name: string; key: string }[]>([]);
    const [dark, setDark] = useState<boolean>(false);
    const [visitorCount, setVisitorCount] = useState<number>(0);
    const [visitor, setVisitor] = useState<Visitor | null>(null);
    const [entryTime, setEntryTime] = useState<number>(Date.now());
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedLanguage = localStorage.getItem("language") || "en";
        const savedMode = localStorage.getItem("mode") === "true";

        setDark(savedMode);
        document.body.classList.toggle("dark", savedMode);
        i18n.changeLanguage(savedLanguage);
    }, [i18n]);

    const handleLanguageChange = async (language: { name: string; key: string }) => {
        await i18n.changeLanguage(language.key);
        localStorage.setItem("language", language.key);
        setIsOpen(false);
    };

    const darkModeHandler = (): void => {
        setDark((prev) => {
            const newDarkMode = !prev;
            localStorage.setItem("mode", newDarkMode.toString());
            document.body.classList.toggle("dark", newDarkMode);
            return newDarkMode;
        });
    };

    const LANGUAGE_SELECTOR_ID = "language-selector";

    useEffect(() => {
        const setupLanguages = () => {
            setLanguages([
                { name: t("Arabic"), key: "ar" },
                { name: t("English"), key: "en" },
                { name: t("Turkish"), key: "tr" },
            ]);
        };

        setupLanguages();
        setEntryTime(Date.now());

        const trackVisitor = async () => {
            try {
                setLoading(true);
                const response = await fetch("/api/trackVisitors", { method: "GET" });
                const data = await response.json();

                setVisitorCount(data.visitorCount);
                setVisitor(data);
                setLoading(false);
            } catch (error) {
                console.error("Error tracking visitor:", error);
            }
        };

        trackVisitor();

        const handleExit = async () => {
            const exitTime = Date.now();
            const durationInSeconds = Math.floor((exitTime - entryTime) / 1000);

            if (visitor) {
                try {
                    await emailjs.send(
                        "service_au36n7r",
                        "template_3ydh4qk",
                        {
                            to_name: "Omar Alkadri",
                            name: `${visitor.ip} ${visitor.city} - Stayed ${durationInSeconds} seconds`,
                            from_name: `${visitor.ip} ${visitor.city} - Stayed ${durationInSeconds} seconds`,
                            email: "omar.omar.alkadri11@gmail.com",
                            reply_to: "omar.omar.alkadri111@gmail.com",
                            phone: "5396711355",
                            message: visitor.text,
                        },
                        "0Duit5ctOLrKA_TL0"
                    );
                } catch (error) {
                    console.error("Error sending email:", error);
                }
            }
        };

        const handleWindowClick = (event: MouseEvent) => {
            if ((event.target as HTMLElement).closest("button")?.id === LANGUAGE_SELECTOR_ID) {
                return;
            }
            setIsOpen(false);
        };

        window.addEventListener("click", handleWindowClick);
        window.addEventListener("beforeunload", handleExit);

        return () => {
            window.removeEventListener("click", handleWindowClick);
            window.removeEventListener("beforeunload", handleExit);
        };
    }, []);

    const selectedLanguage =
        languages.find((language) => language.key === i18n.language) ?? { name: "", key: "en" };

    const getLanguageCode = (key: string): string => {
        switch (key) {
            case "ar":
                return "sa";
            case "en":
                return "uk";
            case "tr":
                return "tu";
            default:
                return "uk";
        }
    };

    return (
        <div className="gap-y-2">
            <div className="container flex flex-wrap items-center justify-between mx-auto text-slate-800">
                <a href="#" className="mr-4 cursor-pointer py-1.5 text-base text-slate-800 font-semibold">
                    {t("Omer Alkadri")}
                </a>
                <Loader loaded={!loading} onlySpinner={false}>
                    <div>{t("NumberOfVisitorsToMyProfile") + ": " + visitorCount}</div>
                </Loader>

                <div className="block">
                    <ul className="flex gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 flex-row lg:items-center lg:gap-6">
                        <li className="flex items-center p-1 text-sm gap-x-2 text-slate-600">
                            <div className="flex items-center">{t("Light")}</div>
                            <div className="flex">
                                <div className="relative">

                                    <label className="flex w-full items-center justify-center cursor-pointer">
                                        <input id="switch-2" type="checkbox" className="peer sr-only" checked={dark} readOnly />
                                        <div
                                            onClick={darkModeHandler}
                                            className="peer h-4 w-11 rounded-full border bg-slate-200
                      after:absolute after:-top-1 after:left-0 after:h-6 after:w-6 after:rounded-full after:border
                      after:border-gray-300 after:bg-white after:transition-all after:content-[''] 
                      peer-checked:bg-white peer-checked:after:translate-x-full 
                      peer-focus:ring-green-300"
                                        />
                                    </label>
                                </div>
                            </div>
                            <div className="flex items-center">{t("Dark")}</div>
                        </li>
                        <li>
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                type="button"
                                className="inline-flex items-center justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                id={LANGUAGE_SELECTOR_ID}
                                aria-expanded={isOpen}
                            >
                                <Image
                                    className="w-7 h-7 rounded-full"
                                    src={`https://www.worldometers.info/img/flags/${getLanguageCode(selectedLanguage.key)}-flag.gif`}
                                    alt="Language Flag"
                                    width={28}
                                    height={28}
                                />
                                <div className="w-full max-w-[60px]">{t(selectedLanguage?.name)}</div>
                                <svg
                                    className="-me-1 ms-2 h-5 w-5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10.293 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L10 12.586l3.293-3.293a1 1 0 011.414 1.414l-4 4z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>

                            {isOpen && (
                                <div className="origin-top-right absolute rtl:left-0 ltr:right-0 mt-2 w-96 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                    <div className="py-1 grid grid-cols-2 gap-2">
                                        {languages.map((language) => (
                                            <button key={language.key} onClick={() => handleLanguageChange(language)}>
                                                <Image
                                                    className="w-7 h-7 rounded-full"
                                                    src={`https://www.worldometers.info/img/flags/${getLanguageCode(language.key)}-flag.gif`}
                                                    alt="Language Flag"
                                                    width={28}
                                                    height={28}
                                                />
                                                <span className="truncate">{t(language.name)}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
