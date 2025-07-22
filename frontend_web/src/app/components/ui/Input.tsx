interface InputProps {
    label: string;
    htmlfor: string;
    id: string;
    name: string;
    type: string;
    placeHolder: string;
    legend?: string;
    error: boolean;
    required?: boolean;
    minLength?: number;
    onChange: (value: string) => void;
    value?: string | number;
}

export default function Input({label, htmlfor, id, name, type, placeHolder, legend, error, required, minLength, onChange, value}: InputProps) {
    return (
        <fieldset className="fieldset">
            <label 
                htmlFor={htmlfor}
                className="fieldset-legend"
            >{label}</label>
            <input 
                id={id} 
                name={name} 
                type={type} 
                required={required} 
                className={`input input-lg w-full ${error ? "input-error" : "input-accent"}`} 
                placeholder={placeHolder} 
                minLength={minLength}
                onChange={(e) => onChange(e.target.value)}
                value={value}
            />
            <p 
                className="label"
            >{legend}</p>
        </fieldset>
    )
}