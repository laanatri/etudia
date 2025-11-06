import NavBarDashboardEtudiant from "@/app/components/layout/NavBarDashboardEtudiant";

export default async function etudiant({children,}: Readonly<{ children: React.ReactNode; }>) {

    return (
        <>
            <div className="bg-base-300 w-full min-h-screen">
                <div className="relative flex f-full min-h-full">
                    <NavBarDashboardEtudiant/>
                    <div className="w-full max-w-300 px-5 pt-5 md:px-26 mx-auto">
                        <div className="bg-base-300 w-full pt-10 md:pt-0 mb-15">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}