'use client';

import {useEffect, useState} from "react";
import Button from "@/app/components/ui/ButtonForm";

type CapsuleDatas = {
    selectedFile: File | null;
    capsules: {
        flashCard: {
            create: boolean;
            number: number;
        };
    };
};

type modaleProps = {
    datasFile: File | null;
};

export default function CapsuleFormModale({datasFile}: modaleProps) {

    const [datasCreateCapsule, setDatasCreateCapsule] = useState<CapsuleDatas>({
        selectedFile: datasFile,
        capsules: {
            flashCard: {
                create: false,
                number: 0,
            },
        },
    })

    useEffect(() => {
        setDatasCreateCapsule(prev => ({
            ...prev,
            selectedFile: datasFile,
        }));
    }, [datasFile]);

    const saveDatas = (create, count) => {
        setDatasCreateCapsule(prev => ({
            ...prev,
            capsules: {
                ...prev.capsules,
                flashCard: {
                    create: create,
                    number: count,
                }
            }
        }));
    }

    const saveFile = (datas: CapsuleDatas) => {



        datas



    }

    const createCapsules = (datas: CapsuleDatas) => {



    datas




    }

    const handleCreateCapsules= (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        const formDatas = event.currentTarget;

        const createFlashCards = (formDatas.elements.namedItem("createFlashCards") as HTMLInputElement)?.checked;
        const flashCardsCount = parseInt((formDatas.elements.namedItem("flashCardsCount") as HTMLInputElement)?.value, 0);


        saveDatas(createFlashCards, flashCardsCount);
        console.log(datasCreateCapsule)
        saveFile(datasCreateCapsule);
        createCapsules(datasCreateCapsule)

    }

    return(
        <>
            <dialog id="my_modal" className="modal">
                <div className="modal-box relative">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <p>fichier : {datasCreateCapsule.selectedFile?.name}</p>

                    <form onSubmit={handleCreateCapsules}>
                        <p>créer un bloc de flash cards</p>
                        <input name="createFlashCards" type="checkbox" className="checkbox checkbox-accent" />
                        <p>combien de flash cards voulez vous dans le bloc ?</p>
                        <select name="flashCardsCount" defaultValue="0" className="select select-accent">
                            <option disabled={true}>0</option>
                            <option>10</option>
                            <option>20</option>
                            <option>30</option>
                        </select>
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