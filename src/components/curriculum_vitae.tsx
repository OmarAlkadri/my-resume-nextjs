import trtWorldIcon from '../assets/trtWorldIcon.jpeg';
import hitatekIcon from '../assets/hitatekIcon.png';
import sakaryaIcon from '../assets/sakaryaIcon.png';
import freelancer from '../assets/freelancer.png';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from 'react';
import AnimatedListItem from './animatedListItem';

export const CurriculumVitae = () => {
    const { t } = useTranslation();

    const EducationData = {
        time: t("education.time.2018_2022"),
        institution: t("education.institution.sakarya_university"),
        department: t("education.department.computer_and_information_sciences"),
        program: t("education.program.computer_engineering"),
        link: "https://cs.sakarya.edu.tr/",
        logo: sakaryaIcon,
    };

    const CertificationsData = [
        {
            description: [
                t("certifications.data_structures"),
                t("certifications.algorithms"),
                t("certifications.access_code_networking")
            ],
        },
    ];

    const InterestsData = t("interests.description");

    const ExperiencesData = [
        {
            time: t("experience.trt_global.time"),
            position: t("experience.trt_global.position"),
            level: t("experience.trt_global.level"),
            company: t("experience.trt_global.company"),
            logo: trtWorldIcon,
            responsibilities: [
                t("experience.trt_global.responsibility.cms_implementation"),
                t("experience.trt_global.responsibility.ai_integration"),
                t("experience.trt_global.responsibility.news_asset_collaboration"),
                t("experience.trt_global.responsibility.microservices_architecture"),
                t("experience.trt_global.responsibility.technologies_used"),
            ],
        },
        {
            time: t("experience.hitatek.time"),
            position: t("experience.hitatek.position"),
            level: t("experience.hitatek.level"),
            company: t("experience.hitatek.company"),
            logo: hitatekIcon,
            responsibilities: [
                t("experience.hitatek.responsibility.telegram_bot"),
                t("experience.hitatek.responsibility.education_management_system"),
                t("experience.hitatek.responsibility.field_management_system"),
                t("experience.hitatek.responsibility.election_tracking"),
                t("experience.hitatek.responsibility.technologies_used"),
            ],
        },
        {
            time: t("experience.freelancer.time"),
            position: t("experience.freelancer.position"),
            level: t("experience.freelancer.level"),
            company: t("experience.freelancer.company"),
            logo: freelancer,
            responsibilities: [
                t("experience.freelancer.responsibility.web_development_projects"),
                t("experience.freelancer.responsibility.api_design"),
                t("experience.freelancer.responsibility.client_collaboration"),
                t("experience.freelancer.responsibility.full_project_lifecycle"),
                t("experience.freelancer.responsibility.technologies_used"),
            ],
        },
    ];

    const { ref: interestsRef, inView: interestsInView } = useInView({ threshold: 0.5, triggerOnce: false });
    const { ref: certificationsRef, inView: certificationsInView } = useInView({ threshold: 0.5, triggerOnce: false });
    const [className, setClassName] = useState('animate-zoomIn');
    const { ref: educationRef, entry } = useInView({
        threshold: [0, 0.1, 0.5, 1],
        triggerOnce: false
    });
    useEffect(() => {
        if (entry) {
            const isAlmostGone = entry.intersectionRatio < 0.99;
            if (!isAlmostGone) {
                setClassName('animate-zoomIn')
            } else
                setClassName('animate-zoomOut')
        }
    }, [entry]);

    return (
        <div className="w-full px-4 md:px-5 lg:px-5 mx-auto">
            <div className="w-full flex-col justify-center lg:items-start items-center gap-10 inline-flex">
                <div className="w-full flex-col justify-center items-start gap-8 flex">
                    <div className="flex-col justify-start lg:items-start items-center gap-4 flex">
                        <h1 className="font-manrope text-gray-400 text-4xl font-bold leading-10 relative left-0">{t('cv_title')}</h1>
                        <hr className="w-28 h-1 bg-black border-0 rounded dark:bg-gray-700" />
                    </div>
                    <div className='flex lg:flex-row w-full flex-col'>
                        <div className="education px-4 md:px-5 mx-auto h-full w-full sm:max-w-[600px] lg:max-w-[400px]">
                            <div className='relative right-4'>
                                {t('educationName')}
                            </div>
                            <ol ref={educationRef}
                                className={`relative top-4 border-s border-gray-200 dark:border-gray-700 transition-all duration-1000 
                                    ${className}`}
                            >
                                <li className="mb-10 ms-6">
                                    <span className="absolute -start-5 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                                        <Image className="w-11 h-11 object-contain rounded-full" src={EducationData.logo} alt="" />
                                    </span>
                                    <div className="items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex dark:bg-gray-700 dark:border-gray-600">
                                        <time className="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0 sm:w-[100px] md:w-[70px] lg:w-[25px]">{EducationData.time}</time>
                                        <div className=" text-sm font-normal text-gray-500 dark:text-gray-300">
                                            <a href={EducationData.link} target='_blank' className="">
                                                <span className="flex flex-col bg-gray-100 text-gray-800 font-semibold text-blue-600 dark:text-blue-500 hover:underline text-xs font-normal me-2 px-2.5 py-0.5 rounded dark:bg-gray-600 dark:text-gray-300">
                                                    <p>{t('education.institution.sakarya_university')}</p>
                                                    <p>{t('education.department.computer_and_information_sciences')}</p>
                                                    <p>{t('education.program.computer_engineering')}</p>
                                                </span>
                                            </a>
                                        </div>
                                    </div>
                                </li>
                            </ol>
                            <div className='relative right-4'>
                                {t('certifications_honors')}
                            </div>
                            <ol ref={certificationsRef} className={`relative top-4 border-s border-gray-200 dark:border-gray-700 ${certificationsInView ? 'animate-fadeInBounceLeft' : 'opacity-0'}`}>
                                <li className="mb-10 ms-6">
                                    <span className="absolute -start-7 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                                        <span className="w-14 h-14 object-contain rounded-full icon-[iconamoon--certificate-badge-light] fill-current text-blue-500 dark:text-white"></span>
                                    </span>
                                    <div className="items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex dark:bg-gray-700 dark:border-gray-600">
                                        <div className=" text-sm font-normal text-gray-500 dark:text-gray-300">
                                            <span className="p-4 flex flex-col gap-y-1 bg-gray-100 text-gray-800 text-xs font-normal me-2 px-2.5 py-0.5 rounded dark:bg-gray-600 dark:text-gray-300">
                                                {CertificationsData.map((item, index) => <p key={index}>{item.description}</p>)}
                                                <p className=''>{t('sosyal_uyum_hackathon')} <a href='https://habitatdernegi.org/' className='text-blue-600 dark:text-blue-500'>{t('habitat_association')}</a></p>
                                            </span>
                                        </div>
                                    </div>
                                </li>
                            </ol>

                            <div className='relative right-4'>
                                {t('interests_hobbies')}
                            </div>
                            <ol
                                ref={interestsRef}
                                className={`relative top-4 border-s border-gray-200 dark:border-gray-700 ${interestsInView ? 'animate-slideInLeft' : 'opacity-0'}`}>
                                <li className="mb-10 ms-6">
                                    <span className="absolute -start-5 -ml-0.5 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                                        <span className="w-11 h-11 object-contain rounded-full icon-[material-symbols-light--interests-outline-rounded] fill-current text-blue-500 dark:text-white"></span>
                                    </span>
                                    <div className="items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex dark:bg-gray-700 dark:border-gray-600">
                                        <div className=" text-sm font-normal text-gray-500 dark:text-gray-300">
                                            <span
                                                className={`p-4 flex flex-col bg-gray-100 text-gray-800 text-xs font-normal me-2 px-2.5 py-0.5 rounded dark:bg-gray-600 dark:text-gray-300 transition-opacity duration-1000 
                                                    `}
                                            >
                                                {InterestsData}
                                            </span>
                                        </div>
                                    </div>
                                </li>
                            </ol>
                        </div>
                        <div className="experiences px-4 md:px-5 lg:px-5 mx-auto h-full w-full max-w-[600px]">
                            <div className='relative right-4'>
                                {t('work_experiences')}
                            </div>
                            <ol className="relative top-4 border-s border-gray-200 dark:border-gray-700">

                                {
                                    ExperiencesData.map((experience, index) => {
                                        return (
                                            <li key={index} className="mb-5 ms-6">
                                                <span className="absolute -start-5 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                                                    <Image className="w-11 h-11 pr-1 object-contain rounded-full" src={experience.logo} alt="" />
                                                </span>
                                                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-700 dark:border-gray-600">
                                                    <div className="items-center justify-between mb-3 sm:flex">
                                                        <time className="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">{experience.time}</time>
                                                        <div className="text-sm font-normal text-gray-500 lex dark:text-gray-300">{experience.position}
                                                            <span className="bg-gray-100 text-gray-800 text-xs font-normal me-2 px-2.5 py-0.5 rounded dark:bg-gray-600 dark:text-gray-300">
                                                                {experience.level}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="p-3 text-xs italic font-normal text-gray-500 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-300">
                                                        <ul className="flex flex-col pl-3 gap-y-1 list-disc">
                                                            {experience.responsibilities.map((responsibility: string, idx) => (
                                                                <AnimatedListItem key={idx} responsibility={responsibility} />
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </li>
                                        );
                                    })
                                }
                            </ol>

                        </div>
                        <div className='languages flex flex-col items-start justify-start px-4 md:px-5 lg:px-5 mx-auto h-full w-full gap-y-4 max-w-[250px]'>
                            <div className='relative right-3'>
                                {t('languages')}
                            </div>
                            <div className="language px-4 md:px-5 lg:px-5 flex lg:flex-col flex-row  items-center justify-center gap-y-4">
                                <div className='flex items-center justify-start gap-x-1'>
                                    <span className="">
                                        <img className="w-7 h-7 rounded-full" src="https://www.worldometers.info/img/flags/sa-flag.gif" alt="" />
                                    </span>
                                    <div className='justify-items-end'>
                                        {t('Arabic')}
                                    </div>
                                </div>
                                <div className='flex items-center justify-start gap-x-1'>
                                    <span className="">
                                        <img className="w-7 h-7 rounded-full" src="https://www.worldometers.info/img/flags/tu-flag.gif" alt="" />
                                    </span>
                                    <div>
                                        {t('Turkish')}
                                    </div>
                                </div>
                                <div className='flex items-center justify-start gap-x-1'>
                                    <span className="">
                                        <img className="w-7 h-7 rounded-full"
                                            width={28}
                                            height={28}
                                            src="https://www.worldometers.info/img/flags/uk-flag.gif" alt="" />
                                    </span>
                                    <div>
                                        {t('English')}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}