export default interface CapsuleDatas {
    course: {
        name: string;
        courseUrl: string;
    },
    capsules: {
        flashcard: {
            create: boolean;
            number: number;
        },
        summary: {
            create: boolean;
        },
        quiz: {
            create: boolean;
            number: number;
        },
    },
    user_id: number;
    course_id: number;
};