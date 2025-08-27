"use client";

import { useSession } from "next-auth/react";
import fonts from "@/app/utils/fonts";
import Input from "@/app/components/ui/Input";
import ButtonForm from "@/app/components/ui/ButtonForm";
import Alert from "@/app/components/ui/Alert";
import Loader from "@/app/components/ui/Loader";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface ExtendedSession {
    user: {
        id: number;
        jwtToken: string;
        username?: string;
        firstname?: string;
        lastname?: string;
        email?: string;
        role?: string;
    };
}

export default function Compte() {
    const { data: session, status, update } = useSession();
    const typedSession = session as ExtendedSession | null;

    const router = useRouter();

    const [errorMessage, setErrorMessage] = useState<string | undefined>(
        undefined
    );
    const [successMessage, setSuccessMessage] = useState<string | undefined>(
        undefined
    );
    const [isPending, setIsPending] = useState<boolean>(false);
    const [isFill, setIsFill] = useState<boolean[]>([true, true, true, true]);

    const [username, setUsername] = useState<string>(
        typedSession?.user?.username || ""
    );
    const [firstname, setFirstname] = useState<string>(
        typedSession?.user?.firstname || ""
    );
    const [lastname, setLastname] = useState<string>(
        typedSession?.user?.lastname || ""
    );
    const [email, setEmail] = useState<string>(typedSession?.user?.email || "");

    useEffect(() => {
        if (!typedSession?.user) return;

        if ((typedSession.user.username || "") !== username) {
            setUsername(typedSession.user.username || "");
        }
        if ((typedSession.user.firstname || "") !== firstname) {
            setFirstname(typedSession.user.firstname || "");
        }
        if ((typedSession.user.lastname || "") !== lastname) {
            setLastname(typedSession.user.lastname || "");
        }
        if ((typedSession.user.email || "") !== email) {
            setEmail(typedSession.user.email || "");
        }

        setIsFill([
            (typedSession.user.username || "").length > 0,
            (typedSession.user.firstname || "").length > 0,
            (typedSession.user.lastname || "").length > 0,
            (typedSession.user.email || "").length > 0,
        ]);
    }, [typedSession?.user?.id]);

    const handleFormSubmit = async (formData: FormData) => {
        if (!typedSession?.user?.id) {
            setErrorMessage("Session utilisateur non trouvée");
            return;
        }

        setIsPending(true);
        setErrorMessage(undefined);
        setSuccessMessage(undefined);

        const values = Object.fromEntries(formData.entries()) as Record<
            string,
            string
        >;

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/user/update/${typedSession?.user.id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${typedSession.user.jwtToken}`,
                    },
                    body: JSON.stringify(values),
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(
                    errorData?.message ||
                        "Une erreur est survenue lors de la création du compte."
                );
            }

            const authResponse = (await response.json()) as {
                jwtToken: string;
                id: number;
                username?: string;
                email?: string;
                firstname?: string;
                lastname?: string;
                role?: string;
            };

            setUsername(authResponse.username || "");
            setFirstname(authResponse.firstname || "");
            setLastname(authResponse.lastname || "");
            setEmail(authResponse.email || "");
            setIsFill([
                !!authResponse.username,
                !!authResponse.firstname,
                !!authResponse.lastname,
                !!authResponse.email,
            ]);

            const newUser = {
                id: String(authResponse.id),
                username: authResponse.username ?? "",
                firstname: authResponse.firstname ?? "",
                lastname: authResponse.lastname ?? "",
                email: authResponse.email ?? "",
                role: authResponse.role ?? "",
                jwtToken: authResponse.jwtToken,
            };

            if (update) {
                await update({
                    user: newUser,
                });

                // window.location.reload();
            }

            setSuccessMessage(
                "Vos informations ont été mises à jour avec succès !"
            );
        } catch (error) {
            const errorMsg =
                error instanceof Error
                    ? error.message
                    : "Erreur inconnue lors de la mise à jour";
            setErrorMessage(errorMsg);
        } finally {
            setIsPending(false);
        }
    };

    const checkIfAllFill = (value: string, index: number) => {
        const newIsFill = [...isFill];
        newIsFill[index] = value.length > 0;
        setIsFill(newIsFill);
    };

    if (status === "loading") {
        return <Loader isLoading={true} classSup="relative"/>;
    }

    if (!typedSession?.user) {
        return <div>Vous devez être connecté pour accéder à cette page.</div>;
    }

    return (
        <>
            <p className="font-fredoka font-medium text-2xl mb-5">Mon compte</p>

            <div className="max-w-105">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        console.log("form submit prevented");
                        const formData = new FormData(e.currentTarget);
                        handleFormSubmit(formData);
                    }}
                    className={`${fonts.openSans.className} space-y-3 w-full`}
                >
                    <div>
                        <div className="w-full">
                            <Input
                                onChange={(value) => {
                                    checkIfAllFill(value, 0),
                                        setUsername(value);
                                }}
                                value={username}
                                label="Votre pseudo"
                                htmlfor="username"
                                name="username"
                                type="username"
                                placeHolder="john_doe"
                                error={false}
                                required={true}
                            />
                            <Input
                                onChange={(value) => {
                                    checkIfAllFill(value, 1),
                                        setFirstname(value);
                                }}
                                value={firstname}
                                label="Votre prénom"
                                htmlfor="firstname"
                                name="firstname"
                                type="firstname"
                                placeHolder="john"
                                error={false}
                                required={true}
                            />
                            <Input
                                onChange={(value) => {
                                    checkIfAllFill(value, 2),
                                        setLastname(value);
                                }}
                                value={lastname}
                                label="Votre nom"
                                htmlfor="lastname"
                                name="lastname"
                                type="lastname"
                                placeHolder="doe"
                                error={false}
                                required={true}
                            />
                            <Input
                                onChange={(value) => {
                                    checkIfAllFill(value, 3), setEmail(value);
                                }}
                                value={email}
                                label="Votre e-mail"
                                htmlfor="email"
                                name="email"
                                type="email"
                                placeHolder="john_doe@mail.com"
                                error={false}
                                required={true}
                            />
                        </div>

                        <ButtonForm
                            disabled={isPending || !isFill.every((b) => b)}
                            text="Enregistrer"
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
            </div>
        </>
    );
}
