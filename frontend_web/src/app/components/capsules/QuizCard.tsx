import QuizType from "@/types/Quiz";
import { Star } from "lucide-react";
import { useState } from "react";
import ModaleQuiz from "./ModaleQuiz";

interface QuizCardProps {
    quiz: QuizType;
    session: any;
}

export default function QuizCard({quiz, session}: QuizCardProps) {
    const [isFavorite, setIsFavorite] = useState<boolean>(quiz.isFavorite);
    const [bestScore, setBestScore] = useState<number>(quiz.bestScore)
    const [showModale, setShowModale] = useState<boolean>(false);

    const goQuiz = () => {
        setShowModale(true);
    }

    const saveScore = (score: number) => {
        if (score > bestScore) setBestScore(score);
    }

    return (
        <div key={quiz.id} className="card bg-base-300 border-2 border-black text-primary-content w-full">
            <div className="card-body text-black py-5 flex flex-col justify-between">
                <div className="flex justify-between mb-2">
                    <h2 className="card-title flex-1 min-w-0 mr-3 truncate">{quiz.name}</h2>
                    <Star width={30} height={30} fill={isFavorite ? "#FFD700" : "none"} onClick={() => setIsFavorite(!isFavorite)} />
                </div>
                <div className="mb-2">
                    {quiz.themes &&
                        quiz.themes
                            .split(",")
                            .map((theme: string, i: number) => (
                                <p key={i} className="badge badge-primary text-black border-2 border-black py-3 mb-2 mr-2">{theme.trim()}</p>
                            ))}
                </div>
                <div className="flex items-center gap-2">
                    <p className="text-xs leading-4 flex-none mr-5">Votre meilleur <br /><span className="text-2xl font-semibold leading-4">score</span></p>
                    <p className="font-bold text-3xl flex-none">{bestScore}</p>
                </div>
                <button onClick={goQuiz} className="mt-2 mx-auto w-full md:max-w-100 btn btn-accent rounded-full text-xl font-normal text-black border border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)]">go !</button>
            </div>

            {showModale && (
                <ModaleQuiz quiz={quiz} session={session} onResult={saveScore} onClose={() => setShowModale(false)} />
            )}

        </div>
    )

}