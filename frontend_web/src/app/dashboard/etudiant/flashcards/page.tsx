"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { Diamond, FileText, Plus } from "lucide-react";
import Link from "next/link";
import Loader from "@/app/components/ui/Loader";
import ModaleFlashcards from "@/app/components/capsules/ModaleFlashcards";
import ExtendedSession from "@/types/ExtendedSession";
import Bloc from "@/types/Bloc";
import fonts from "@/utils/fonts";
import ButtonLink from "@/app/components/ui/ButtonLink";
import FlashcardCard from "@/app/components/capsules/FlashcardCard";

import getBlocs from "@/lib/apiBlocs"

export default function Flashcards() {
    const { data: session, status } = useSession() as { 
        data: ExtendedSession | null; 
        status: string 
    };

    const [blocs, setBlocs] = useState<Bloc[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchBlocs = async () => {
            setLoading(true);
            try {
                const datas = await getBlocs(session);
                setBlocs(datas);
            } catch (error) {


            } finally {
                setLoading(false);
            }
        };
        fetchBlocs();
    }, [session]);

    return (
        <>
            <div className="flex items-baseline justify-between mb-10">
                <h2 className="flex items-center font-fredoka font-medium text-2xl"><Diamond className="mr-2"/> Mes flashcards</h2>
                <ButtonLink classSup="w-fit m-0 bg-base-200 hover:bg-base-300" href="/dashboard/etudiant/cours" text="Mes cours" icon={<FileText />} />
            </div>

            <div className={`relative cards-content grid grid-cols-1 md:grid-cols-3 gap-2 ${fonts.openSans.className}`}>

                {blocs?.length === 0 ? (
                    <Loader isLoading={loading} classSup="relative"/>
                ) : (
                    <>

                        {blocs.map((bloc: Bloc) => (
                            <FlashcardCard key={bloc.id} bloc={bloc} session={session} />
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

            </div>

        </>
    );
}