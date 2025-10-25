import type { Metadata } from "next";
import "./globals.css";
import SessionProviderWrapper from "@/app/SessionProviderWrapper";
import { auth } from "../../auth";
import fonts from "@/utils/fonts";

export const metadata: Metadata = {
    title: "Etudia",
    description: "Crée, révise et retiens mieux tes cours grâce à l’IA.",
};

export default async function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const session = await auth();

    return (
        <html lang="fr" data-theme="etudia">
            <head>
                <title>Etud IA</title>
                <meta name="description" content="Crée, révise et retiens mieux tes cours grâce à l’IA."/>
                <link rel="icon" href="/icon_etudia.png" type="image/x-icon"/>
                <meta charSet="UTF-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
            </head>
            <body className={`${fonts.openSans.className} ${fonts.fredoka.className} antialiased`} >
                    <SessionProviderWrapper session={session}>
                        {children}
                    </SessionProviderWrapper>
            </body>
        </html>
    );
}