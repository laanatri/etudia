'use client';

import ExtendedSession from "@/types/ExtendedSession";
import Summary from "@/types/Summary";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { sanitizeJsx } from "@/utils/sanitizeJsx";



import { getSummary } from "@/lib/apiSummaries";


interface ModaleSummaryProps {
    summary?: Summary;
    session?: ExtendedSession | null;
    onClose: () => void;
}

export default function ModaleSummary({summary, session, onClose}: ModaleSummaryProps) {

    const [summaryContent, setSummaryContent] = useState<React.ReactNode | null>(null);


    const modaleId = `modal_summary_${summary?.id}`;
    const modaleCardId = `modal-card-${summary?.id}`;

    useEffect(() => {
        const modal = document.getElementById(modaleId) as HTMLDialogElement | null;
        const modalCard = document.getElementById(modaleCardId) as HTMLDialogElement | null;

        if (modal) {
            modal.showModal();
            modalCard?.classList.remove("opacity-0", "translate-y-10");
            modalCard?.classList.add("opacity-100", "translate-y-0", "transform");
        }
    }, [modaleId, modaleCardId]);

    const handleCloseModale = () => {

        const modal = document.getElementById(modaleId) as HTMLDialogElement | null;
        const modalCard = document.getElementById(modaleCardId) as HTMLDialogElement | null;

        if (modal) {
            modalCard?.classList.remove("opacity-100", "translate-y-0");
            modalCard?.classList.add("opacity-0", "translate-y-10", "transform");
            setTimeout(() => {

                modal.close();

            }, 500);
        }
    }

    useEffect(() => {
        if (!summary) {
            return;
        }
        async function getSummaryContent(summary: Summary) {
            const summaryContent = await getSummary(summary.summaryUrl);
            setSummaryContent(summaryContent);
        }
        getSummaryContent(summary);

    }, [summary])

    return (
        <dialog id={modaleId} className="modal p-0">
            <div id={modaleCardId} className="modal-box bg-base-200 text-black w-11/12 max-w-5xl opacity-0 translate-y-10 transform transition-all duration-500 delay-100 ease-out">
    
                    <button 
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" 
                        onClick={() => {
                            handleCloseModale();
                            onClose && onClose();
                        }}
                    ><X/></button>

                <h3 className="font-bold text-lg">{summary?.name}</h3>
                <div className="modal-action py-10 flex justify-center mt-0">
 
                        {summaryContent ? (
                            <div className="overflow-y-scroll summmary-style">
                                <p className="text-md text-justify" dangerouslySetInnerHTML={{__html: sanitizeJsx(summaryContent)}} />
                            </div>
                        ) : (
                            <p>Chargement du résumé</p>
                        )}

                </div>
            </div>
        </dialog>
    )
}