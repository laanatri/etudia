import Bloc from "@/types/Bloc";
import { Star } from "lucide-react";
import { useState } from "react";
import ModaleFlashcards from "./ModaleFlashcards";

interface FlashcardCardProps {
    bloc: Bloc;
    session: any;
}

export default function FlashcardsCard({bloc, session}: FlashcardCardProps) {
    const [isFavorite, setIsFavorite] = useState<boolean>(bloc.isFavorite);
    const [bestScore, setBestScore] = useState<number>(bloc.bestScore)
    const [showModale, setShowModale] =useState<boolean>(false);

    const GoFlashcards = () => {
        setShowModale(true);
    }

    return (
        <div key={bloc.id} className="card bg-base-300 border-2 border-black text-primary-content w-full">
            <div className="card-body text-black py-5 flex flex-col justify-between">
                <div className="flex justify-between mb-2">
                    <h2 className="card-title flex-1 min-w-0 mr-3 truncate">{bloc.name}</h2>
                    <Star width={30} height={30} fill={isFavorite ? "#FFD700" : "none"} onClick={() => setIsFavorite(!isFavorite)} />
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
                    <p className="font-bold text-3xl flex-none">{bestScore}</p>
                </div>
                <button onClick={GoFlashcards} className="mt-2 mx-auto w-full md:max-w-100 btn btn-accent rounded-full text-xl font-normal text-black border border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)]">go !</button>
            </div>
            
            {showModale && (
                <ModaleFlashcards 
                    bloc={bloc} 
                    userToken={session?.user.jwtToken} 
                    onResult={(score: number) => {
                        if (score > bestScore) setBestScore(score)
                    }}
                    onClose={() => setShowModale(false)}
                />
            )}
        </div>
    )
}