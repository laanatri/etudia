import ExtendedSession from "@/types/ExtendedSession"
import Summary from "@/types/Summary"
import { ArrowBigRight, Star } from "lucide-react"
import { useState } from "react"
import ModaleSummary from "./ModaleSummary";

interface SummaryCardProps {
    summary: Summary;
    session: ExtendedSession | null;
}

export default function SummaryCard({summary, session}: SummaryCardProps) {

    const [isFavorite, setIsFavorite] = useState<boolean>(summary.isFavorite);
    const [showModale, setShowModale] =useState<boolean>(false);

    const GoSummaries = () => {
        setShowModale(true);
    }

    return (
        <div key={summary.id} className="card bg-base-200 border-2 border-black text-primary-content w-full">
            <div className="card-body text-black py-5 flex flex-col justify-between">
                <div className="flex justify-between mb-2">
                    <h2 className="card-title flex-1 min-w-0 mr-3 truncate">{summary.name}</h2>
                    <Star width={30} height={30} fill={isFavorite ? "#FFD700" : "none"} onClick={() => setIsFavorite(!isFavorite)} />
                </div>
                <div className="mb-2">
                    {summary.themes &&
                        summary.themes
                            .split(",")
                            .map((theme: string, i: number) => (
                                <p key={i} className="badge badge-primary text-black border-2 border-black py-3 mb-2 mr-2">{theme.trim()}</p>
                            ))}
                </div>
                <button onClick={GoSummaries} className="mt-2 w-fit self-end md:max-w-100 btn btn-accent rounded-full text-xl font-normal text-black border border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)]">LIRE <ArrowBigRight/></button>
            </div>

            {showModale && (
                <ModaleSummary summary={summary} session={session} onClose={() => setShowModale(false)} />
            )}
        </div>
    )
}