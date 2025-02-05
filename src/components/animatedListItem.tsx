import React, { memo, useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";

const AnimatedListItem = ({ responsibility }: { responsibility: string }) => {
    const { ref, inView } = useInView({ threshold: 1, triggerOnce: false });

    return (
        <li
            ref={ref}
            className={`transition-opacity duration-1000 ${inView ? 'animate-slideInDown' : 'opacity-0'}`}
        >
            {responsibility}
        </li>
    );
};

export default AnimatedListItem;
