import React, { memo, useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";

const AnimatedListItem = memo(({ children }: { children: React.ReactNode }) => {
    const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: false });

    return (
        <li
            ref={ref}
            className={`transition-opacity duration-1000 ${inView ? 'animate-slideInDown' : 'opacity-0'}`}
        >
            {children}
        </li>
    );
});

export default AnimatedListItem;
