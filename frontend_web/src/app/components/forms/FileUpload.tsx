import {CloudUpload} from "lucide-react";
import Button from "@/app/components/ui/Button";

export default function FileUpload() {



    return (
        <form className="bg-base-100 border-3 border-primary border-dashed p-5 rounded-2xl flex flex-col items-center space-y-2">
            <CloudUpload className="text-primary" size="150"/>
            <label htmlFor="cours">Quel cours voulez-vous choisir ?</label>
            <input
                type="file"
                id="cours"
                name="cours"
                className="file-input"
                accept=".txt, .png"
            />
            <Button disabled={true} text="Creer une capsule"/>
        </form>
    )
}