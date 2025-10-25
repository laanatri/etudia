"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Input from "../ui/Input";
import ButtonForm from "../ui/ButtonForm";
import Alert from "../ui/Alert";
import fonts from "@/utils/fonts";
import Loader from "@/app/components/ui/Loader";

export default function RegisterForm() {
    const searchParams = useSearchParams();
    const callbackUrl =
        searchParams.get("callbackUrl") || "/dashboard/etudiant/accueil";
    const router = useRouter();

    const [errorMessage, setErrorMessage] = useState<string | undefined>(
        undefined
    );
    const [successMessage, setSuccessMessage] = useState<string | undefined>(
        undefined
    );
    const [isPending, setIsPending] = useState<boolean>(false);
    const [isFill, setIsFill] = useState<boolean[]>([
        false,
        false,
        false,
        false,
        false,
    ]);

    const handleFormSubmit = async (formData: FormData) => {
        setIsPending(true);
        setErrorMessage(undefined);

        const values = Object.fromEntries(formData.entries());
        const { redirectTo, ...rest } = values;
        values.role = "ROLE_ETUDIANT";

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/user/create`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values),
                }
            );

            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(
                    responseData?.message ||
                        "Une erreur est survenue lors de la création du compte."
                );
            }

            setSuccessMessage(
                "Votre compte a bien été créé ! Redirection vers la connexion..."
            );

            setTimeout(() => {
                router.push(
                    `/login?message=${encodeURIComponent(
                        "Compte créé avec succès ! Veuillez vous connecter."
                    )}&callbackUrl=${encodeURIComponent(callbackUrl)}`
                );
            }, 4000);
        } catch (error) {
            const errorMsg =
                error instanceof Error ? error.message : "Erreur inconnue";
            setErrorMessage(errorMsg);
        } finally {
            setIsPending(false);
        }
    };

    const checkIfAllFill = (value: string, index: number) => {
        const newIsFill = [...isFill];
        if (index === 1) {
            newIsFill[1] = value.length > 5;
        } else {
            newIsFill[index] = value.length > 0;
        }
        setIsFill(newIsFill);
    };

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                handleFormSubmit(formData);
            }}
            className={`${fonts.openSans.className} space-y-3 w-full`}
        >
            <div className="py-4">
                <div className="w-full">
                    <Input
                        onChange={(value) => {
                            checkIfAllFill(value, 0);
                        }}
                        label="Votre pseudo *"
                        htmlfor="username"
                        name="username"
                        type="text"
                        placeHolder="john_d"
                        error={false}
                        required={true}
                    />
                    <Input
                        onChange={(value) => {
                            checkIfAllFill(value, 1);
                        }}
                        label="Votre mot de passe *"
                        htmlfor="password"
                        name="password"
                        type="password"
                        placeHolder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;"
                        error={false}
                        required={true}
                        minLength={6}
                        isPassword={true}
                    />
                    <Input
                        onChange={(value) => {
                            checkIfAllFill(value, 2);
                        }}
                        label="Votre prénom *"
                        htmlfor="firstname"
                        name="firstname"
                        type="text"
                        placeHolder="john"
                        error={false}
                        required={true}
                    />
                    <Input
                        onChange={(value) => {
                            checkIfAllFill(value, 3);
                        }}
                        label="Votre nom *"
                        htmlfor="lastname"
                        name="lastname"
                        type="text"
                        placeHolder="doe"
                        error={false}
                        required={true}
                    />
                    <Input
                        onChange={(value) => {
                            checkIfAllFill(value, 4);
                        }}
                        label="Votre e-mail *"
                        htmlfor="email"
                        name="email"
                        type="email"
                        placeHolder="john_doe@mail.com"
                        error={false}
                        required={true}
                    />
                </div>
                <input type="hidden" name="redirectTo" value={callbackUrl} />

                <p className="text-xs">* Champs obligatoires</p>

                <ButtonForm
                    disabled={isPending || !isFill.every((b) => b)}
                    text="s'inscrire"
                />


                {errorMessage && (
                    <Alert
                        type="alert-error"
                        picto={
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 shrink-0 stroke-current"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        }
                        text={errorMessage}
                    />
                )}
                {successMessage && (
                    <Alert
                        type="alert-success"
                        picto={
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 shrink-0 stroke-current"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        }
                        text={successMessage}
                    />
                )}
            </div>
            <Loader isLoading={isPending} />
        </form>
    );
}
