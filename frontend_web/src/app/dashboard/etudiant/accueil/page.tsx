'use client';

import FileUpload from "@/app/components/forms/FileUpload";
import {useState} from "react";
import CapsuleFormModale from "@/app/components/forms/CapsuleFormModale";
import Alert from "@/app/components/ui/Alert";

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
    }, 2000);
    };

    return (
        <>

            <p className="font-fredoka font-medium text-2xl mb-3">Dashboard</p>

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
                    <div className="modal-box">
                        {capsuleStatus === "loading" && (
                            <Alert
                                type="info"
                                picto={<span>⏳</span>}
                                text="Création des capsules en cours..."
                            />
                        )}
                        {capsuleStatus === "success" && (
                            <Alert
                                type="success"
                                picto={<span>✅</span>}
                                text="Capsules créées avec succès !"
                            />
                        )}
                        {capsuleStatus === "error" && (
                            <Alert
                                type="error"
                                picto={<span>❌</span>}
                                text="Erreur lors de la création des capsules."
                            />
                        )}
                    </div>
                </dialog>
            )}

        </>
    )
}