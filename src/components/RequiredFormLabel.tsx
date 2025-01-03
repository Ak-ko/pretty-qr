import React from "react";

interface PropsT {
    label: string;
}

export default function RequiredFormLabel({ label }: PropsT) {
    return (
        <>
            <span>{label}</span>
            <sup className="text-red-500 text-sm ms-[0.5px] translate-y-[5px] inline-block">
                *
            </sup>
        </>
    );
}
