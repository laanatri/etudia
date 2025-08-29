'use server';

import {signIn} from "../../auth";
import { AuthError } from 'next-auth';

export async function authenticate(prevState: string | undefined, formData: FormData): Promise<string | undefined> {
    try {
        await signIn('credentials', {
            ...Object.fromEntries(formData),
            redirect: false
        });
        return undefined;
    } catch (error: any) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return (error.cause && error.cause instanceof Error && error.cause.message) ? error.cause.message : 'Identifiants invalides.';
                default:
                    return 'Une autre erreur.';
            }
        }
        console.error(error);
        throw "erreur inconnue";
    }
}