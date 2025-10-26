import {useEffect, useState} from "react";
import {ArrowBigRightDash, Check, X} from "lucide-react";
import Loader from "@/app/components/ui/Loader";
import Image from "next/image";
import Bloc from "@/types/Bloc";
import Flashcard from "@/types/Flashcard";
import { number } from "zod";
import { asyncWrapProviders } from "node:async_hooks";

type ModaleFlashcardsProps = {
    bloc?: Bloc;
    userToken?: string;
    onResult?: (score: number) => void;
    onClose: () => void;
}

export default function ModaleFlashcards({ bloc, userToken, onResult, onClose }: ModaleFlashcardsProps ) {

    const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [cardFliped, setCardFliped] = useState<boolean>(false);

    const [countFlashcardsDone, setCountFlashcardsDone] = useState<number>(0);
    const [countSuccessfulFlashcards, setCountSuccessfulFlashcards] = useState<number>(0);
    const [showResults, setShowResults] = useState<boolean>(false);
    const [result, setResult] = useState<number>(0);

    const getFlashcards = async () => {
        setIsLoading(true);

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/flashcard/bloc/${bloc?.id}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${userToken}`
                    }
                }
            );

            const datas = await response.json();
            setFlashcards(datas);

            const modal = document.getElementById('my_modal_4') as HTMLDialogElement | null;
            const modalCard = document.getElementById('modal-card') as HTMLDialogElement | null;

            if (modal) {
                modal?.showModal();
                modalCard?.classList.remove("opacity-0", "translate-y-10");
                modalCard?.classList.add("opacity-100", "translate-y-0", "transform");
            }

        } catch (error) {
            console.error("Erreur lors de la récupération des flashcards", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFlipCard = () => {
        cardFliped ? setCardFliped(false) : setCardFliped(true);
    }

    const handleSendResult = async (readingResult: number) => {

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/reading/create`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${userToken}`
                    },
                    body: JSON.stringify({
                        "score": readingResult,
                        "blocId": bloc?.id
                    })
                }
            );

            const data = response.json
            console.log(data)


        } catch (error) {
            console.error("Erreur lors de la récupération des flashcards", error);
        } finally {
            setIsLoading(false);
        }

    }



    

    const handleNextFlashcard = (success: boolean) => {

        if (countFlashcardsDone < flashcards.length - 1) {
            
            // Next card
            handleFlipCard();
            setTimeout(() => {

                setCountFlashcardsDone(countFlashcardsDone + 1);
                success && setCountSuccessfulFlashcards(countSuccessfulFlashcards + 1);

            }, 200)
        } else {

            // Fin de partie
            setIsLoading(true);
            setCountFlashcardsDone(countFlashcardsDone + 1);

            setTimeout(() => {

                const finalSuccessCount = success ? countSuccessfulFlashcards + 1 : countSuccessfulFlashcards;
                const newValue = Math.round((countSuccessfulFlashcards * 100) / flashcards.length);

                setCountSuccessfulFlashcards(finalSuccessCount);
                setResult(newValue);
                handleSendResult(newValue);

                setShowResults(true);
                setIsLoading(false);

            }, 2000)
        }

    }

    const handleCloseModale = () => {

        const modal = document.getElementById("my_modal_4") as HTMLDialogElement | null;
        const modalCard = document.getElementById("modal-card") as HTMLDialogElement | null;

        if (modal) {
            modalCard?.classList.remove("opacity-100", "translate-y-0");
            modalCard?.classList.add("opacity-0", "translate-y-10", "transform");
            setTimeout(() => {

                modal.close();
                setCardFliped(false);
                setCountFlashcardsDone(0);
                setCountSuccessfulFlashcards(0);
                setShowResults(false);

            }, 500);
        }
    }


    

    useEffect(() => {
        if (!bloc || !bloc.id) return;
        setCardFliped(false);
        getFlashcards();
    }, [bloc]);

    useEffect(() => {
        console.log(countFlashcardsDone)
        console.log(countSuccessfulFlashcards)
    }, [countFlashcardsDone]);

    useEffect(() => {
        if (showResults && onResult) {
            onResult(result)
        }
    }, [showResults])

    if (!bloc) return null;

    return (
        <dialog id="my_modal_4" className="modal p-0">
            <div id="modal-card" className="modal-box bg-base-200 w-11/12 max-w-5xl opacity-0 translate-y-10 transform transition-all duration-500 delay-100 ease-out">
                <form method="dialog">
                    <button 
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" 
                        onClick={() => {
                            handleCloseModale();
                            onClose && onClose();
                        }}
                    ><X/></button>
                </form>
                <h3 className="font-bold text-lg">{bloc.name}</h3>
                <div className="modal-action py-10 flex justify-center mt-0">
                    <Loader isLoading={isLoading} classSup="relative rounded-lg"/>
                    {flashcards?.length === 0 ? (
                        <p>Vous n'avez pas encore créer de flashcards.</p>
                    ) : (
                        <>
                            
                            <div className={`flashcard relative transition ease-in-out duration-500 ${!showResults && !isLoading ? "block" : "hidden"}`} style={{perspective: "1000px", transformStyle: "preserve-3d", transform: cardFliped ? "rotateY(180deg)" : "rotateY(0deg)"}}>
                                <div className="card rounded-lg bg-secondary border-2 border-black text-black w-96 h-100  mx-auto backface-hidden">
                                    <div className="card-body flex justify-center items-center text-center p-5">
                                        <p className="grow-0 text-xl text-balance">{flashcards[countFlashcardsDone]?.question}</p>
                                    </div>
                                    <Image
                                        src="/lines.svg"
                                        alt="Lines"
                                        width={400}
                                        height={400}
                                        className="absolute opacity-50 w-13/15 left-1/2 top-[53%] -translate-x-1/2 -translate-y-1/2"
                                    />
                                </div>
                                <div className="card rounded-lg bg-secondary border-2 border-black text-black mx-auto absolute top-0 left-0 w-full h-full backface-hidden rotate-y-180">
                                    <div className="card-body relative flex-col items-center justify-center text-center">
                                        <p className="grow-0 text-lg text-balance">{flashcards[countFlashcardsDone]?.answer}</p>
                                        <div className="absolute bottom-5 card-actions justify-end">
                                            <button className="btn btn-secondary text-black -rotate-15" onClick={() => handleNextFlashcard(true)}><Check height={40} width={40}/></button>
                                            <button className="btn btn-secondary text-black rotate-15" onClick={() => handleNextFlashcard(false)}><X height={40} width={40}/></button>
                                        </div>
                                    </div>
                                    <Image
                                        src="/lines.svg"
                                        alt="Lines"
                                        width={400}
                                        height={400}
                                        className="absolute opacity-50 w-13/15 left-1/2 top-[53%] -translate-x-1/2 -translate-y-1/2"
                                    />
                                </div>
                                <div className="absolute top-2 right-2 cursor-pointer text-black" onClick={handleFlipCard}><ArrowBigRightDash height={40} width={40} /></div>
                            </div>


                            <div className={`results ${showResults ? "bloc" : "hidden"}`}>
                                <p className="text-center">Résultat : <br /> <span className={`font-bold text-5xl ${result < 50 ? "text-warning" : "text-secondary"}`}>{result.toString()}%</span> <br />de Flashcards retenues</p>

                                <p>Best score : {bloc.bestScore}</p>
                            </div>
                        </>
                    )}
                </div>
                <div className="flex justify-center flex-wrap gap-2">
                    {flashcards.map((_, index) => (
                        <div className={`dot w-5 h-7 bg-primary rounded-md transform transition-all duration-300 ease-out ${index <= countFlashcardsDone - 1 ? "rotate-10 scale-100" : "-rotate-10 scale-60"}`} key={index}></div>
                    ))}
                </div>
            </div>
        </dialog>
    )
}