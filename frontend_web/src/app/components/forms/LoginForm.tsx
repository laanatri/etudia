'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Input from '../ui/Input';
import ButtonForm from '../ui/ButtonForm';
import Alert from '../ui/Alert';
import fonts from "../../../utils/fonts";
import Loader from "../ui/Loader";
import { signIn } from "next-auth/react";

export default function LoginForm() {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/dashboard/etudiant/accueil';
    const message = searchParams.get('message');
    const router = useRouter();

    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
    const [successMessage, setSuccessMessage] = useState<string | undefined>(undefined);
    const [isPending, setIsPending] = useState<boolean>(false);
    const [isFill, setIsFill] = useState<boolean[]>([false, false]);

    useEffect(() => {
        if (message) {
            setSuccessMessage(decodeURIComponent(message));
        }
    }, [message]);

    const handleFormSubmit = async (formData: FormData) => {
        setIsPending(true);
        setErrorMessage(undefined);
        setSuccessMessage(undefined);

        try {
            const username = formData.get('username') as string;
            const password = formData.get('password') as string;

            if (!username || !password) {
                setErrorMessage("Veuillez remplir tous les champs");
                setIsPending(false);
                return;
            }

            const result = await signIn('credentials', {
                username: username,
                password: password,
                redirect: false,
            });

            if (result?.ok && !result?.error) {
                setSuccessMessage("Connexion réussie !");
                
                setTimeout(() => {
                    router.push(callbackUrl);
                    router.refresh();
                }, 1000);

            } else {
                
                let errorMsg = "Identifiants incorrects";
                if (result?.error === 'CredentialsSignin') {
                    errorMsg = "Nom d'utilisateur ou mot de passe incorrect";
                } else if (result?.error === 'Configuration') {
                    errorMsg = "Erreur de configuration. Veuillez réessayer.";
                } else if (result?.error) {
                    errorMsg = result.error;
                }
                
                setErrorMessage(errorMsg);
                setIsPending(false);
            }
        } catch (error) {
            console.error('Erreur inattendue:', error);
            setErrorMessage("Une erreur inattendue est survenue. Veuillez réessayer.");
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
                    <Input 
                        onChange={(value) => {checkIfAllFill(value, 0)}} 
                        label="Votre pseudo" 
                        htmlfor="username" 
                        name="username" 
                        type="text" 
                        placeHolder="john_doe" 
                        error={false} 
                        required={true}
                    />
                    <Input 
                        onChange={(value) => {checkIfAllFill(value, 1)}} 
                        label="Votre mot de passe" 
                        htmlfor="password" 
                        name="password" 
                        type="password" 
                        placeHolder="......" 
                        error={false} 
                        required={true} 
                        minLength={6} 
                        isPassword={true}
                    />
                </div>

                <input type="hidden" name="redirectTo" value={callbackUrl} />

                <ButtonForm 
                    disabled={isPending || !(isFill[0] && isFill[1])} 
                    text={isPending ? "Connexion..." : "Se connecter"}
                />

                {successMessage && (
                    <Alert
                        type="alert-success"
                        picto={
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        }
                        text={successMessage}
                    />
                )}

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