import NavBarDashboardEtudiant from "@/app/components/layout/NavBarDashboardEtudiant";

export default async function etudiant({children,}: Readonly<{ children: React.ReactNode; }>) {



    return (
        <>
            <div className="card bg-base-200 w-4/5 mx-auto mt-5 p-5">
                <div className="flex">
                    <NavBarDashboardEtudiant/>
                    <div className="card bg-base-100 grow p-3">
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}