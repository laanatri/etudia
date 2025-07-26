interface LoaderProps {
    isLoading: boolean;
}

export default function Loader({ isLoading }: LoaderProps) {
    if (!isLoading) return null;

    return (
        <div className={`fixed inset-0 z-10 bg-white flex justify-center items-center`}>
            <span className="loading loading-spinner loading-xl text-secondary"></span>
        </div>
    )
}