interface ButtonProps {
    disabled: boolean;
    text: string;
}

export default function Button({disabled, text}: ButtonProps) {
    return (
        <button
        className={`mt-4 w-full btn btn-accent rounded-full max-w-80 text-xl font-normal ${disabled ? "btn-disabled" : ""} `}
        aria-disabled={disabled}>
            {text}
        </button>
    )
} 