'use client';

import FileUpload from "@/app/components/forms/FileUpload";
import {useState} from "react";
import CapsuleFormModale from "@/app/components/forms/CapsuleFormModale";
import Alert from "@/app/components/ui/Alert";
import Image from "next/image";

export default function Accueil() {

    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showStatusModal, setShowStatusModal] = useState(false);
    const [resetFileUpload, setResetFileUpload] = useState(false);
    const [capsuleStatus, setCapsuleStatus] = useState<"success" | "error" | "loading" | null>(null);

    const handleFileSelect = (file: File | null): void => {
        setSelectedFile(file);
        if (file) {
            console.log("fichier  ", file.name)
            console.log("fichier  ", file)

            setShowCreateModal(true);
        }
        console.log("fichier  ", selectedFile);
    }

    const handleCreateResult = (success: boolean) => {
    setCapsuleStatus(success ? "success" : "error");
    setSelectedFile(null);
    setResetFileUpload(true);
        setTimeout(() => {
            setShowStatusModal(false);
            setResetFileUpload(false);
        }, 3000);
    };

    return (
        <>

            <p className="font-fredoka font-medium text-2xl mb-10 mt-6">Dashboard</p>

            <FileUpload onSubmit={handleFileSelect} reset={resetFileUpload} />

            <CapsuleFormModale 
                datasFile={selectedFile}
                onClose={() => setShowCreateModal(false)}
                onStartCreate={() => {
                    setShowCreateModal(false);
                    setShowStatusModal(true);
                    setCapsuleStatus("loading");
                }}
                onCreateResult={handleCreateResult}
                show={showCreateModal}
            />

            {showStatusModal && (
                <dialog className="modal" open>
                    <div className="modal-box flex flex-col items-center bg-base-200 text-black border border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
                        {capsuleStatus === "loading" && (
                            <>
                                <Image className="loader-picto" src="/loading.png" width={100} height={100} alt="loading" />
                                <Alert
                                    type="alert-info"
                                    text="Création des capsules en cours..."
                                />
                            </>
                        )}
                        {capsuleStatus === "success" && (
                            <>
                                <Image src="/success.png" width={100} height={100} alt="loading" />
                                <Alert
                                    type="alert-success"
                                    text="Capsules créées avec succès !"
                                />
                            </>
                        )}
                        {capsuleStatus === "error" && (
                            <>
                                <Image src="/error.png" width={100} height={100} alt="loading" />
                                <Alert
                                    type="alert-error"
                                    text="Erreur lors de la création des capsules."
                                />
                            </>
                        )}
                    </div>
                </dialog>
            )}

        </>
    )
}