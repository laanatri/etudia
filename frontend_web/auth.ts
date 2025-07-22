import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';

interface BackendAuthResponse {
    jwtToken: string;
    id: number;
    username: string;
    email: string;
    firstname: string;
    lastname: string;
    role: string;
}

declare module "next-auth" {
    interface User {
        id: string;
        username: string;
        email: string;
        firstname: string;
        lastname: string;
        role: string;
        jwtToken: string;
    }
    interface Session {
        user: {
            id: string;
            username: string;
            email: string;
            firstname: string;
            lastname: string;
            role: string;
            jwtToken: string;
        }
    }
    interface JWT {
        id: string;
        username: string;
        email: string;
        firstname: string;
        lastname: string;
        role: string;
        jwtToken: string;
    }
}

export const { auth, signIn, signOut, handlers } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                console.log('\n--- authorize callback START ---'); // LOG 1

                const parsedCredentials = z
                    .object({username: z.string(), password: z.string().min(6)})
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const { username, password } = parsedCredentials.data;

                    try {
                        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/generateToken`, {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify({username: username, password: password})
                        })

                        if (!response.ok) {
                            const error = await response.json();
                            console.log("Echec authentification backend : ", error.message); // LOG 2
                            console.log('--- authorize callback END (failed) ---'); // LOG 3
                            return null;
                        }

                        const authResponse: BackendAuthResponse = await response.json();
                        console.log('Backend Auth Response (raw):', authResponse); // LOG 4: Vois-tu 'role' ici?

                        const currentUser = {
                            id: String(authResponse.id),
                            username: authResponse.username,
                            email: authResponse.email,
                            firstname: authResponse.firstname,
                            lastname: authResponse.lastname,
                            role: authResponse.role,
                            jwtToken: authResponse.jwtToken
                        }
                        console.log('currentUser (for NextAuth):', currentUser); // LOG 5: Vois-tu 'role' dans cet objet?
                        console.log('--- authorize callback END (success) ---'); // LOG 6

                        return currentUser;


                    } catch (error) {
                        console.log("Erreur de la requête au backend : ", error);
                        console.log('--- authorize callback END (error) ---'); // LOG 7

                        throw new Error("Echec autentification")
                    }

                }
                console.log('--- authorize callback END (invalid format) ---'); // LOG 8

                console.log("Formats invalide");
                return null;
            }
        })
    ]
});