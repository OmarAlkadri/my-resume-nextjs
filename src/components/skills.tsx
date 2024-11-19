import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

export const Skills = () => {
    const [t] = useTranslation();

    const skillsData = [
        { skillName: t('JavaScript'), skillValue: 85, skillGroupName: t('Programming Languages') },
        { skillName: t('TypeScript'), skillValue: 85, skillGroupName: t('Programming Languages') },
        { skillName: t('C++ / C'), skillValue: 80, skillGroupName: t('Programming Languages') },
        { skillName: t('C# / .NET Core / EF Core'), skillValue: 100, skillGroupName: t('Programming Languages') },
        { skillName: t('Java / Spring Boot'), skillValue: 75, skillGroupName: t('Programming Languages') },
        { skillName: t('Python'), skillValue: 65, skillGroupName: t('Programming Languages') },
        { skillName: t('Kotlin'), skillValue: 65, skillGroupName: t('Programming Languages') },
        { skillName: t('PHP / Laravel'), skillValue: 50, skillGroupName: t('Programming Languages') },

        { skillName: t('React.js / Next.js'), skillValue: 97, skillGroupName: t('Libraries & Frameworks') },
        { skillName: t('NestJS'), skillValue: 90, skillGroupName: t('Libraries & Frameworks') },
        { skillName: t('Express.js'), skillValue: 80, skillGroupName: t('Libraries & Frameworks') },
        { skillName: t('Angular'), skillValue: 70, skillGroupName: t('Libraries & Frameworks') },
        { skillName: t('Vue.js'), skillValue: 50, skillGroupName: t('Libraries & Frameworks') },
        { skillName: t('Blazor'), skillValue: 70, skillGroupName: t('Libraries & Frameworks') },

        { skillName: t('SQL (MSSQL, PostgreSQL, SQLite)'), skillValue: 90, skillGroupName: t('Databases') },
        { skillName: t('MongoDB / MongoDB Atlas'), skillValue: 75, skillGroupName: t('Databases') },
        { skillName: t('Redis'), skillValue: 75, skillGroupName: t('Databases') },

        { skillName: t('Ubuntu Server'), skillValue: 80, skillGroupName: t('Server Tools & Environment') },
        { skillName: t('Docker'), skillValue: 85, skillGroupName: t('Server Tools & Environment') },
        { skillName: t('AWS / AWS Elasticsearch'), skillValue: 75, skillGroupName: t('Server Tools & Environment') },
        { skillName: t('Cloudflare'), skillValue: 70, skillGroupName: t('Server Tools & Environment') },

        { skillName: t('Git / GitHub / GitLab'), skillValue: 85, skillGroupName: t('Develop Tools & Project Management') },
        { skillName: t('Atlassian (Trello, Jira)'), skillValue: 70, skillGroupName: t('Develop Tools & Project Management') },
        { skillName: t('Office 365'), skillValue: 70, skillGroupName: t('Develop Tools & Project Management') },
        { skillName: t('draw.io'), skillValue: 90, skillGroupName: t('Develop Tools & Project Management') },
        { skillName: t('Figma'), skillValue: 60, skillGroupName: t('Develop Tools & Project Management') },
        { skillName: t('Photoshop'), skillValue: 45, skillGroupName: t('Develop Tools & Project Management') },

        { skillName: t('Data Structures'), skillValue: 85, skillGroupName: t('Computer Science Concepts') },
        { skillName: t('Analysis of Algorithms'), skillValue: 85, skillGroupName: t('Computer Science Concepts') },
        { skillName: t('Design Patterns'), skillValue: 85, skillGroupName: t('Computer Science Concepts') },
        { skillName: t('Software Architecture'), skillValue: 85, skillGroupName: t('Computer Science Concepts') },
        { skillName: t('Performance Optimization'), skillValue: 85, skillGroupName: t('Computer Science Concepts') },
        { skillName: t('Troubleshooting'), skillValue: 85, skillGroupName: t('Computer Science Concepts') },

        { skillName: t('Love of Learning'), skillValue: 90, skillGroupName: t('Personal Skills') },
        { skillName: t('Dedicated Team Player'), skillValue: 85, skillGroupName: t('Personal Skills') },
        { skillName: t('Analytical Thinking Skills'), skillValue: 85, skillGroupName: t('Personal Skills') },
        { skillName: t('Attention to Detail'), skillValue: 90, skillGroupName: t('Personal Skills') },
        { skillName: t('Good Listener'), skillValue: 95, skillGroupName: t('Personal Skills') },

        { skillName: t('IOT'), skillValue: 50, skillGroupName: t('Others') },
        { skillName: t('Raspberry Pi'), skillValue: 50, skillGroupName: t('Others') },
        { skillName: t('Arduino'), skillValue: 50, skillGroupName: t('Others') },
        { skillName: t('Data Communications'), skillValue: 45, skillGroupName: t('Others') },
        { skillName: t('Electric Circuit'), skillValue: 35, skillGroupName: t('Others') },
        { skillName: t('PayloadCMS'), skillValue: 65, skillGroupName: t('Others') },
        { skillName: t('Storybook'), skillValue: 80, skillGroupName: t('Others') },
    ];

    const [values, setValues] = useState(skillsData.map(() => 0));
    const progressRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const observers: IntersectionObserver[] = [];

        skillsData.forEach((_, index) => {
            const observer = new IntersectionObserver(
                (entries) => {
                    const entry = entries[0];
                    if (entry.isIntersecting) {
                        const interval = setInterval(() => {
                            setValues((prevValues) => {
                                const newValues = [...prevValues];
                                if (newValues[index] < skillsData[index].skillValue) {
                                    newValues[index] += 2;
                                } else {
                                    clearInterval(interval);
                                }
                                return newValues;
                            });
                        }, 75);
                    }
                },
                { threshold: 0.5 }
            );
            if (progressRefs.current[index]) {
                observer.observe(progressRefs.current[index] as HTMLDivElement);
            }
            observers.push(observer);
        });
        return () => {
            observers.forEach((observer, index) => {
                if (progressRefs.current[index]) {
                    observer.unobserve(progressRefs.current[index] as HTMLDivElement);
                }
            });
        };
    }, [skillsData]);

    return (
        <div className="w-full px-4 md:px-5 lg:px-5 mx-auto">
            <div className="w-full flex-col justify-center lg:items-start items-center gap-10 inline-flex">
                <div className="w-full flex-col justify-center items-start gap-8 flex">
                    <div className="flex-col justify-start lg:items-start items-center gap-4 flex">
                        <h1 className="font-manrope text-gray-400 text-4xl font-bold leading-10">{t('Skills')}</h1>
                        <hr className="w-28 h-1 bg-black border-0 rounded dark:bg-gray-700" />
                    </div>
                    <div className="flex w-full overflow-auto flex-col justify-start items-start flex-wrap h-full max-h-[800px] gap-y-2 gap-x-3">
                        {Object.values(skillsData.reduce((acc: any, skill: any) => {
                            const group = acc[skill.skillGroupName] || { groupName: skill.skillGroupName, skills: [] };
                            group.skills.push(skill);
                            acc[skill.skillGroupName] = group;
                            return acc;
                        }, {})).map((group: any) => {
                            return (
                                <div key={group.groupName} className="flex flex-col w-full max-w-52 pb-2">
                                    <div className="flex-col justify-start lg:items-start items-start flex gap-1">
                                        <h1 className="font-manrope text-xs leading-10 dark:text-white">{group.groupName}</h1>
                                        <hr className="w-12 h-1 relative bottom-2 bg-black border-0 rounded dark:bg-gray-700" />
                                    </div>
                                    {group.skills.map((skill: any, index: any) => (
                                        <div key={skill.skillName} className="flex flex-col">
                                            <div className='text-sm'>{skill.skillName}</div>
                                            <div ref={(el: any) => (progressRefs.current[index] = el)} className="flex flex-row items-center gap-x-3">
                                                <div className="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden dark:bg-neutral-700" role="progressbar"
                                                    aria-valuenow={values[index]}
                                                    aria-valuemin={0}
                                                    aria-valuemax={100}>
                                                    <div className="flex flex-col justify-center rounded-full bg-blue-600 text-xs text-white text-center whitespace-nowrap transition duration-500 dark:bg-blue-500"
                                                        style={{ width: `${values[index]}%` }}>
                                                    </div>
                                                </div>
                                                <div className="w-10 text-end">
                                                    <span className="text-sm text-gray-800 dark:text-white">{values[index]}%</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Skills;
