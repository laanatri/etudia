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
            name: "credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {

                const parsedCredentials = z
                    .object({username: z.string(), password: z.string().min(6)})
                    .safeParse(credentials);

                if (!parsedCredentials.success) {
                    console.log('🔍 Validation des credentials échouée');
                    return null;
                }

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
                        return null;
                    }

                    const authResponse: BackendAuthResponse = await response.json();

                    const currentUser = {
                        id: String(authResponse.id),
                        username: authResponse.username,
                        email: authResponse.email,
                        firstname: authResponse.firstname,
                        lastname: authResponse.lastname,
                        role: authResponse.role,
                        jwtToken: authResponse.jwtToken
                    }

                    return currentUser;
                } catch (error) {
                    throw new Error("Echec autentification")
                }
            }
        })
    ]
});