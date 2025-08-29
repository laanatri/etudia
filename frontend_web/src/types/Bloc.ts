export default interface Bloc {
    id: number;
    name: string;
    themes: string;
    createdAt: string;
    user?: {
        id: number;
        username: string;
        firstname: string;
        lastname: string;
    };
}