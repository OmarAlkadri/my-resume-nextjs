import { useTranslation } from 'react-i18next';

export const References = () => {
    const { t } = useTranslation();

    const references = [
        {
            name: "Ahmed Elkadri",
            title: t('seniorSoftwareDeveloperAtMelerToledo'),
            phone: "+90 551 600 54 28",
            email: "ah.al-kadri@live.com"
        },
        {
            name: "Yasin Faruk Kılıç",
            title: t('seniorSoftwareDeveloperAndCoFounderAtHitatek'),
            phone: "+90 505 468 37 17",
            email: "info@hitatek.com"
        },
        {
            name: "Amir Alkadri",
            title: t('productManager'),
            phone: "+90 553 723 00 31",
            email: "alkadriamer@gmail.com"
        }
    ];

    return (
        <div className='references w-full justify-start items-center xl:gap-12 gap-10 w-full flex-col justify-center lg:items-start items-center gap-10 inline-flex w-full px-4 md:px-5 lg:px-5 mx-auto w-full flex-col justify-center items-start gap-8 flex'>

            <div className="flex-col justify-start lg:items-start items-center gap-4 flex">
                <h1 className="font-manrope text-gray-400 text-4xl font-bold leading-10 relative left-0">{t('references')}</h1>
                <hr className="w-28 h-1 bg-black border-0 rounded dark:bg-gray-700" />
            </div>
            <div className="w-full flex-col justify-center items-start gap-6 flex">
                <ul className="items-center sm:flex">
                    {references.map((reference, index) => (
                        <li key={index} className="relative mb-6 sm:mb-0">
                            <div className="flex items-center">
                                <div className="z-10 flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                                    <span className="w-2.5 h-2.5 text-blue-800 dark:text-blue-300 icon-[el--ok-sign]"></span>
                                </div>
                                {index < references.length - 1 && (
                                    <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
                                )}
                            </div>
                            <div className="mt-3 sm:pe-8">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{reference.name}</h3>
                                <p className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{reference.title}</p>
                                <p className="text-base font-normal text-gray-500 dark:text-gray-400">{t('phone')}: {reference.phone}</p>
                                <p className="text-base font-normal text-gray-500 dark:text-gray-400">{t('email')}: {reference.email}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
