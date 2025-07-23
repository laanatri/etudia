import LoginForm from "@/app/components/forms/LoginForm";
import {Suspense} from "react";

export default function Login() {
    return (
        <main className="px-2 py-4">
            <div>
                <h1 className="text-center">Connexion</h1>
            </div>
            <Suspense>
                <LoginForm/>
            </Suspense>
        </main>
    )
}