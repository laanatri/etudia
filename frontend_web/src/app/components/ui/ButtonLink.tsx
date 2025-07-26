import Link from "next/link";

interface ButtonProps {
    href: string;
    text: string;
}

export default function ButtonLink({href, text}: ButtonProps) {
    return (
        <Link href={href} className={`mt-4 mx-auto w-full md:max-w-80 btn btn-primary rounded-full text-xl font-normal`}>
            {text}
        </Link>
    )
}