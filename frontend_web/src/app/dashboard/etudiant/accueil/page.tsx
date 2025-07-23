'use client';

import FileUpload from "@/app/components/forms/FileUpload";
import {useState} from "react";

export default function Accueil() {

    const [selectedFile, setSelectedFile] = useState<File | null>(null)

    const handleFileSelect = (file: File | null): void => {
        setSelectedFile(file);
        if (file) {
            console.log("fichier  ", file.name)
            console.log("fichier  ", file)
        }
        console.log("fichier  ", selectedFile)
    }

    return (
        <>

            <p className="font-fredoka font-medium text-2xl mb-3">Dashboard</p>

            <FileUpload onSubmit={handleFileSelect} />

        </>
    )
}