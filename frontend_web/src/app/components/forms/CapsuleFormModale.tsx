'use client';

import {useEffect, useState} from "react";
import { File as FileIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Input from "@/app/components/ui/Input";
import ButtonForm from "@/app/components/ui/ButtonForm";

import cleanFileName from "@/utils/cleanFileName";

import ExtendedSession from "@/types/ExtendedSession";
import CapsuleDatas from "@/types/CapsulesDatas";

import supabaseUpload from "@/lib/supabaseUpload";
import supabaseRemove from "@/lib/supabaseRemove";
import saveCourse from '@/lib/apiCourse';
import saveCapsules from '@/lib/apiCapsules';

type modaleProps = {
    datasFile: File | null;
    onClose: () => void;
    onStartCreate: () => void;
    onCreateResult: (success: boolean) => void;
    show: boolean;
};

export default function CapsuleFormModale({datasFile, onClose, onStartCreate, onCreateResult, show}: modaleProps) {
    const { data: session, status } = useSession() as { 
        data: ExtendedSession | null; 
        status: string 
    };

    const [capsuleRequested, setCapsuleRequested] = useState<boolean>(false);
    const [datasCreateCapsule, setDatasCreateCapsule] = useState<CapsuleDatas>(
        {
            course: {
                name: "",
                courseUrl: "",
            },
            capsules: {
                flashcard: {
                    create: false,
                    number: 0,
                },
                summary: {
                    create: false
                },
                quiz: {
                    create: false,
                    number: 0,
                },
            },
            user_id: 0,
            course_id: 0
        }
    );

    useEffect(() => {
        setDatasCreateCapsule(prev => ({
            ...prev,
            course: {
                ...prev.course,
                name: datasFile?.name ?? "",
            }
        }));
    }, [datasFile]);

    // reset datasCreateCapsule
    useEffect(() => {
        if (!show || !datasFile) {
            setDatasCreateCapsule({
                course: {
                    name: "",
                    courseUrl: "",
                },
                capsules: {
                    flashcard: {
                        create: false,
                        number: 0,
                    },
                    summary: {
                        create: false
                    },
                    quiz: {
                        create: false,
                        number: 0,
                    },
                },
                user_id: 0,
                course_id: 0
            });
            setCapsuleRequested(false);
        }
    }, [show, datasFile]);





    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;

        setDatasCreateCapsule(prev => {
            const newFlashcard = name === "createFlashCards" ? checked : prev.capsules.flashcard.create;
            const newSummary = name === "createSummary" ? checked : prev.capsules.summary.create;
            const newQuiz = name === "createQuiz" ? checked : prev.capsules.quiz.create;

            setCapsuleRequested(newFlashcard || newSummary || newQuiz);

            return {
                ...prev,
                capsules: {
                    ...prev.capsules,
                    flashcard: {
                        ...prev.capsules.flashcard,
                        create: newFlashcard,
                    },
                    summary: {
                        ...prev.capsules.summary,
                        create: newSummary,
                    },
                    quiz: {
                        ...prev.capsules.quiz,
                        create: newQuiz,
                        number: prev.capsules.quiz.number,
                    }
                }
            };
        });
    };






    const handleCreateCapsules= async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onStartCreate();

        // récupère les infos du form
        const formDatas = event.currentTarget;

        const createFlashCards = (formDatas.elements.namedItem("createFlashCards") as HTMLInputElement)?.checked;
        const flashCardsCount = parseInt((formDatas.elements.namedItem("flashCardsCount") as HTMLInputElement)?.value);

        const createResume = (formDatas.elements.namedItem("createSummary") as HTMLInputElement)?.checked;

        const createQuizz = (formDatas.elements.namedItem("createQuiz") as HTMLInputElement)?.checked;
        const questionsCount = parseInt((formDatas.elements.namedItem("questionsCount") as HTMLInputElement)?.value);

        const newDatasCreateCapsule: CapsuleDatas = {
            course: {
                name: datasCreateCapsule.course.name,
                courseUrl: "",
            },
            capsules: {
                flashcard: {
                    create: createFlashCards,
                    number: flashCardsCount,
                },
                summary: {
                    create: createResume
                },
                quiz: {
                    create: createQuizz,
                    number: questionsCount,
                }
            },
            user_id: Number(session?.user.id) || 0,
            course_id: 0
        };

        setDatasCreateCapsule(newDatasCreateCapsule);

        if (!datasFile) {
            onCreateResult(false);
            return;
        }

        const cleanedFileName = cleanFileName(datasFile.name);

        // Store le fichier
        const fileToUpload = new File([datasFile], cleanedFileName, { type: datasFile.type });
        const fileUrl = await supabaseUpload(fileToUpload);

        if (!fileUrl) {
            console.error("Upload error");
            onCreateResult(false);
            return;
        }

        newDatasCreateCapsule.course.name = cleanedFileName;
        newDatasCreateCapsule.course.courseUrl = fileUrl;

        if (!session) {
            onCreateResult(false);
            return;
        }
        // Save en BDD le cours
        const savedCourse = await saveCourse(newDatasCreateCapsule.course?.name, fileUrl, session);

        // Rollback si problème pour save le cours
        if (!savedCourse || !savedCourse.id) {
            console.log("Save error");
            const isRemove = await supabaseRemove(fileUrl);
            if (isRemove) {
                console.log("Rollback OK")
            } else {
                console.log("remove error")
            }
            onCreateResult(false);
            return;
        }

        newDatasCreateCapsule.course_id = Number(savedCourse.id);
        setDatasCreateCapsule(newDatasCreateCapsule)
        
        // Création des capsules
        const savedCapsulesSuccess = await saveCapsules(newDatasCreateCapsule, session);

        onCreateResult(!!savedCapsulesSuccess);

    }





    return (
        <>
            <dialog id="my_modal" className="modal" open={show}>
                <div className="modal-box relative">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <p className="flex mb-3"><FileIcon className="mr-2" /> {datasCreateCapsule.course.name}</p>

                    <form onSubmit={handleCreateCapsules} className="flex flex-col items-center">

                        <Input label="Le nom de votre cours" classSup="w-full" htmlfor="name" name="name" type="text" placeHolder="Cours" value={(datasCreateCapsule.course.name ?? "").split(".")[0]} error={false} required={true} minLength={5} onChange={() => {}}  />

                        <p className="mb-3 w-full">Créez vos capsules</p>
                        <div className="join join-vertical bg-base-100 w-full">
                            <div className="collapse collapse-arrow join-item border-base-300 border">
                                <input type="radio" name="my-accordion-4" defaultChecked />
                                <div className="collapse-title flex justify-between font-semibold">Des flashcards</div>
                                <div className="collapse-content text-sm">
                                    <div className="flex mb-3">
                                        <input name="createFlashCards" type="checkbox" className="checkbox checkbox-accent mr-3" checked={datasCreateCapsule.capsules.flashcard.create} onChange={handleCheckboxChange} />
                                        <p>Créer des Flashcards</p>
                                    </div>
                                    <p className="mb-3">Combien de flashcards voulez vous dans votre bloc ?</p>
                                    <select name="flashCardsCount" defaultValue="10" className="select select-accent">
                                        <option>10</option>
                                        <option>20</option>
                                        <option>30</option>
                                    </select>
                                </div>
                            </div>
                            <div className="collapse collapse-arrow join-item border-base-300 border">
                                <input type="radio" name="my-accordion-4" />
                                <div className="collapse-title flex justify-between font-semibold">Des résumés</div>
                                <div className="collapse-content text-sm">
                                    <div className="flex">
                                        <input name="createSummary" type="checkbox" className="checkbox checkbox-accent mr-3" checked={datasCreateCapsule.capsules.summary.create} onChange={handleCheckboxChange} />
                                        <p>Créer un résumé</p>
                                    </div>
                                </div>
                            </div>
                            <div className="collapse collapse-arrow join-item border-base-300 border">
                                <input type="radio" name="my-accordion-4" />
                                <div className="collapse-title flex justify-between font-semibold">Des quiz</div>
                                <div className="collapse-content text-sm">
                                    <div className="flex mb-3">
                                        <input name="createQuiz" type="checkbox" className="checkbox checkbox-accent mr-3" checked={datasCreateCapsule.capsules.quiz.create} onChange={handleCheckboxChange} />
                                        <p>Créer un Quiz</p>
                                    </div>
                                    <p className="mb-3">Combien de questions voulez vous dans votre quiz ?</p>
                                    <select name="questionsCount" defaultValue="10" className="select select-accent">
                                        <option>10</option>
                                        <option>20</option>
                                        <option>30</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <ButtonForm disabled={!capsuleRequested} text="Créer les capsules" />
                    </form>
                </div>

                <form method="dialog" className="modal-backdrop">
                    <button>Fermer</button>
                </form>
            </dialog>
        </>
    )
}