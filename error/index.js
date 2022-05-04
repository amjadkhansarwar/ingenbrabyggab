class HTTPExcption extends Error{
    constructor(status, message){
         super(message)
         this.status = status

    }
}

class ResourseNotFoundError extends HTTPExcption{
    constructor(resourceName, id){
        super(404, `${resourceName}  with ID: ${id} not found`)
    }
}

module.exports= {HTTPExcption, ResourseNotFoundError}