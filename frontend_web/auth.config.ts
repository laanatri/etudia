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




            console.log('\n--- Middleware Auth Debug ---');
            console.log('isLoggedIn:', isLoggedIn);
            console.log('User Role (as seen by middleware):', userRole); // <-- C'EST ÇA QU'IL FAUT VOIR !
            console.log('Current Pathname:', nextUrl.pathname);



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
        async jwt({ token, user, account, profile }) {




            console.log('\n--- JWT callback START ---'); // LOG 9
            console.log('JWT - Initial token:', token);
            console.log('JWT - User from authorize (should have role):', user); // LOG 10: Le rôle est-il ici?
            console.log('JWT - Account:', account);
            console.log('JWT - Profile:', profile);





            if (user) {
                token.id = user.id;
                token.username = user.username;
                token.email = user.email;
                token.firstname = user.firstname;
                token.lastname = user.lastname;
                token.role = user.role;
                token.jwtToken = user.jwtToken;
            }


            console.log('JWT - Final token (after processing user):', token); // LOG 11: Le rôle est-il dans token maintenant?
            console.log('--- JWT callback END ---'); // LOG 12



            return token;
        },
        async session({ session, token }) {





            console.log('\n--- Session callback START ---'); // LOG 13
            console.log('Session - Initial session:', session);
            console.log('Session - Token (should have role):', token); // LOG 14: Le rôle est-il dans token?




            if (token && session.user) {
                session.user.id = token.id as string;
                session.user.username = token.username as string;
                session.user.email = token.email as string;
                session.user.firstname = token.firstname as string;
                session.user.lastname = token.lastname as string;
                session.user.role = token.role as string;
                session.user.jwtToken = token.jwtToken as string;
            }



            console.log('Session - Final session.user:', session.user); // LOG 15: Le rôle est-il dans session.user maintenant?
            console.log('--- Session callback END ---'); // LOG 16

            

            return session;
        }
    },
    providers: []
} satisfies NextAuthConfig;