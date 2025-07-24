'use client';

import FileUpload from "@/app/components/forms/FileUpload";
import {useState} from "react";
import CapsuleFormModale from "@/app/components/forms/CapsuleFormModale";

export default function Accueil() {

    const [selectedFile, setSelectedFile] = useState<File | null>(null)

    const handleFileSelect = (file: File | null): void => {
        setSelectedFile(file);
        if (file) {
            console.log("fichier  ", file.name)
            console.log("fichier  ", file)

            const modal = document.getElementById('my_modal') as HTMLDialogElement | null;
            if (modal) {
                modal.showModal();
            }
        }
        console.log("fichier  ", selectedFile);
    }

    return (
        <>

            <p className="font-fredoka font-medium text-2xl mb-3">Dashboard</p>

            <FileUpload onSubmit={handleFileSelect} />

            <CapsuleFormModale datasFile={selectedFile}/>

        </>
    )
}