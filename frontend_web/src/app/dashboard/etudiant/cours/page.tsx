"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import {CircleQuestionMark, Diamond, Download, Plus, ReceiptText} from "lucide-react";
import Link from "next/link";
import Loader from "@/app/components/ui/Loader";
import ExtendedSession from "@/types/ExtendedSession";
import Course from "@/types/course";
import fonts from "@/utils/fonts";

export default function Cours() {
    const { data: session, status } = useSession() as { 
        data: ExtendedSession | null; 
        status: string 
    };

    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getCourses = async (): Promise<void> => {
            try {
                if (!session?.user?.id) return;
                setLoading(true);
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/course/read/${session.user.id}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${session.user.jwtToken}`
                        }
                    }
                );
                if (!response.ok) {
                    throw new Error("HTTP error, status : ${response.status}");
                }
                const datas = await response.json();
                setCourses(datas);
            } catch (error) {



            } finally {
                setLoading(false);
            }
        };
        getCourses();
    }, [session]);

    return (
        <>
            <p className="font-fredoka font-medium text-2xl mb-10">Mes cours</p>
            <div className={`relative cards-content space-y-5 ${fonts.openSans.className}`}>
                {courses?.length === 0 ? (
                    <Loader isLoading={loading} classSup="relative"/>
                ) : (
                        <>
                            {courses.map((course: Course) => (
                                <div key={course.id} className="card bg-base-100 border-3 border-primary bor text-primary-content w-full">
                                    <div className="card-body text-black">
                                        <h2 className="card-title">{course.name}</h2>
                                        <div className="card-actions justify-end">

                                            <div className="lg:tooltip" data-tip="Télécharger">
                                                {course.courseUrl && (
                                                    <Link href={course.courseUrl} className="btn btn-primary rounded-2xl w-10 p-0"><Download width={"20"} /></Link>
                                                )}
                                            </div>
                                            <div className="lg:tooltip" data-tip="Créer des flashcards">
                                                <button className="btn btn-primary rounded-2xl w-10 p-0 opacity-50"><Diamond /></button>
                                            </div>
                                            <div className="lg:tooltip" data-tip="Créer des résumés">
                                                <button className="btn btn-primary rounded-2xl w-10 p-0 opacity-50"><ReceiptText /></button>
                                            </div>
                                            <div className="lg:tooltip" data-tip="Créer des quizz">
                                                <button className="btn btn-primary rounded-2xl w-10 p-0 opacity-50"><CircleQuestionMark /></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="card bg-base-100 border-4 border-primary border-dashed text-primary-content w-full">
                                <div className="card-body p-5 flex flex-col justify-between">
                                    <div className="card-actions w-full h-full">
                                        <Link href="/dashboard/etudiant/accueil" className="btn btn-base-200 rounded-2xl w-full h-full p-5 text-primary"><Plus height={50} width={"50"}/></Link>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                }
            </div>
        </>
    );
}