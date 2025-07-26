import {Suspense} from "react";
import RegisterForm from "@/app/components/forms/RegisterForm";
import fonts from "@/app/utils/fonts";
import ButtonLink from "@/app/components/ui/ButtonLink";

export default function Register() {
    return (
        <main className="pt-22 px-4 pb-10 min-h-screen flex justify-center flex-col items-center">
            <h1 className="text-center text-2xl">Inscription</h1>
            <Suspense>
                <RegisterForm/>
            </Suspense>
            <div className="divider divider-vertical divider-primary">OU</div>
            <div className={`${fonts.openSans.className}`}>
                <p className="text-center text-sm">Tu as déjà un compte&nbsp;? <br/>
                    Connecte toi pour continuer d'apprendre&nbsp;!
                </p>
                <ButtonLink href="/login" text="Se connecter" />
            </div>
        </main>
    )
}