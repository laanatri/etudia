interface ButtonProps {
    disabled: boolean;
    text: string;
}

export default function ButtonForm({disabled, text}: ButtonProps) {
    return (
        <button
            type="submit"
            className={`mt-4 mx-auto w-full md:max-w-100 btn btn-accent rounded-full text-xl font-normal text-black border border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] ${disabled ? "btn-disabled" : ""} `}
            aria-disabled={disabled}>
            {text}
        </button>
    )
} 