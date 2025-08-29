import Link from "next/link";

interface ButtonProps {
    href: string;
    text: string;
}

export default function ButtonLink({href, text}: ButtonProps) {
    return (
        <Link href={href} className={`mt-4 mx-auto w-full md:max-w-100 btn btn-primary rounded-full text-xl font-normal text-black border border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)]`}>
            {text}
        </Link>
    )
}