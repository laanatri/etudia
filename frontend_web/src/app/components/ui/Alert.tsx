interface AlertProps {
    type: string; //info, success, warning, error
    picto?: React.ReactNode;
    text: string;
}

export default function Alert({type, picto, text}: AlertProps) {
    return (
        <div role="alert" className={`alert border-2 border-black mt-5 ${type}`}>
            {picto}
            <span>{text}</span>
        </div>
    )
}