import { Answer } from "@/types/Question";
import { Check, X } from "lucide-react";

interface AnswerCardProps {
    index: number;
    answer: Answer;
    questionAnswered: boolean;
    isSelected: boolean;
    onClick: () => void;
}

export default function AnswerCard({index, answer, questionAnswered, isSelected, onClick}: AnswerCardProps) {

    const borders = () => {
        if (!questionAnswered) return "border-black";
        if(answer.isCorrect) return "border-success";
        return "border-error";
    }

    return (
        <div 
            key={index}
            onClick={onClick} 
            className={`flex py-3 px-4 w-full border-2 mb-5 rounded-md bg-base-200 transition-all relative
                ${!questionAnswered ? "cursor-pointer" : "cursor-default"}
                ${borders()}
                ${isSelected && questionAnswered ? "border-4" : "border-2"}
            `}
        >
            {questionAnswered && (
                <div className="ml-3">
                    {answer.isCorrect ? (
                        <Check className="text-success" size={24} strokeWidth={3} />
                    ) : (
                        <X className="text-error" size={24} strokeWidth={3} />
                    )}
                </div>
            )}
            <p>{answer.text}</p>
        </div>
    )
}