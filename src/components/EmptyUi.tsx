"use client";

import React, { useEffect, useRef } from "react";

import lottie from "lottie-web";
import * as animationData from "../lotties/empty.json";

export default function Empty() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const animation = lottie.loadAnimation({
            container: containerRef.current as Element,
            renderer: "svg",
            loop: true,
            autoplay: true,
            animationData: animationData,
        });

        return () => {
            animation.destroy();
        };
    }, []);

    return (
        <div className="grid place-items-center w-full h-[80vh]">
            <div>
                <div ref={containerRef} style={{ width: 200, height: 200 }} />
                <div className="text-center">
                    <h3 className="text-gray-600 font-bold text-xl mt-2">
                        Empty !
                    </h3>
                </div>
            </div>
        </div>
    );
}
