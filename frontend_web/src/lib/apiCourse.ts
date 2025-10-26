import CourseReponse from "@/types/CourseResponse";

const saveCourse = async (nameCourse: string, courseUrl: string, session: any): Promise<CourseReponse | null> => {

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/course/create`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${session?.user.jwtToken}`
                },
                body: JSON.stringify({
                    name: nameCourse,
                    courseUrl: courseUrl,
                    user: { id: session?.user.id || 0 }
                })
            }
        );

        if (response.ok) {
            const data = await response.json() as CourseReponse;
            return data;
        } else {
            console.error("saveCourse non ok", response.status, await response.text().catch(()=>""));
        }

    } catch(error) {
        console.error("saveCourse error", error);
    }

    return null;

}

export default saveCourse;