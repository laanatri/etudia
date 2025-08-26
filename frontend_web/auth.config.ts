import type { NextAuthConfig } from "next-auth";

export const authConfig = {
    secret: process.env.AUTH_SECRET,
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
        async jwt({ token, user, account, profile, trigger }) {

            if (user) {
                token.id = user.id;
                token.username = user.username;
                token.email = user.email;
                token.firstname = user.firstname;
                token.lastname = user.lastname;
                token.role = user.role;
                token.jwtToken = user.jwtToken;
            }

            if (trigger === 'update' && token.id && token.jwtToken) {

                try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${token.id}`, {
                        headers: {
                            'Authorization': `Bearer ${token.jwtToken}`,
                            'Content-Type': 'application/json'
                        }
                    });

                    if (response.ok) {
                        const freshUserData = await response.json();

                        token.username = freshUserData.username;
                        token.email = freshUserData.email;
                        token.firstname = freshUserData.firstname;
                        token.lastname = freshUserData.lastname;
                        token.role = freshUserData.role;

                    } else {
                        console.error('🔄 JWT - Erreur lors de la récupération des données:', response.status);
                    }
                } catch (error) {
                    console.error('🔄 JWT - Erreur lors de la récupération des données fraîches:', error);
                }
            }

            return token;
        },
        async session({ session, token }) {

            if (token && session.user) {
                session.user.id = token.id as string;
                session.user.username = token.username as string;
                session.user.email = token.email as string;
                session.user.firstname = token.firstname as string;
                session.user.lastname = token.lastname as string;
                session.user.role = token.role as string;
                session.user.jwtToken = token.jwtToken as string;
            }

            return session;
        }
    },
    providers: []
} satisfies NextAuthConfig;