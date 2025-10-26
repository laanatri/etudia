import ExtendedSession from "@/types/ExtendedSession";
import Bloc from "@/types/Bloc";

const getBlocs = async (session: ExtendedSession | null): Promise<Bloc[]> => {
    if (!session?.user?.id) return [];
    const apiUrl = typeof window !== 'undefined' && window.location.hostname === 'localhost'
        ? process.env.NEXT_PUBLIC_API_URL
        : process.env.NEXT_PUBLIC_API_URL_MOBILE;

    const response = await fetch(
        `${apiUrl}/bloc/user/${session.user.id}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session.user.jwtToken}`
            }
        }
    );
    if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`HTTP error, status: ${response.status}, body: ${errorBody}`);
    }
    return await response.json();
};

export default getBlocs;