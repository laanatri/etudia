'use client';

import {CloudUpload} from "lucide-react";
import Button from "@/app/components/ui/Button";
import {useState, ChangeEvent, JSX, FormEvent} from "react";

interface FileUploadProps {
    onSubmit: (file: File | null) => void;
}

export default function FileUpload({ onSubmit }: FileUploadProps): JSX.Element {

    const [isFill, setIsFill] = useState<boolean>(true);
    const [selectedFile, setSelectedFile] = useState<File | null>(null)

    const checkIfFile = (event: ChangeEvent<HTMLInputElement>): void => {
        const file: File | null = event.target.files?.[0] || null;
        if (file) {
            setIsFill(false);
            setSelectedFile(file);
        } else {
            setIsFill(true);
            setSelectedFile(null);
        }
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>): void=> {
        event.preventDefault();
        onSubmit(selectedFile);
    }

    return (
        <form onSubmit={handleSubmit} className="bg-base-100 border-3 border-primary border-dashed p-5 rounded-2xl flex flex-col items-center space-y-2">
            <CloudUpload className="text-primary" size="150"/>
            <label htmlFor="cours">Quel cours voulez-vous choisir ?</label>
            <input
                type="file"
                id="cours"
                name="cours"
                className="file-input"
                accept=".txt,.pdf"
                onChange={checkIfFile}
            />
            <Button disabled={isFill} text="Creer une capsule"/>
        </form>
    )

}