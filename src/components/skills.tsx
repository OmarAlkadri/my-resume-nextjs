import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";

interface Skill {
    skillName: string;
    skillValue: number;
    skillGroupName: string;
}

interface SkillGroup {
    groupName: string;
    skills: Skill[];
}

const SkillProgressBar = ({ skillName, progress }: { skillName: string; progress: number }) => {
    const { ref, inView } = useInView({
        threshold: 0.70,
        triggerOnce: false,
    });

    const [animatedProgress, setAnimatedProgress] = useState(0);

    useEffect(() => {
        if (inView) {
            setAnimatedProgress(progress);
        } else {
            setAnimatedProgress(0);
        }
    }, [inView, progress]);

    return (
        <div ref={ref} className="flex flex-col">
            <div className="text-sm">{skillName}</div>
            <div className="flex flex-row items-center gap-x-3">
                <div
                    className="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden dark:bg-neutral-700"
                    role="progressbar"
                    aria-valuenow={animatedProgress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                >
                    <div
                        className="flex flex-col justify-center rounded-full bg-blue-600 text-xs text-white text-center transition-all duration-500 dark:bg-blue-500"
                        style={{ width: `${animatedProgress}%` }}
                    />
                </div>
                <div className="w-10 text-end">
                    <span className="text-sm text-gray-800 dark:text-white">{animatedProgress}%</span>
                </div>
            </div>
        </div>
    );
};

const SkillGroupComponent = ({ groupName, skills }: { groupName: string; skills: Skill[] }) => (
    <div className="flex flex-col w-full max-w-52 pb-2">
        <div className="flex-col justify-start lg:items-start items-start flex gap-1">
            <h1 className="font-manrope text-xs leading-10 dark:text-white">{groupName}</h1>
            <hr className="w-12 h-1 relative bottom-2 bg-black border-0 rounded dark:bg-gray-700" />
        </div>
        {skills.map((skill) => (
            <SkillProgressBar key={skill.skillName} skillName={skill.skillName} progress={skill.skillValue} />
        ))}
    </div>
);

export const Skills = () => {
    const { t } = useTranslation();

    const skillsData: Skill[] = [
        { skillName: t('JavaScript'), skillValue: 85, skillGroupName: t('Programming Languages') },
        { skillName: t('TypeScript'), skillValue: 85, skillGroupName: t('Programming Languages') },
        { skillName: t('C++ / C'), skillValue: 70, skillGroupName: t('Programming Languages') },
        { skillName: t('C# / .NET Core / EF Core'), skillValue: 85, skillGroupName: t('Programming Languages') },
        { skillName: t('Java / Spring Boot'), skillValue: 75, skillGroupName: t('Programming Languages') },
        { skillName: t('Python'), skillValue: 65, skillGroupName: t('Programming Languages') },
        { skillName: t('Kotlin'), skillValue: 70, skillGroupName: t('Programming Languages') },
        { skillName: t('PHP / Laravel'), skillValue: 50, skillGroupName: t('Programming Languages') },

        { skillName: t('React.js'), skillValue: 90, skillGroupName: t('Libraries & Frameworks') },
        { skillName: t('Next.js'), skillValue: 80, skillGroupName: t('Libraries & Frameworks') },
        { skillName: t('NestJS'), skillValue: 90, skillGroupName: t('Libraries & Frameworks') },
        { skillName: t('Express.js'), skillValue: 80, skillGroupName: t('Libraries & Frameworks') },
        { skillName: t('Angular'), skillValue: 75, skillGroupName: t('Libraries & Frameworks') },
        { skillName: t('Vue.js'), skillValue: 50, skillGroupName: t('Libraries & Frameworks') },
        { skillName: t('Blazor'), skillValue: 75, skillGroupName: t('Libraries & Frameworks') },

        { skillName: t('SQL (MSSQL, PostgreSQL, SQLite)'), skillValue: 95, skillGroupName: t('Databases') },
        { skillName: t('MongoDB / MongoDB Atlas'), skillValue: 85, skillGroupName: t('Databases') },
        { skillName: t('Redis'), skillValue: 80, skillGroupName: t('Databases') },

        { skillName: t('Ubuntu Server'), skillValue: 85, skillGroupName: t('Server Tools & Environment') },
        { skillName: t('Docker'), skillValue: 80, skillGroupName: t('Server Tools & Environment') },
        { skillName: t('AWS / AWS Elasticsearch'), skillValue: 65, skillGroupName: t('Server Tools & Environment') },
        { skillName: t('Cloudflare'), skillValue: 70, skillGroupName: t('Server Tools & Environment') },

        { skillName: t('Git / GitHub / GitLab'), skillValue: 100, skillGroupName: t('Develop Tools & Project Management') },
        { skillName: t('Atlassian (Trello, Jira)'), skillValue: 90, skillGroupName: t('Develop Tools & Project Management') },
        { skillName: t('Office 365'), skillValue: 80, skillGroupName: t('Develop Tools & Project Management') },
        { skillName: t('draw.io'), skillValue: 90, skillGroupName: t('Develop Tools & Project Management') },
        { skillName: t('Figma'), skillValue: 75, skillGroupName: t('Develop Tools & Project Management') },
        { skillName: t('Photoshop'), skillValue: 45, skillGroupName: t('Develop Tools & Project Management') },

        { skillName: t('Data Structures'), skillValue: 85, skillGroupName: t('Computer Science Concepts') },
        { skillName: t('Analysis of Algorithms'), skillValue: 85, skillGroupName: t('Computer Science Concepts') },
        { skillName: t('Design Patterns'), skillValue: 85, skillGroupName: t('Computer Science Concepts') },
        { skillName: t('Software Architecture'), skillValue: 85, skillGroupName: t('Computer Science Concepts') },
        { skillName: t('Performance Optimization'), skillValue: 85, skillGroupName: t('Computer Science Concepts') },
        { skillName: t('Troubleshooting'), skillValue: 85, skillGroupName: t('Computer Science Concepts') },

        { skillName: t('Love of Learning'), skillValue: 100, skillGroupName: t('Personal Skills') },
        { skillName: t('Dedicated Team Player'), skillValue: 85, skillGroupName: t('Personal Skills') },
        { skillName: t('Analytical Thinking Skills'), skillValue: 85, skillGroupName: t('Personal Skills') },
        { skillName: t('Attention to Detail'), skillValue: 90, skillGroupName: t('Personal Skills') },
        { skillName: t('Good Listener'), skillValue: 85, skillGroupName: t('Personal Skills') },

        { skillName: t('IOT'), skillValue: 70, skillGroupName: t('Others') },
        { skillName: t('Raspberry Pi'), skillValue: 60, skillGroupName: t('Others') },
        { skillName: t('Arduino'), skillValue: 60, skillGroupName: t('Others') },
        { skillName: t('Data Communications'), skillValue: 45, skillGroupName: t('Others') },
        { skillName: t('Electric Circuit'), skillValue: 35, skillGroupName: t('Others') },
        { skillName: t('PayloadCMS'), skillValue: 65, skillGroupName: t('Others') },
        { skillName: t('Storybook'), skillValue: 80, skillGroupName: t('Others') },
    ];

    const groupedSkills: SkillGroup[] = Object.values(
        skillsData.reduce((acc: { [key: string]: SkillGroup }, skill) => {
            if (!acc[skill.skillGroupName]) {
                acc[skill.skillGroupName] = { groupName: skill.skillGroupName, skills: [] };
            }
            acc[skill.skillGroupName].skills.push(skill);
            return acc;
        }, {})
    );

    return (
        <div className="w-full px-4 md:px-5 lg:px-5 mx-auto">
            <div className="w-full flex-col justify-center lg:items-start items-center gap-10 inline-flex">
                <div className="w-full flex-col justify-center items-start gap-8 flex">
                    <div className="flex-col justify-start lg:items-start items-center gap-4 flex">
                        <h1 className="font-manrope text-gray-400 text-4xl font-bold leading-10">{t("Skills")}</h1>
                        <hr className="w-28 h-1 bg-black border-0 rounded dark:bg-gray-700" />
                    </div>
                    <div className="flex w-full overflow-auto flex-col justify-start items-start flex-wrap h-full max-h-[800px] gap-y-2 gap-x-3">
                        {groupedSkills.map((group) => (
                            <SkillGroupComponent key={group.groupName} groupName={group.groupName} skills={group.skills} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Skills;
