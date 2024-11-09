import {useEffect, useState} from "react";

export function AccountIcon({firstLetterName}){
    const [bgColor, setBgColor] = useState('bg-slate-700');

    const bgColorTailwindcss = [
        "black", "white", "slate", "zinc", "gray", "red", "orange", "amber",
        "yellow", "lime", "green", "emerald", "teal", "cyan", "sky", "blue",
        "indigo", "violet", "purple", "fuchsia", "pink", "rose"
    ];

    /*useEffect(() => {
        let randNumber = Math.floor(Math.random() * bgColorTailwindcss.length);
        console.log(bgColorTailwindcss[randNumber]);
        let classColor = 'bg-' + bgColorTailwindcss[randNumber] + '-700';
        setBgColor(classColor);
    }, []);*/

    return (
        <a
            className={`w-10 h-10 ${bgColor} text-slate-50 rounded-full inline-flex items-center justify-center`}
            href=""
        >
            {firstLetterName}
        </a>
    );
}
