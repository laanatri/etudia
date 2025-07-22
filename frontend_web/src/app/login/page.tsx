import LoginForm from "@/app/components/forms/LoginForm";
import {Suspense} from "react";

export default function Login() {
    return (
        <main>
            <div>
                <h1>Login</h1>
            </div>
            <Suspense>
                <LoginForm/>
            </Suspense>
        </main>
    )
}