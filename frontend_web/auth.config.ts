import type { NextAuthConfig } from "next-auth";

export const authConfig = {
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({auth, request: {nextUrl}}) {
            const isLoggedIn = !!auth?.user;
            const userRole = auth?.user?.role

            let baseDashboardPath: string | undefined;
            let defaultDashboardPath: string | undefined;

            switch (userRole) {
                case 'ROLE_ADMIN':
                    baseDashboardPath = '/dashboard/admin';
                    defaultDashboardPath = '/dashboard/admin';
                    break;
                case 'ROLE_ETUDIANT':
                    baseDashboardPath = '/dashboard/etudiant';
                    defaultDashboardPath = '/dashboard/etudiant/accueil';
                    break;
                default:
                    baseDashboardPath = undefined;
                    defaultDashboardPath = undefined;
                    break;
            }

            if (nextUrl.pathname === '/login') {
                if (isLoggedIn) {
                    if (defaultDashboardPath) {
                        return Response.redirect(new URL(defaultDashboardPath, nextUrl));
                    } else {
                        return Response.redirect(new URL('/login', nextUrl));
                    }
                }
                return true;
            }

            if (nextUrl.pathname.startsWith('/dashboard')) {
                if (!isLoggedIn) {
                    return false;
                }

                if (baseDashboardPath && !nextUrl.pathname.startsWith(baseDashboardPath)) {
                    if (defaultDashboardPath) {
                        return Response.redirect(new URL(defaultDashboardPath, nextUrl));
                    } else {
                        return Response.redirect(new URL('/login', nextUrl));
                    }
                }

                if (nextUrl.pathname === baseDashboardPath && defaultDashboardPath) {
                    return Response.redirect(new URL(defaultDashboardPath, nextUrl));
                }

                return true;
            }
            return true;
        },
        async jwt({ token, user, account, profile, trigger, session }) {  // AJOUT: session comme paramètre
            console.log('NEXTAUTH JWT callback - trigger:', trigger);

            // Login initial - user contient les données d'authentification
            if (user) {
                console.log('NEXTAUTH JWT callback - user provided ->', user);
                token.id = String(user.id);
                token.username = user.username;
                token.email = user.email;
                token.firstname = user.firstname;
                token.lastname = user.lastname;
                token.role = user.role;
                token.jwtToken = user.jwtToken;

                console.log('NEXTAUTH JWT callback - user applied, returning token', token);
                return token;
            }

            // Update explicite de session
            if (trigger === 'update') {
                console.log('NEXTAUTH JWT callback - update trigger with session:', session);
                
                // CORRECTION: session?.user contient les données de mise à jour
                if (session?.user) {
                    console.log('NEXTAUTH JWT callback - applying update from session.user');
                    // Copier les propriétés de session.user vers token
                    Object.assign(token, session.user);
                    return token;
                }
                
                // Rafraîchissement des données utilisateur si pas de données explicites
                if (token.id && token.jwtToken) {
                    console.log('NEXTAUTH JWT callback - refreshing user data from API');
                    try {
                        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${token.id}`, {
                            headers: {
                                'Authorization': `Bearer ${token.jwtToken}`,
                                'Content-Type': 'application/json'
                            }
                        });

                        if (response.ok) {
                            const freshUserData = await response.json();
                            console.log('🔄 Données fraîches récupérées:', freshUserData);
                            
                            token.username = freshUserData.username ?? token.username;
                            token.email = freshUserData.email ?? token.email;
                            token.firstname = freshUserData.firstname ?? token.firstname;
                            token.lastname = freshUserData.lastname ?? token.lastname;
                            token.role = freshUserData.role ?? token.role;
                        } else {
                            console.error('🔄 JWT - Erreur récupération données:', response.status);
                        }
                    } catch (error) {
                        console.error('🔄 JWT - Erreur fetch:', error);
                    }
                }
            }

            console.log('NEXTAUTH JWT callback - returning token', token);
            return token;
        },
        async session({ session, token }) {
            console.log('NEXTAUTH SESSION callback - token received ->', token);

            if (token && session.user) {
                session.user.id = token.id as string;
                session.user.username = token.username as string;
                session.user.email = token.email as string;
                session.user.firstname = token.firstname as string;
                session.user.lastname = token.lastname as string;
                session.user.role = token.role as string;
                session.user.jwtToken = token.jwtToken as string;
            }
            console.log('NEXTAUTH SESSION callback - returning session ->', session);
            return session;
        }
    },
    providers: []
} satisfies NextAuthConfig;