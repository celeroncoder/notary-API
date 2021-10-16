export class DBRepositoryException extends Error {
    constructor(public message: string) {
        super(message);
    }
}
