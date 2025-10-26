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
            // Remplacer la fonction authorize par cette version avec plus de logs:

            async authorize(credentials) {
                // console.log('🔑 authorize: début de la fonction', credentials?.username);
                
                const parsedCredentials = z
                    .object({username: z.string(), password: z.string().min(6)})
                    .safeParse(credentials);

                if (!parsedCredentials.success) {
                    console.log('🔍 Validation des credentials échouée', parsedCredentials.error.message);
                    return null;
                }

                const { username, password } = parsedCredentials.data;
                console.log(`🔑 authorize: tentative de connexion pour ${username}`);

                try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/generateToken`, {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify({username: username, password: password})
                    });
                    
                    // Lire le body en texte d'abord pour le logger
                    const responseText = await response.text();
                    // console.log('🔑 Backend response status:', response.status);
                    // console.log('🔑 Backend response body:', responseText);
                    
                    if (!response.ok) {
                        console.warn(`🔑 Backend error: ${response.status} - ${responseText}`);
                        return null;
                    }

                    // Parse le JSON seulement si on a du contenu
                    if (!responseText) {
                        console.error('🔑 Backend returned empty response');
                        return null;
                    }

                    try {
                        const authResponse = JSON.parse(responseText);
                        
                        // Vérifier que toutes les propriétés attendues sont présentes
                        // console.log('🔑 Auth response parsed:', authResponse);
                        if (!authResponse.id || !authResponse.username || !authResponse.jwtToken) {
                            console.error('🔑 Réponse backend incomplète:', authResponse);
                            return null;
                        }

                        const currentUser = {
                            id: String(authResponse.id),
                            username: authResponse.username,
                            email: authResponse.email,
                            firstname: authResponse.firstname,
                            lastname: authResponse.lastname,
                            role: authResponse.role,
                            jwtToken: authResponse.jwtToken
                        };
                        
                        // console.log('🔑 User object created:', currentUser);
                        return currentUser;
                    } catch (parseError) {
                        console.error('🔑 JSON parse error:', parseError);
                        return null;
                    }
                } catch (error) {
                    console.error("🔑 Fetch error:", error);
                    return null;
                }
            }

        })
    ]
});