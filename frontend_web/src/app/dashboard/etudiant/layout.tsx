import NavBarDashboardEtudiant from "@/app/components/layout/NavBarDashboardEtudiant";

export default async function etudiant({children,}: Readonly<{ children: React.ReactNode; }>) {

    return (
        <>
            <div className="card bg-base-300 w-full h-screen md:pt-25">
                <div className="relative flex f-full h-full">
                    <NavBarDashboardEtudiant/>
                    <div className="w-full max-w-300 px-5 pt-5 md:px-26 mx-auto">
                        <div className="card bg-base-300 w-full">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}