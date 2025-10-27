import ExtendedSession from "@/types/ExtendedSession";
import Bloc from "@/types/Bloc";

const getBlocs = async (session: ExtendedSession | null): Promise<Bloc[]> => {
    if (!session?.user?.id) return [];

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/bloc/user/${session.user.id}`,
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