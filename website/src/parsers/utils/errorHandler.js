class ErrorHandler  {

    constructor(error) {
        this.error = error
    }

    report(result) {
        this.error.message = result["message"]
        this.error.location = result["location"]
        this.error.lineNumber = result["position"]["start"]["line"]
        throw this.error
    }

    getResults() {
        return [];
    }
}

function getProvider(parser){
    const error = SyntaxError()
    return parser.ErrorHandler.provider(new ErrorHandler(error))
}

module.exports = {ErrorHandler,getProvider}