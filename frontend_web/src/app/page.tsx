'use client';

import Image from "next/image";
import fonts from "./utils/fonts";
import ButtonLink from "@/app/components/ui/ButtonLink";
import Link from "next/link";

export default function Home() {

    return (

        <main className={`${fonts.openSans.className} ${fonts.fredoka.className} flex flex-col items-center justify-center w-full h-dvh mx-auto bg-primary overflow-hidden`} >
            <div className="relative flex flex-col items-center w-4/5 max-w-96">
                <div className="flex flex-col items-center p-5 pt-7 mb-10 bg-white w-full rounded-xl text-black border border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
                    <div className="flex justify-center mb-3">
                            <Image
                            src="/logo_etudia.png"
                            width={300}
                            height={300}
                            alt="logo Etud ia"
                            className="w-1/2 max-w-60"
                            />
                    </div>
                    <p className="text-center text-xl font-medium mb-2">Bienvenue sur Etud IA</p>
                    <p className="text-center text-sm leading-4.5">Etud IA est une plateforme innovante 
                        qui transforme vos cours en contenus interactifs 
                        pour vous aider à réviser plus efficacement.</p>
                </div>

                <p className="text-center leading-5">Inscrivez-vous dès maintenant pour commencer 
                    à créer vos premières capsules et révolutionner
                    votre apprentissage !</p>
                <ButtonLink href="/register" classSup="bg-accent w-60 mb-10" text="S'inscrire" />
                <p className="text-sm">Déjà inscrit ?</p>
                <Link href="/dashboard" className="underline">Connectez-vous !</Link>

                <div className="absolute top-55 -left-13 -rotate-8 flex flex-col items-center w-15 h-15 p-2 bg-white rounded-md text-black border border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
                    <Image
                    src="/ai.png"
                    width={300}
                    height={300}
                    alt="ai"
                    className="w-auto h-auto max-w-full max-h-full"
                    />
                </div>
                <div className="absolute -top-10 -right-5 -rotate-8 flex flex-col items-center w-15 h-15 p-2 bg-white rounded-md text-black border border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
                    <Image
                    src="/files.png"
                    width={300}
                    height={300}
                    alt="files"
                    className="w-auto h-auto max-w-full max-h-full"
                    />
                </div>
                <div className="absolute bottom-25 -right-13 -rotate-6 flex flex-col items-center w-15 h-15 p-2 bg-white rounded-md text-black border border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
                    <Image
                    src="/quiz.png"
                    width={300}
                    height={300}
                    alt="quiz"
                    className="w-auto h-auto max-w-full max-h-full"
                    />
                </div>
                <div className="absolute bottom-10 -left-18 rotate-8 flex flex-col items-center w-15 h-15 p-2 bg-white rounded-md text-black border border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
                    <Image
                    src="/resumes.png"
                    width={300}
                    height={300}
                    alt="resumes"
                    className="w-auto h-auto max-w-full max-h-full"
                    />
                </div>
                <div className="absolute -bottom-20 right-15 rotate-6 flex flex-col items-center w-15 h-15 p-2 bg-white rounded-md text-black border border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
                    <Image
                    src="/flashcards.png"
                    width={300}
                    height={300}
                    alt="flashcards"
                    className="w-auto h-auto max-w-full max-h-full"
                    />
                </div>
                <div className="absolute -top-30 -left-1 rotate-10 flex flex-col items-center w-15 h-15 p-2 bg-white rounded-md text-black border border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
                    <Image
                    src="/flashcards.png"
                    width={300}
                    height={300}
                    alt="flashcards"
                    className="w-auto h-auto max-w-full max-h-full"
                    />
                </div>

            </div>
        </main>
    );
}