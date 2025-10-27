export default interface Summary {
    id: number;
    name: string;
    themes: string;
    summaryUrl: string;
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