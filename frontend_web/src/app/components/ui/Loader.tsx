interface LoaderProps {
    isLoading: boolean;
    classSup?: string
}

export default function Loader({ isLoading, classSup = "fixed" }: LoaderProps) {
    if (!isLoading) return null;

    return (
        <div className={`inset-0 z-10 flex justify-center items-center p-10 bg-base-300 ${classSup}`}>
            <span className="loading loading-spinner loading-xl text-secondary"></span>
        </div>
    )
}