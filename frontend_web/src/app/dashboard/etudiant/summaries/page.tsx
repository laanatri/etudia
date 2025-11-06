"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import { FileText, ReceiptText } from "lucide-react";
import ButtonLink from "@/app/components/ui/ButtonLink";
import fonts from "@/utils/fonts";
import Summary from "@/types/Summary";
import Loader from "@/app/components/ui/Loader";
import SummaryCard from "@/app/components/capsules/SummaryCard";
import ExtendedSession from "@/types/ExtendedSession";

import { getSummaries } from "@/lib/apiSummaries";

export default function summaries() {
    const { data: session, status } = useSession() as { 
        data: ExtendedSession | null; 
        status: string 
    };

    const [summaries, setSummaries] = useState<Summary[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchBlocs = async () => {
            setLoading(true);
            try {
                const datas = await getSummaries(session);
                setSummaries(datas);
                console.log(datas)
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
                <h2 className="flex items-center font-fredoka font-medium text-2xl"><ReceiptText className="mr-2"/> Mes résumés</h2>
                <ButtonLink classSup="w-fit m-0 bg-base-200 hover:bg-base-300" href="/dashboard/etudiant/cours" text="Mes cours" icon={<FileText />} />
            </div>

            <div className={`relative cards-content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 ${fonts.openSans.className}`}>

                {summaries.length === 0 ? (
                    <Loader isLoading={loading} classSup="relative"/>
                ) : (
                    <>
                    
                        {summaries.map((summary: Summary) => (

                            <SummaryCard key={summary.id} summary={summary} session={session} />

                        ))}
                    
                    </>
                )}


            </div>

        </>
    )
}