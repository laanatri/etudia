"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { Plus } from "lucide-react";
import Link from "next/link";
import Loader from "@/app/components/ui/Loader";
import ModaleFlashcards from "@/app/components/capsules/ModaleFlashcards";
import ExtendedSession from "@/types/ExtendedSession";
import Bloc from "@/types/Bloc";
import fonts from "@/utils/fonts";

export default function Flashcards() {
    const { data: session, status } = useSession() as { 
        data: ExtendedSession | null; 
        status: string 
    };

    const [blocs, setBlocs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [blocSelected, setBlocSelected] = useState<Bloc | null>(null);

    const getBlocs = async (): Promise<void> => {
        try {
            if (!session?.user?.id) return;
            setLoading(true);
            const apiUrl = typeof window !== 'undefined' && window.location.hostname === 'localhost' ? process.env.NEXT_PUBLIC_API_URL : process.env.NEXT_PUBLIC_API_URL_MOBILE;
            const response = await fetch(
                `${apiUrl}/bloc/read/${session.user.id}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${session.user.jwtToken}`
                    }
                }
            );
            if (!response.ok) {
                const errorBody = await response.text();
                throw new Error(`HTTP error, status: ${response.status}, body: ${errorBody}`);
            }
            const datas = await response.json();
            setBlocs(datas);
        } catch (error) {
        } finally {
            setLoading(false);
        }
    };

    const GoFlashcards = (bloc: Bloc) => {
        setBlocSelected(bloc);
    }

    useEffect(() => {
        getBlocs();
    }, [session]);

    useEffect(() => {
        if (blocSelected) {
            const modal = document.getElementById('my_modal_4') as HTMLDialogElement | null;
            modal?.showModal();
        }
    }, [blocSelected]);

    return (
        <>
            <p className="font-fredoka font-medium text-2xl mb-10">Mes flashcards</p>
            <div className={`relative cards-content grid grid-cols-1 md:grid-cols-3 gap-2 ${fonts.openSans.className}`}>
                {blocs?.length === 0 ? (
                    <Loader isLoading={loading} classSup="relative"/>
                ) : (
                    <>
                        {blocs.map((bloc: Bloc) => (
                            <div key={bloc.id} className="card bg-base-300 border-2 border-black text-primary-content w-full">
                                <div className="card-body text-black py-10 flex flex-col justify-between">
                                    <h2 className="card-title mb-5">{bloc.name}</h2>
                                    <div className="card flex-row flex-wrap gap-2 mb-5">
                                        {bloc.themes &&
                                            bloc.themes
                                                .split(",")
                                                .map((theme: string, i: number) => (
                                                    <p key={i} className="badge badge-primary w-1/4 text-black border-2 border-black py-3">{theme.trim()}</p>
                                                ))}
                                    </div>
                                    <button onClick={() => GoFlashcards(bloc)} className="mt-4 mx-auto w-full md:max-w-100 btn btn-accent rounded-full text-xl font-normal text-black border border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)]">go !</button>
                                </div>
                            </div>
                        ))}
                        <div className="card bg-base-100 border-4 border-primary border-dashed text-primary-content w-full">
                            <div className="card-body p-5 flex flex-col justify-between">
                                <div className="card-actions w-full h-full">
                                    <Link href="/dashboard/etudiant/accueil" className="btn btn-base-200 rounded-2xl w-full h-full p-0 text-primary"><Plus height={100} width={"100"}/></Link>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                <ModaleFlashcards bloc={blocSelected ?? undefined} userToken={session?.user.jwtToken} />
            </div>
        </>
    );
}