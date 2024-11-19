import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export const NavBar = () => {
    const { t, i18n } = useTranslation();

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [languages, setLanguages] = useState<{ name: string, key: string }[]>([]);
    const [dark, setDark] = useState<boolean>(false);

    useEffect(() => {
        const savedLanguage = localStorage.getItem('language') || 'en';
        const savedMode = localStorage.getItem('mode') === 'true';

        setDark(savedMode);
        document.body.classList.toggle("dark", savedMode);
        i18n.changeLanguage(savedLanguage);
    }, [i18n]);

    const handleLanguageChange = async (language: { name: string, key: string }) => {
        await i18n.changeLanguage(language.key);
        localStorage.setItem('language', language.key);
        setIsOpen(false);
    };

    const darkModeHandler = (): void => {
        setDark(prev => {
            const newDarkMode = !prev;
            localStorage.setItem('mode', newDarkMode.toString());
            document.body.classList.toggle("dark", newDarkMode);
            return newDarkMode;
        });
    };

    useEffect(() => {
        const setupLanguages = async () => {
            const appLanguages = [
                { name: t('Arabic'), key: 'ar' },
                { name: t('English'), key: 'en' },
                { name: t('Turkish'), key: 'tr' },
            ];
            setLanguages(appLanguages);
        };
        setupLanguages();
    }, [t]);

    const LANGUAGE_SELECTOR_ID = 'language-selector';
    useEffect(() => {
        const handleWindowClick = (event: MouseEvent) => {
            const target = (event.target as HTMLElement).closest('button');
            if (target && target.id === LANGUAGE_SELECTOR_ID) {
                return;
            }
            setIsOpen(false);
        };
        window.addEventListener('click', handleWindowClick);
        return () => {
            window.removeEventListener('click', handleWindowClick);
        };
    }, []);

    const selectedLanguage = languages.find(language => language.key === i18n.language) ?? { name: '', key: 'en' };
    const getLanguageCode = (key: string): string => {
        switch (key) {
            case 'ar':
                return 'sa';
            case 'en':
                return 'uk';
            case 'tr':
                return 'tu';
            default:
                return 'uk';
        }
    }

    return (
        <div className="container flex flex-wrap items-center justify-between mx-auto text-slate-800">
            <a href="#"
                className="mr-4 cursor-pointer py-1.5 text-base text-slate-800 font-semibold">
                {t('Omer Alkadri')}
            </a>
            <div className="hidden sm:block">
                {t('NumberOfVisitorsToMyProfile:')} 0 {/* قم بتعديل العدد حسب الحاجة */}
            </div>
            <div className="block">
                <ul className="flex gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 flex-row lg:items-center lg:gap-6">
                    <li className="flex items-center p-1 text-sm gap-x-2 text-slate-600">
                        <div className="flex items-center">{t('Light')}</div>
                        <div className='flex'>
                            <div className="relative">
                                <label className="flex w-full items-center justify-center cursor-pointer">
                                    <input id="switch-2" type="checkbox" className="peer sr-only" checked={dark} readOnly />
                                    <div onClick={darkModeHandler} className="peer h-4 w-11 rounded-full border bg-slate-200
                                    after:absolute after:-top-1 after:left-0 after:h-6 after:w-6 after:rounded-full after:border
                                    after:border-gray-300 after:bg-white after:transition-all after:content-[''] 
                                    peer-checked:bg-white peer-checked:after:translate-x-full 
                                    peer-focus:ring-green-300"></div>
                                </label>
                            </div>
                        </div>
                        <div className="flex items-center">{t('Dark')}</div>
                    </li>
                    <li>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            type="button"
                            className="inline-flex items-center justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            id={LANGUAGE_SELECTOR_ID}
                            aria-expanded={isOpen}
                        >
                            <img className="w-7 h-7 rounded-full" src={`https://www.worldometers.info/img/flags/${getLanguageCode(selectedLanguage.key)}-flag.gif`} alt="" />
                            <div className="w-full max-w-[60px]">
                                {t(selectedLanguage?.name)}
                            </div>
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

                        {isOpen && <div
                            className="origin-top-right absolute rtl:left-0 ltr:right-0 mt-2 w-96 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby={LANGUAGE_SELECTOR_ID}
                        >
                            <div className="py-1 grid grid-cols-2 gap-2" role="none">
                                {languages.map((language, index) => (
                                    <button
                                        key={language.key}
                                        onClick={() => handleLanguageChange(language)}
                                        className={`${selectedLanguage?.key === language.key
                                            ? "bg-gray-100 text-gray-900"
                                            : "text-gray-700"
                                            } flex justify-between block px-4 py-2 text-sm text-start items-center inline-flex hover:bg-gray-100 ${index % 2 === 0 ? 'rounded-r' : 'rounded-l'}`}
                                        role="menuitem"
                                    >
                                        <img className="w-7 h-7 rounded-full" src={`https://www.worldometers.info/img/flags/${getLanguageCode(language.key)}-flag.gif`} alt="" />
                                        <span className="truncate">{t(language.name)}</span>
                                    </button>
                                ))}
                            </div>
                        </div>}
                    </li>
                </ul>
            </div>
        </div>
    );
};
