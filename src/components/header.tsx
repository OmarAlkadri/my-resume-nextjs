import { memo, ReactNode, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Typewriter from "typewriter-effect";

type ElementData = {
    content: string | ReactNode;
    startAnimationClasses: string[];
};

export const Header = () => {
    const { t } = useTranslation();

    const allElements: ElementData[] = [
        { content: t("greeting"), startAnimationClasses: ["animate-slideInLeft", "animate-slideOutRight"] },
        { content: t("welcomeMessage"), startAnimationClasses: ["animate-slideInLeft", "animate-slideOutRight"] },
        { content: t("introMessage"), startAnimationClasses: ["animate-slideInLeft", "animate-slideOutRight"] },
        {
            content: (
                <Typewriter
                    options={{
                        strings: [t("typing1"), t("typing2"), t("typing3"), t("ContactMe")],
                        autoStart: true,
                        loop: true,
                        wrapperClassName: "text-2xl text-white",
                        cursorClassName: "text-red-500",
                        delay: 50,
                    }}
                    onInit={(typewriter) => {
                        typewriter
                            .typeString(t("typing1"))
                            .pauseFor(1000)
                            .deleteAll()
                            .typeString(t("typing2"))
                            .pauseFor(1000)
                            .deleteAll()
                            .typeString(t("typing3"))
                            .pauseFor(1000)
                            .deleteAll()
                            .typeString(`<a href="#contact_my">${t("ContactMe")}</a>`)
                            .pauseFor(1000)
                            .start();
                    }}
                />
            ),
            startAnimationClasses: ["animate-tada", ""],
        },
    ];

    const [elements] = useState<ElementData[]>(allElements);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const fetchVisitorCount = async () => {
            try {
                // Add visitor count fetching logic here if needed.
            } catch (error) {
                console.error("Error fetching visitor count:", error);
            }
        };

        fetchVisitorCount();
    }, []);

    const MyElement = memo(
        ({
            index,
            element,
        }: {
            element: ElementData;
            index: number;
        }) => {
            const [animatingIndex, setAnimatingIndex] = useState(0);
            const handleAnimationEnd = (
                e: React.AnimationEvent<HTMLDivElement>,
                index: number
            ) => {
                setAnimatingIndex(animatingIndex + 1);
                if (elements.length - 1 > index)
                    e.currentTarget.classList.replace(
                        element.startAnimationClasses[animatingIndex],
                        element.startAnimationClasses[animatingIndex + 1]
                    );
                if (element.startAnimationClasses.length == animatingIndex + 1)
                    setActiveIndex(activeIndex + 1);
            };
            const handleAnimationStart = (
                e: React.AnimationEvent<HTMLDivElement>
            ) => {
                if (animatingIndex == 0)
                    e.currentTarget.classList.replace("invisible", "visible");
            };
            return (
                index === activeIndex && (
                    <div
                        key={index}
                        className={`invisible p-5 text-2xl text-white rounded-xl mb-4 transition-opacity duration-1000 
                        ${element.startAnimationClasses[0]}`}
                        onAnimationStart={handleAnimationStart}
                        onAnimationEnd={(e) => handleAnimationEnd(e, index)}
                    >
                        {element.content}
                    </div>
                )
            );
        }
    );
    MyElement.displayName = "MyElement"; // Add this line

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-fixed bg-center bg-cover custom-img">
            {elements.map((element, index) => {
                return (
                    <MyElement key={index} index={index} element={element}>

                    </MyElement>
                );
            })}
        </div>
    );
};
