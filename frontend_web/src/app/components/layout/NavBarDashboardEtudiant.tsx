import Link from "next/link";

export default function NavBarDashboardEtudiant() {


    return (
        <ul className="menu bg-base-100 rounded-box w-64 mr-5 text-lg">
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
                        <li className="relative">
                            <Link href="/dashboard/etudiant/resumes">Mes résumés</Link>
                            <p className="absolute right-1 top-1.5 bg-info text-xs">bientôt</p>
                        </li>
                        <li>
                            <Link href="/dashboard/etudiant/quizz">Mes quiz</Link>
                            <p className="absolute right-1 top-1.5 bg-info text-xs">bientôt</p>
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
    )
}