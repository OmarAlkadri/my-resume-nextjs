import { useTranslation } from 'react-i18next';
import myImage from '@/assets/my.jpg';
import Image from 'next/image';

export const MyStory = () => {
    const { t } = useTranslation();

    const data = {
        about: {
            title: t('about.title'),
            subtitle: t('about.subtitle'),
            description: t('about.description')
        },
        stats: [
            { title: t('stats.0.title'), description: t('stats.0.description') },
            { title: t('stats.1.title'), description: t('stats.1.description') },
            { title: t('stats.2.title'), description: t('stats.2.description') },
            { title: t('stats.3.title'), description: t('stats.3.description') }
        ],
        button: t('DownloadMyResume')
    };

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = './SSE Omar Alkadri CV.pdf';
        link.download = 'SSE Omar Alkadri CV.pdf';
        link.click();
    };

    return (
        <div className="w-full grid lg:grid-cols-2 grid-cols-1 gap-10">
            <div className="w-full flex-col justify-center items-center lg:items-start gap-10 inline-flex">
                <div className="w-full flex-col justify-center items-start gap-8 flex">
                    <div className="flex-col justify-start items-start gap-4 flex">
                        <div className="flex-col justify-start lg:items-start gap-4 flex">
                            <h1 className="font-manrope text-gray-400 text-4xl font-bold leading-10">
                                {data.about.title}
                            </h1>
                            <hr className="w-28 h-1 bg-black border-0 rounded dark:bg-gray-700" />
                        </div>
                        <div className="w-full flex flex-col justify-start lg:items-start items-start gap-3">
                            <h2 className="text-indigo-700 text-4xl font-bold font-manrope lg:text-start text-start">
                                {data.about.subtitle}
                            </h2>
                            <p className="text-gray-500 text-base leading-relaxed lg:text-start text-start">
                                {data.about.description}
                            </p>
                        </div>
                    </div>
                    <div className="w-full flex-col justify-center items-start gap-6 flex">
                        <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-8">
                            {data.stats.slice(0, 2).map((stat, index) => (
                                <div key={index} className="w-full h-full p-3.5 rounded-xl border border-gray-200 hover:border-gray-400 transition-all duration-700 flex-col">
                                    <h4 className="text-gray-900 text-2xl font-bold font-manrope leading-9">
                                        {stat.title}
                                    </h4>
                                    <p className="text-gray-500 text-base leading-relaxed">
                                        {stat.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-8">
                            {data.stats.slice(2).map((stat, index) => (
                                <div key={index} className="w-full h-full p-3.5 rounded-xl border border-gray-200 hover:border-gray-400 transition-all duration-700 flex-col">
                                    <h4 className="text-gray-900 text-2xl font-bold font-manrope leading-9">
                                        {stat.title}
                                    </h4>
                                    <p className="text-gray-500 text-base leading-relaxed">
                                        {stat.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <button onClick={handleDownload} className="sm:w-fit w-full group px-3.5 py-2 bg-indigo-50 hover:bg-indigo-100 rounded-lg shadow transition-all duration-700 flex justify-center items-center">
                    <span className="px-1.5 text-indigo-600 text-sm font-medium leading-6 group-hover:-translate-x-0.5 transition-all duration-700">
                        {data.button}
                    </span>
                    <svg className="group-hover:translate-x-0.5 transition-all duration-700" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path d="M6.75265 4.49658L11.2528 8.99677L6.75 13.4996" stroke="#4F46E5" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>
            <div className="w-full lg:justify-start justify-center items-start flex">
                <div className="max-w-[575px] w-full max-h-[650px] h-full sm:bg-gray-100 rounded-3xl sm:border border-gray-200 relative">
                    <Image className="sm:mt-5 sm:ml-5 w-full h-full rounded-3xl object-cover" src={myImage} alt="About Us" />
                </div>
            </div>
        </div>
    )
}
