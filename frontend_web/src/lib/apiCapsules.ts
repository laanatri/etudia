import CapsuleDatas from "@/types/CapsulesDatas";
import ExtendedSession from "@/types/ExtendedSession";

const saveCapsules = async (datasCreateCapsule: CapsuleDatas, session: ExtendedSession | null): Promise<boolean | null> => {

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/capsule/create`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${session?.user.jwtToken}`
                },
                body: JSON.stringify(datasCreateCapsule)
            }
        );

        if (response.ok) {
            const data = await response.json();
            console.log(data)
            return data;
        } else {
            console.error("saveCapsules non ok", response.status, await response.text().catch(()=>""));
        }

    } catch(error) {
        console.error("saveCapsules error", error);
    }
    return null;

}

export default saveCapsules;