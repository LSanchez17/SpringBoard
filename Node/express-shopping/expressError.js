class CustomErrors extends Error {
    constructor(message, error = 500){
        super();
        this.message = message;
        this.errorCode = error;
        console.error(this.stack)
    }
}

module.exports = { 
    CustomErrors
}