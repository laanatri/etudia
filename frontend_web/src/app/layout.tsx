import type {Metadata} from "next";
import "./globals.css";
import Footer from "@/app/components/layout/Footer";
import Navbar from "@/app/components/layout/Navbar";
import SessionProviderWrapper from "@/app/SessionProviderWrapper";
import {auth} from "../../auth";
import fonts from "./utils/fonts";


export const metadata: Metadata = {
    title: "Etudia",
    description: "Crée, révise et retiens mieux tes cours grâce à l’IA.",
};

export default async function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {

    const session = await auth();

    return (
        <html lang="fr" data-theme="etudia">
        <body className={`${fonts.openSans.className} ${fonts.fredoka.className} antialiased`}>

            <SessionProviderWrapper session={session}>
                <Navbar/>
                {children}
                <Footer/>
            </SessionProviderWrapper>

        </body>
        </html>
    );
}