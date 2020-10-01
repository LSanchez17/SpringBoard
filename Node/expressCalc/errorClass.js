class CustomError extends Error {
    constructor(message, error = 500){
        this.message = message;
        this.status = error;
        console.error(this.stack)
    }
}