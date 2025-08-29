export default interface ExtendedSession {
    user: {
        id: number;
        jwtToken: string;
        username?: string;
        email?: string;
    };
}