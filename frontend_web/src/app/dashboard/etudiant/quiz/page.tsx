"use client";

import ButtonLink from "@/app/components/ui/ButtonLink";
import ExtendedSession from "@/types/ExtendedSession";
import { CircleQuestionMark, FileText, Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import QuizType from "@/types/Quiz";
import { getQuizzes } from "@/lib/apiQuizzes";
import Loader from "@/app/components/ui/Loader";
import Link from "next/link";
import QuizCard from "@/app/components/capsules/QuizCard";
import fonts from "@/utils/fonts";

export default function Quiz() {
    const { data: session, status } = useSession() as { 
        data: ExtendedSession | null; 
        status: string 
    };

    const [quizzes, setQuizzes] = useState<QuizType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchBlocs = async () => {
            setLoading(true);
            try {
                const datas = await getQuizzes(session);
                setQuizzes(datas);
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
                <h2 className="flex items-center font-fredoka font-medium text-2xl mb-10"><CircleQuestionMark className="mr-2 stroke-3" /> Mes quiz</h2>
                <ButtonLink classSup="w-fit m-0 bg-base-200 hover:bg-base-300" href="/dashboard/etudiant/cours" text="Mes cours" icon={<FileText />} />
            </div>

            <div className={`relative cards-content grid grid-cols-1 md:grid-cols-3 gap-2 ${fonts.openSans.className}`}>

                {quizzes?.length === 0 ? (
                    <Loader isLoading={loading} classSup="relative"/>
                ) : (
                    <>

                        {quizzes.map((quiz: QuizType) => (
                            <QuizCard key={quiz.id} quiz={quiz} session={session} />
                        ))}

                        <div className="card bg-base-100 border-4 border-primary border-dashed text-primary-content w-full">
                            <div className="card-body p-5 flex flex-col justify-between">
                                <div className="card-actions w-full h-full">
                                    <Link href="/dashboard/etudiant/accueil" className="btn btn-base-200 rounded-2xl w-full h-full p-0 text-primary"><Plus height={100} width={"100"}/></Link>
                                </div>
                            </div>
                        </div>
                    </>
                )}

            </div>
        </>
    )
}