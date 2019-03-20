class UnauthorizedError extends Error {
    public constructor(message: string) {
        super(message);

        this.name = 'UnauthorizedError';
    }
}

export default UnauthorizedError;
