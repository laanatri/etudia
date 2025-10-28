import Quiz from "@/app/dashboard/etudiant/quiz/page";
import ExtendedSession from "@/types/ExtendedSession";
import { Question } from "@/types/Question";
import QuizType from "@/types/Quiz";


const getQuizzes = async (session: ExtendedSession | null): Promise<QuizType[]> => {
    if (!session?.user?.id) return [];

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/quiz/user/${session.user.id}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session.user.jwtToken}`
            }
        }
    );
    if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`HTTP error, status: ${response.status}, body: ${errorBody}`);
    }
    return await response.json();
};



const getQuestions = async (quizId: number, session: ExtendedSession): Promise<Question[]> => {

    if (!session?.user.id || !quizId) return [];

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/question/quiz/${quizId}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session.user.jwtToken}`
            }
        }
    );

    if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`HTTP error, status: ${response.status}, body: ${errorBody}`);
    }

    return await response.json();
}



const saveGame = async (gameResult: number, quizId: number, session: ExtendedSession) => {

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/game/create`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session.user.jwtToken}`
            },
            body: JSON.stringify({
                "score": gameResult,
                "quizId": quizId
            })
        }
        
    );

    const data = response.json
    console.log(data);
    return data;

}

export {getQuizzes, getQuestions, saveGame};