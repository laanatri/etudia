export default interface Bloc {
    id: number;
    name: string;
    themes: string;
    createdAt: string;
    bestScore: number;
    isFavorite: boolean;
    user?: {
        id: number;
        username: string;
        firstname: string;
        lastname: string;
    };
}