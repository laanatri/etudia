'use client';

import {Eye, EyeClosed} from "lucide-react";
import {useEffect, useState} from "react";

interface InputProps {
    label: string;
    htmlfor: string;
    name: string;
    type: string;
    placeHolder: string;
    legend?: string;
    error: boolean;
    required?: boolean;
    minLength?: number;
    onChange: (value: string) => void;
    value?: string | number;
    isPassword?: boolean;
}

export default function Input({label, htmlfor, name, type, placeHolder, legend, error, required, minLength, onChange, value, isPassword}: InputProps) {


    const [showPassword, setShowPassword] = useState(false);

    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

    return (
        <fieldset className="fieldset pb-3">
            <label 
                htmlFor={htmlfor}
                className="fieldset-legend text-md pt-0 pb-1"
            >{label}</label>
            <div className="relative">
                <input
                    name={name}
                    type={inputType}
                    required={required}
                    className={`input input-md w-full ${error ? "input-error" : "input-accent"}`}
                    placeholder={placeHolder}
                    minLength={minLength}
                    onChange={(e) => onChange(e.target.value)}
                    value={value}
                />
                {isPassword && (
                    <div className="absolute right-3 top-3.5 z-2" onClick={() => {showPassword ? setShowPassword(false) : setShowPassword(true)}}>
                        {showPassword ? <Eye width={20}/> : <EyeClosed width={20}/>}
                    </div>
                )}
            </div>

            <p 
                className="label"
            >{legend}</p>
        </fieldset>
    )
}