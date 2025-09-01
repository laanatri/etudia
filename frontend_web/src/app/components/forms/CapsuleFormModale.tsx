'use client';

import {useEffect, useState} from "react";
import Button from "@/app/components/ui/ButtonForm";
import Input from "../ui/Input";
import { File } from "lucide-react";
import { useSession } from "next-auth/react";
import ExtendedSession from "@/types/ExtendedSession";
import supabaseUpload from "@/lib/supabaseUpload";
import supabaseRemove from "@/lib/supabaseRemove";
import CapsuleDatas from "@/types/CapsulesDatas";

type modaleProps = {
    datasFile: File | null;
};

export default function CapsuleFormModale({datasFile}: modaleProps) {
    const { data: session, status } = useSession() as { 
        data: ExtendedSession | null; 
        status: string 
    };

    const [datasCreateCapsule, setDatasCreateCapsule] = useState<CapsuleDatas>({
        selectedFile: datasFile,
        capsules: {
            flashCard: {
                create: false,
                number: 0,
            },
            resume: {
                create: false
            },
            quizz: {
                create: false,
                number: 0,
            },
        }
    })

    useEffect(() => {
        setDatasCreateCapsule(prev => ({
            ...prev,
            selectedFile: datasFile,
        }));
    }, [datasFile]);

    const saveCourse = async (nameCourse: string, courseUrl: string): Promise<void | null> => {

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/course/create`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${session?.user.jwtToken}`
                    },
                    body: JSON.stringify({
                        name: nameCourse,
                        courseUrl: courseUrl,
                        user: { id: session?.user.id }
                    })
                }
            );

            if (response.ok) {
                const data = await response.json();
                return data;
            }

        } catch(error) {

        }

        return null;

    }

    const handleCreateCapsules= async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formDatas = event.currentTarget;

        const createFlashCards = (formDatas.elements.namedItem("createFlashCards") as HTMLInputElement)?.checked;
        const flashCardsCount = parseInt((formDatas.elements.namedItem("flashCardsCount") as HTMLInputElement)?.value);

        const createResume = (formDatas.elements.namedItem("createResume") as HTMLInputElement)?.checked;

        const createQuizz = (formDatas.elements.namedItem("createQuizz") as HTMLInputElement)?.checked;
        const questionsCount = parseInt((formDatas.elements.namedItem("questionsCount") as HTMLInputElement)?.value);

        const newDatasCreateCapsule: CapsuleDatas = {
            selectedFile: datasCreateCapsule.selectedFile,
            capsules: {
                flashCard: {
                    create: createFlashCards,
                    number: flashCardsCount,
                },
                resume: {
                    create: createResume
                },
                quizz: {
                    create: createQuizz,
                    number: questionsCount,
                }
            }
        };

        setDatasCreateCapsule(newDatasCreateCapsule);

        // console.log("newDatasCreateCapsule.selectedFile");
        // console.log(newDatasCreateCapsule.selectedFile);

        if (!newDatasCreateCapsule.selectedFile) return null;
        // Store le fichier
        const fileUrl = await supabaseUpload(newDatasCreateCapsule.selectedFile);

        if (!fileUrl) {
            console.error("Upload error");
            return;
        }
        // console.log(fileUrl);

        // Save en BDD le cours
        const savedCourse = await saveCourse((newDatasCreateCapsule.selectedFile?.name ?? "").split(".")[0], fileUrl);
        // console.log(savedCourse);

        // Rollback si problème pour save le cours
        if (!savedCourse) {
            console.log("Save error");
            const isRemove = await supabaseRemove(fileUrl);
            if (isRemove) {
                console.log("Rollback OK")
            } else {
                console.log("remove error")
            }
        }

        // Création des capsule
        const capsulesToCreate = {
            urlFileToUse: fileUrl,
            capsules: newDatasCreateCapsule.capsules
        }
        console.log("lalalalalala//////////////////lalalalalala")
        console.log(savedCourse);
        console.log(newDatasCreateCapsule)
        console.log(fileUrl)
        console.log(capsulesToCreate)

        

    }

    return(
        <>
            <dialog id="my_modal" className="modal">
                <div className="modal-box relative">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <p className="flex mb-3"><File className="mr-2" /> {datasCreateCapsule.selectedFile?.name}</p>

                    <form onSubmit={handleCreateCapsules}>

                        <Input label="Le nom de votre cours" htmlfor="name" name="name" type="text" placeHolder="Cours" value={(datasCreateCapsule.selectedFile?.name ?? "").split(".")[0]} error={false} required={true} minLength={5} onChange={() => {}}  />

                        <p className="mb-3">Créez vos capsules</p>
                        <div className="join join-vertical bg-base-100 w-full">
                            <div className="collapse collapse-arrow join-item border-base-300 border">
                                <input type="radio" name="my-accordion-4" defaultChecked />
                                <div className="collapse-title flex justify-between font-semibold">Des flashcards</div>
                                <div className="collapse-content text-sm">
                                    <div className="flex mb-3">
                                        <input name="createFlashCards" type="checkbox" className="checkbox checkbox-accent mr-3" />
                                        <p>Créer des Flashcards</p>
                                    </div>
                                    <p className="mb-3">Combien de flashcards voulez vous dans votre bloc ?</p>
                                    <select name="flashCardsCount" defaultValue="0" className="select select-accent">
                                        <option disabled={true}>0</option>
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
                                        <input name="createResume" type="checkbox" className="checkbox checkbox-accent mr-3" />
                                        <p>Créer des Flashcards</p>
                                    </div>
                                </div>
                            </div>
                            <div className="collapse collapse-arrow join-item border-base-300 border">
                                <input type="radio" name="my-accordion-4" />
                                <div className="collapse-title flex justify-between font-semibold">Des quizz</div>
                                <div className="collapse-content text-sm">
                                    <div className="flex mb-3">
                                        <input name="createQuizz" type="checkbox" className="checkbox checkbox-accent mr-3" />
                                        <p>Créer des Quizz</p>
                                    </div>
                                    <p className="mb-3">Combien de questions voulez vous dans votre quizz ?</p>
                                    <select name="questionsCount" defaultValue="0" className="select select-accent">
                                        <option disabled={true}>0</option>
                                        <option>10</option>
                                        <option>20</option>
                                        <option>30</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <Button disabled={false} text="Créer les capsules" />
                    </form>
                </div>

                <form method="dialog" className="modal-backdrop">
                    <button>Fermer</button>
                </form>
            </dialog>
        </>
    )
}