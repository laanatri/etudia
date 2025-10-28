"use client";

import Link from "next/link";
import {
    CircleQuestionMark,
    Diamond,
    FileText,
    Home,
    LogOut,
    PanelLeftClose,
    PanelLeftOpen,
    Pill,
    ReceiptText,
    Share2,
    User,
} from "lucide-react";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

export default function NavBarDashboardEtudiant() {
    const { data: session, status, update } = useSession();
    const pathname = usePathname();
    const router = useRouter();


    const [checked, setChecked] = useState(false);
    const [displayMenu, setDisplayMenu] = useState(false);

    function handleClick() {
        checked == true ? setChecked(false) : setChecked(true);
    }

    function toggleCapsuleMenu() {
        setDisplayMenu(!displayMenu);
    }

    function closeMenu(e: React.MouseEvent, href: string) {
        e.preventDefault();

        setDisplayMenu(false);

        setTimeout(() => {
            router.push(href);
        }, 300);
    }

    return (
        <div className="drawer w-fit h-full z-20">
            <input
                id="my-drawer"
                type="checkbox"
                className="drawer-toggle"
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
            />
            <div className="drawer-content absolute top-5 left-5 z-10">
                <label
                    htmlFor="my-drawer"
                    className="btn btn-primary drawer-button p-3 rounded-2xl"
                >
                    {checked ? <PanelLeftClose /> : <PanelLeftOpen />}
                </label>
            </div>
            <div className="drawer-side">
                <label
                    htmlFor="my-drawer"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                ></label>
                <ul className="menu bg-base-200 text-md min-h-full w-80 p-2 pt-15 md:pt-25 text-xl space-y-2">
                    <div className="flex pl-3 mb-15">
                        <div className="w-8 h-8 mr-5 rounded-full overflow-hidden">
                            <img
                                alt="Photo de profil"
                                src={"https://rugby.vlaanderen/wp-content/uploads/2018/03/Anonymous-Profile-pic.jpg"}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <p>{session?.user.username}</p>
                    </div>
                    <li>
                        <Link
                            className={
                                pathname == "/dashboard/etudiant/accueil"
                                    ? "bg-secondary"
                                    : ""
                            }
                            onClick={handleClick}
                            href="/dashboard/etudiant/accueil"
                        >
                            <Home /> Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link
                            className={
                                pathname == "/dashboard/etudiant/cours"
                                    ? "bg-secondary"
                                    : ""
                            }
                            onClick={handleClick}
                            href="/dashboard/etudiant/cours"
                        >
                            <FileText /> Mes cours
                        </Link>
                    </li>
                    <li>
                        <details>
                            <summary>
                                <Pill /> Mes capsules
                            </summary>
                            <ul className="space-y-2">
                                <li>
                                    <Link
                                        className={
                                            pathname ==
                                            "/dashboard/etudiant/flashcards"
                                                ? "bg-secondary"
                                                : ""
                                        }
                                        onClick={handleClick}
                                        href="/dashboard/etudiant/flashcards"
                                    >
                                        <Diamond /> Mes flashcards
                                    </Link>
                                </li>
                                <li className="relative">
                                    <Link
                                        className={
                                            pathname ==
                                            "/dashboard/etudiant/summaries"
                                                ? "bg-secondary"
                                                : ""
                                        }
                                        onClick={handleClick}
                                        href="/dashboard/etudiant/summaries"
                                    >
                                        <ReceiptText /> Mes résumés
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className={
                                            pathname ==
                                            "/dashboard/etudiant/quiz"
                                                ? "bg-secondary"
                                                : ""
                                        }
                                        onClick={handleClick}
                                        href="/dashboard/etudiant/quiz"
                                    >
                                        <CircleQuestionMark /> Mes quiz
                                    </Link>
                                </li>
                            </ul>
                        </details>
                    </li>
                    {/* <li>
                        <Link
                            className={
                                pathname == "/dashboard/etudiant/commu"
                                    ? "bg-secondary"
                                    : ""
                            }
                            onClick={handleClick}
                            href="/dashboard/etudiant/commu"
                        >
                            <Share2 /> La commu
                        </Link>
                    </li> */}
                    <li className="mt-15">
                        <Link
                            className={
                                pathname == "/dashboard/etudiant/compte"
                                    ? "bg-secondary"
                                    : ""
                            }
                            onClick={handleClick}
                            href="/dashboard/etudiant/compte"
                        >
                            <User /> Mon compte
                        </Link>
                    </li>
                    <li>
                        <button
                            onClick={() =>
                                signOut({ callbackUrl: "/" })
                            }
                            className="text-left cursor-pointer hover:text-gray-400"
                        >
                            <LogOut /> Déconnexion
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
}

        // return (
        //     <div className="fixed w-full bottom-0 z-30">
        //         <div className="relative w-full h-16 bg-primary border-t border-t-2 px-10">
        //             <div className="absolute left-1/2 -translate-x-1/2 -top-6 z-5 w-14 h-14">
        //                 <div className="relative w-0 h-0">
        //                     <Link
        //                         href="/dashboard/etudiant/flashcards"
        //                         className={`absolute left-0 top-4 flex items-center justify-center w-12 h-12 rounded-full bg-secondary border border-black text-secondary-content shadow-[0_4px_6px_rgba(0,0,0,0.15)] transition-all duration-300 ${
        //                             displayMenu
        //                                 ? "-translate-x-[50px] -translate-y-[50px] scale-100"
        //                                 : "translate-x-0 translate-y-0 scale-50"
        //                         }`}
        //                         onClick={(e) =>
        //                             closeMenu(
        //                                 e,
        //                                 "/dashboard/etudiant/flashcards"
        //                             )
        //                         }
        //                     >
        //                         <Diamond className="w-5 h-5 text-black" />
        //                     </Link>
        //                     <Link
        //                         href="/dashboard/etudiant/resumes"
        //                         className={`absolute left-0 top-4 flex items-center justify-center w-12 h-12 rounded-full bg-secondary border border-black text-secondary-content shadow-[0_4px_6px_rgba(0,0,0,0.15)] transition-all duration-300 delay-75 ${
        //                             displayMenu
        //                                 ? "-translate-y-[100px] scale-100"
        //                                 : "translate-y-0 scale-50"
        //                         }`}
        //                         onClick={(e) =>
        //                             closeMenu(
        //                                 e,
        //                                 "/dashboard/etudiant/resumes"
        //                             )
        //                         }
        //                     >
        //                         <ReceiptText className="w-5 h-5 text-black" />
        //                     </Link>
        //                     <Link
        //                         href="/dashboard/etudiant/quizz"
        //                         className={`absolute left-0 top-4 flex items-center justify-center w-12 h-12 rounded-full bg-secondary border border-black text-secondary-content shadow-[0_4px_6px_rgba(0,0,0,0.15)] transition-all duration-300 delay-150 ${
        //                             displayMenu
        //                                 ? "translate-x-[50px] -translate-y-[50px] scale-100"
        //                                 : "translate-x-0 translate-y-0 scale-50"
        //                         }`}
        //                         onClick={(e) =>
        //                             closeMenu(
        //                                 e,
        //                                 "/dashboard/etudiant/quizz"
        //                             )
        //                         }
        //                     >
        //                         <CircleQuestionMark className="w-5 h-5 text-black" />
        //                     </Link>
        //                 </div>
        //             </div>

        //             <div className="relative flex justify-evenly items-center w-full h-full z-10">
        //                 <div className="absolute top-0 left-0 w-full h-full">

        //                     <div className={`absolute z-0 top-1/2 -translate-y-5 right-1/2 h-10 bg-secondary transition-all duration-500 ease-in-out ${pathname === "/dashboard/etudiant/accueil" ? "w-1/2" : "w-0"}`}>
        //                         <div className="absolute top-0 -left-5 w-10 h-10 bg-secondary rounded-full"></div>
        //                     </div>

        //                     <div className={`absolute z-0 top-1/2 -translate-y-5 left-1/2 h-10 bg-secondary transition-all duration-500 ease-in-out ${pathname === "/dashboard/etudiant/compte" ? "w-1/2" : "w-0"}`}>
        //                         <div className="absolute top-0 -right-5 w-10 h-10 bg-secondary rounded-full"></div>
        //                     </div>

        //                 </div>

        //                 <Link
        //                     href="/dashboard/etudiant/accueil"
        //                     className="relative z-5 flex items-center justify-center w-14 h-14 text-primary-content"
        //                 >
        //                     <Home className="w-6 h-6 text-black" />
        //                 </Link>

        //                 <button
        //                     onClick={toggleCapsuleMenu}
        //                     className={`relative z-5 flex items-center justify-center w-14 h-14 cursor-pointer rounded-full bg-black border border-black text-secondary-content transition-transform duration-300`}
        //                 >
        //                     <Pill className="w-7 h-7 text-primary" />
        //                 </button>

        //                 <Link
        //                     href="/dashboard/etudiant/compte"
        //                     className="relative z-5 flex items-center justify-center w-14 h-14 text-primary-content"
        //                 >
        //                     <User className="w-6 h-6 text-black" />
        //                 </Link>
        //             </div>
        //         </div>
        //     </div>
        // );