'use client';

import { useState } from 'react';
import { authenticate } from '../../lib/actions';
import { useSearchParams, useRouter } from 'next/navigation';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Alert from '../ui/Alert';

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
            const error = await authenticate(undefined, formData);
            if (error) {
                setErrorMessage(error);
            } else {
                router.push(callbackUrl);
            }
        } catch (error) {
            setErrorMessage("Une erreur inattendue est survenue.");
        } finally {
            setIsPending(false);
        }

    }

    const checkIfUsername = (value: string) => {
        console.log(value)
        const newIsFill = [...isFill];
        newIsFill[0] = value.length > 0;
        setIsFill(newIsFill);
    }

    const checkIfPassword = (value: string) => {
        console.log(value)
        const newIsFill = [...isFill];
        newIsFill[1] = value.length > 5;
        setIsFill(newIsFill);
    }

    return (
        <form action={handleFormSubmit} className="space-y-3">
            <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
                <div className="w-full">

                    <Input onChange={checkIfUsername} label="Votre pseudo" htmlfor="username" id="username" name="username" type="username" placeHolder="john_doe" error={false} required={true}/>
                    <Input onChange={checkIfPassword} label="Votre mot de passe" htmlfor="password" id="password" name="password" type="password" placeHolder="......" error={false} required={true} minLength={6}/>

                </div>
                <input type="hidden" name="redirectTo" value={callbackUrl} />

                <Button disabled={isFill[0] === true && isFill[1] === true ? false : true} text="Se connecter"/>

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
        </form>
    )
}