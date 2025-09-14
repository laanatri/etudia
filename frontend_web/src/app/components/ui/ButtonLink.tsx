import Link from "next/link";
import { ReactElement } from "react";

interface ButtonProps {
    href: string;
    text: string;
    icon?: ReactElement<any, any>;
    classSup?: string;
}

export default function ButtonLink({href, text, icon, classSup}: ButtonProps) {
    return (
        <Link href={href} className={`mt-4 mx-auto md:max-w-100 btn btn-primary rounded-full text-xl font-normal text-black border border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] ${classSup ? classSup : "w-full"}`}>
            {icon && icon}
            {text}
        </Link>
    )
}