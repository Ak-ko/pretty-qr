"use client";

import React, { useEffect, useRef } from "react";

import lottie from "lottie-web";
import * as animationData from "../lotties/qr-loading-lottie.json";

export default function Loader() {
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

    return <div ref={containerRef} style={{ width: 80, height: 80 }} />;
}
