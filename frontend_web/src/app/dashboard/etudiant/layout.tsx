// import { auth } from "../../../auth";
// import SessionProviderWrapper from "../SessionProviderWrapper";

import Link from "next/link";

export default async function etudiant({children,}: Readonly<{ children: React.ReactNode; }>) {

    return (
        <>
            <div className="card bg-base-200 w-4/5 mx-auto mt-5 p-5">
                <div className="flex">
                    <ul className="menu bg-base-100 rounded-box w-56 mr-5">
                        <li>
                            <Link href="/dashboard/etudiant/accueil">Dashboard</Link>
                        </li>
                        <li>
                            <Link href="/dashboard/etudiant/cours">Mes cours</Link>
                        </li>
                        <li>
                            <details>
                                <summary>Mes capsules</summary>
                                <ul>
                                    <li>
                                        <Link href="/dashboard/etudiant/flashcards">Mes flash cards</Link>
                                    </li>
                                    <li>
                                        <Link href="/dashboard/etudiant/resumes">Mes résumés</Link>
                                    </li>
                                    <li>
                                        <Link href="/dashboard/etudiant/quizz">Mes quiz</Link>
                                    </li>
                                </ul>
                            </details>
                        </li>
                        <li>
                            <Link href="/dashboard/etudiant/commu">La commu</Link>
                        </li>
                        <li>
                            <a href="/dashboard/etudiant/compte">Mon compte</a>
                        </li>
                    </ul>
                    <div className="card bg-base-100 grow p-3">
                        {children}
                    </div>

                </div>


            </div>
        </>
    )
}