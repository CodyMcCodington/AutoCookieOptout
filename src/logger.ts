function log(message: string) {
    console.debug(`%cACO 🛡 %c${message}`, "color: green", "color: black");
}

function logClick(selector: string) {
    console.debug(`%cACO 🛡 %cClicking '%c${selector}%c'`, "color: green", "color: black", "color: purple", "color: black");
}

function logError(message: string) {
    console.error(`%cACO 🛡 %c${message}`, "color: red", "color: black");
}

export {
    log,
    logClick,
    logError,
}