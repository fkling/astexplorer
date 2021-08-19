function firstViolationMessage(errors){
    let firstViolation = errors.find(error => error["severityLevel"] === "Violation")
    let line = firstViolation["position"]["start"]["line"]
    let column = firstViolation["position"]["start"]["column"]
    let message = firstViolation["message"]
    return message + " " + "(" + line + ":" + column + ")"
}

module.exports = {firstViolationMessage}