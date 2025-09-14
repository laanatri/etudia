import Bloc from "@/types/Bloc";
import { Heart } from "lucide-react";

interface FlashcardCardProps {
    bloc: Bloc;
    onClick: any;
}

export default function FlashcardsCard({bloc, onClick}: FlashcardCardProps) {
    return (
        <div key={bloc.id} className="card bg-base-300 border-2 border-black text-primary-content w-full">
            <div className="card-body text-black py-5 flex flex-col justify-between">
                <div className="flex justify-between mb-2">
                    <h2 className="card-title min-w-0 max-w-full mr-5 truncate">{bloc.name}</h2>
                    <Heart width={20} height={20} />
                </div>
                <div className="mb-2">
                    {bloc.themes &&
                        bloc.themes
                            .split(",")
                            .map((theme: string, i: number) => (
                                <p key={i} className="badge badge-primary text-black border-2 border-black py-3 mb-2 mr-2">{theme.trim()}</p>
                            ))}
                </div>
                <div className="flex items-center gap-2">
                    <p className="text-xs leading-4 flex-none mr-5">Votre meilleur <br /><span className="text-2xl font-semibold leading-4">score</span></p>
                    <p className="font-bold text-3xl flex-none">70%</p>
                </div>
                <button onClick={onClick} className="mt-2 mx-auto w-full md:max-w-100 btn btn-accent rounded-full text-xl font-normal text-black border border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)]">go !</button>
            </div>
        </div>
    )
}