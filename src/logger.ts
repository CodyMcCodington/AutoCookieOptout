function log(message: string) {
    console.debug(`%cACO 🛡 %c${message}`, "color: green", "color: initial");
}

function logClick(selector: string) {
    console.debug(`%cACO 🛡 %cClicking '%c${selector}'`, "color: green", "color: initial", "color: purple");
}

function logError(message: string) {
    console.error(`%cACO 🛡 %c${message}`, "color: red", "color: initial");
}

export {
    log,
    logClick,
    logError,
}