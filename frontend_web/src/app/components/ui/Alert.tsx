interface AlertProps {
    type: string; //info, success, warning, error
    picto: React.ReactNode; //
    text: string;
}

// <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
// </svg>

export default function Alert({type, picto, text}: AlertProps) {
    return (
        <div role="alert" className={`alert mt-5 alert-outline ${type}`}>
            {picto}
            <span>{text}</span>
        </div>
    )
}