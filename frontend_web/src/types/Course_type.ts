export default interface Course {
    id: number;
    name: string;
    courseUrl: string;
    createdAt: string;
    user?: {
        id: number;
        username: string;
        firstname: string;
        lastname: string;
    };
}