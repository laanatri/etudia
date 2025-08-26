import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/app/components/layout/Footer";
import Navbar from "@/app/components/layout/Navbar";
import SessionProviderWrapper from "@/app/SessionProviderWrapper";
import { auth } from "../../auth";
import fonts from "./utils/fonts";
import SessionDebug from "@/app/components/layout/SessionDebug";
import { PWAProvider } from "./PWAContext";

export const metadata: Metadata = {
    title: "Etudia",
    description: "Crée, révise et retiens mieux tes cours grâce à l’IA.",
};

export default async function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const session = await auth();
    console.log(session);

    return (
        <html lang="fr" data-theme="etudia">
            <head>
                <link rel="manifest" href="/manifest.json" />

                <meta name="theme-color" content="#ffffff" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta
                    name="apple-mobile-web-app-status-bar-style"
                    content="default"
                />
                <meta name="apple-mobile-web-app-title" content="Etud IA" />
                <meta name="mobile-web-app-capable" content="yes" />

                <meta name="application-name" content="Etud IA" />
                <meta name="mobile-web-app-title" content="Etud IA" />
                <meta name="msapplication-TileColor" content="#A5B4FC" />
                <meta
                    name="msapplication-config"
                    content="/browserconfig.xml"
                />

                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />

                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="/favicon-32x32.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="/favicon-16x16.png"
                />
                <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                    if ('serviceWorker' in navigator) {
                        window.addEventListener('load', function() {
                        navigator.serviceWorker.register('/sw.js')
                            .then(function(registration) {
                            console.log('SW registered: ', registration);
                            })
                            .catch(function(registrationError) {
                            console.log('SW registration failed: ', registrationError);
                            });
                        });
                    }
                    `,
                    }}
                />
            </head>
            <body className={`${fonts.openSans.className} ${fonts.fredoka.className} antialiased`} >
                <PWAProvider>
                    <SessionProviderWrapper session={session}>
                        <Navbar />
                        {children}
                        <Footer />
                    </SessionProviderWrapper>
                </PWAProvider>
            </body>
        </html>
    );
}