import { getQuestions, saveGame } from "@/lib/apiQuizzes";
import QuizType from "@/types/Quiz"
import { useEffect, useState } from "react";
import Loader from "../ui/Loader";
import { Question } from "@/types/Question";
import ExtendedSession from "@/types/ExtendedSession";
import { X } from "lucide-react";
import AnswerCard from "./AnswerCard";

interface ModaleQuizProps {
    quiz?: QuizType;
    session?: ExtendedSession;
    onResult?: (score: number) => void;
    onClose: () => void;
}

export default function ModaleQuiz({quiz, session, onResult, onClose}: ModaleQuizProps) {

    const [questions, setQuestions] = useState<Question[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
    const [questionAnswered, setQuestionAnswered] = useState<boolean>(false);

    const [countQuestionsDone, setCountQuestionsDone] = useState<number>(0);
    const [countSuccessfulQuestions, setCountSuccessfulQuestions] = useState<number>(0);
    const [showResults, setShowResults] = useState<boolean>(false);
    const [result, setResult] = useState<number>(0);

    useEffect(() => {
        setIsLoading(true);

        async function fetchQuestions() {

            if (!quiz || !quiz.id || !session) return;

            try {
                const questionsList = await getQuestions(quiz.id, session);
                setQuestions(questionsList);
            } catch (error) {
                console.log("erreur lors de la récupération des questions", error)
            } finally {
                setIsLoading(false);
            }
        }

        fetchQuestions();

    }, [quiz]);


    const modaleId = `modal_summary_${quiz?.id}`;
    const modaleCardId = `modal-card-${quiz?.id}`;

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

    const handleSendResult = (gameResult: number) => {

        if (!session || !quiz) return;

        try {
            saveGame(gameResult, quiz.id, session);
        } catch (error) {
            console.error("Erreur lors de la récupération des flashcards", error);
        } finally {
            setIsLoading(false);
        }

    }

    const CheckAnswer = (index: number, isCorrect: boolean) => {

       if (questionAnswered) return;
    
        setQuestionAnswered(true);
        setSelectedAnswerIndex(index);

        if (isCorrect) {
            setCountSuccessfulQuestions(prev => prev + 1);
        }

        if (countQuestionsDone < questions.length - 1) {
            setTimeout(() => {
                setCountQuestionsDone(prev => prev + 1);
                setQuestionAnswered(false);
                setSelectedAnswerIndex(null);
            }, 1000);

        } else {

            setIsLoading(true);

            setTimeout(() => {
                const finalScore = Math.round(((countSuccessfulQuestions + (isCorrect ? 1 : 0)) / questions.length) * 100);
                setResult(finalScore);
                setShowResults(true);
                onResult?.(finalScore);

                handleSendResult(finalScore);
            }, 4000)

        }

    }

    return (
        <dialog id={modaleId} className="modal p-0">
            <div id={modaleCardId} className="modal-box bg-base-200 w-11/12 max-w-5xl opacity-0 translate-y-10 transform transition-all duration-500 delay-100 ease-out border border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] text-black">
                <button 
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" 
                    onClick={() => {
                        handleCloseModale();
                        onClose && onClose();
                    }}
                ><X/></button>
                <h3 className="font-bold text-lg">{quiz?.name}</h3>
                <div className="modal-action w-5/6 max-w-lg mx-auto py-10 flex justify-center mt-0">
                    <Loader isLoading={isLoading} classSup="relative rounded-lg"/>
                    {questions?.length === 0 ? (
                        <p>Vous n'avez pas encore créer de quiz.</p>
                    ) : (
                        <>
                            
                            <div className={`question w-full relative transition ease-in-out duration-500 ${!showResults && !isLoading ? "block" : "hidden"}`}>

                                

                                <div className="w-full">
                                    <p className="text-xl text-center mb-10">{questions[countQuestionsDone].text}</p>
                                </div>

                                <div>
                                    {questions[countQuestionsDone].answers.map((answer, index) => (
                                        <AnswerCard key={index} index={index} answer={answer} questionAnswered={questionAnswered} isSelected={selectedAnswerIndex === index} onClick={() => {CheckAnswer(index, answer.isCorrect)}}  />
                                    ))}
                                </div>



                            </div>


                            <div className={`results ${showResults ? "bloc" : "hidden"}`}>
                                <p className="text-center">Résultat : <br /> <span className={`font-bold text-5xl ${result < 50 ? "text-warning" : "text-secondary"}`}>{result.toString()}%</span> <br />de Flashcards retenues</p>

                                <p>Best score : {quiz?.bestScore}</p>
                            </div>
                        </>
                    )}
                </div>

            </div>
        </dialog>
    )

}