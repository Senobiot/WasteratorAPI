module.exports = class ApiErrors extends Error {
    constructor(status, message, errors = []){
        super(message);   
        this.status = status;
        this.errors = errors;
    }
     
    static UnauthorizedError(){
       return new ApiErrors(401, 'User not authorized')
    }

    static BadRequest(message, errors){
        return new ApiErrors(400, message, errors)
    }

    static CollectionError(message){
        return new ApiErrors(500, message);
    }
}