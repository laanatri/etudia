interface ButtonProps {
    disabled: boolean;
    text: string;
}

export default function ButtonForm({disabled, text}: ButtonProps) {
    return (
        <button
            type="submit"
            className={`mt-4 mx-auto w-full md:max-w-80 btn btn-accent rounded-full text-xl font-normal ${disabled ? "btn-disabled" : ""} `}
            aria-disabled={disabled}>
            {text}
        </button>
    )
} 