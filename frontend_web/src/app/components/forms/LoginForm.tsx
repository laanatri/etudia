'use client';

import { useState } from 'react';
import { authenticate } from '../../lib/actions';
import { useSearchParams, useRouter } from 'next/navigation';
import Input from '../ui/Input';
import ButtonForm from '../ui/ButtonForm';
import Alert from '../ui/Alert';
import fonts from "./../../utils/fonts";
import Loader from "../ui/Loader";


export default function LoginForm() {

    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
    const router = useRouter();

    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
    const [isPending, setIsPending] = useState<boolean>(false);
    const [isFill, setIsFill] = useState<boolean[]>([false, false]);

    const handleFormSubmit = async (formData: FormData) => {
        setIsPending(true);
        setErrorMessage(undefined);

        try {
            const [authResult] = await Promise.all([
                authenticate(undefined, formData),
                new Promise(resolve => setTimeout(resolve, 1000)) // 1 seconde minimum
            ]);
            if (authResult) {
                setErrorMessage(authResult);
                setIsPending(false);
            } else {
                router.push(callbackUrl);
            }
        } catch (error) {
            setErrorMessage("Une erreur inattendue est survenue.");
            setIsPending(false);
        }
    }

    const checkIfAllFill = (value: string, index: number) => {
        const newIsFill = [...isFill];
        if (index === 1) {
            newIsFill[1] = value.length > 5;
        } else {
            newIsFill[index] = value.length > 0;
        }
        setIsFill(newIsFill);
    }

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            handleFormSubmit(formData);
        }} className={`${fonts.openSans.className} space-y-3 w-full`}>
            <div className="py-4">
                <div className="w-full">

                    <Input onChange={(value) => {checkIfAllFill(value,0)}} label="Votre pseudo" htmlfor="username" name="username" type="username" placeHolder="john_doe" error={false} required={true}/>
                    <Input onChange={(value) => {checkIfAllFill(value,1)}} label="Votre mot de passe" htmlfor="password" name="password" type="password" placeHolder="......" error={false} required={true} minLength={6} isPassword={true}/>

                </div>
                <input type="hidden" name="redirectTo" value={callbackUrl} />

                <ButtonForm disabled={isPending || !(isFill[0] && isFill[1])} text="Se connecter"/>

                {errorMessage && (
                    <Alert
                        type="alert-error" 
                        picto={
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        } 
                        text={errorMessage}
                    />
                )}
            </div>
            <Loader isLoading={isPending}/>
        </form>
    )
}