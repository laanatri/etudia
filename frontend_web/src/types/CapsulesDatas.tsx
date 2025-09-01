export default interface CapsuleDatas {
    selectedFile: File | null;
    capsules: {
        flashCard: {
            create: boolean;
            number: number;
        },
        resume: {
            create: boolean;
        },
        quizz: {
            create: boolean;
            number: number;
        };
    };
};