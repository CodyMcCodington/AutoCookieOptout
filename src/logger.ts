function log(message: string) {
    console.debug(`%cACO 🛡 %c${message}`, "color: green", "color: initial");
}

function logError(message: string) {
    console.error(`%cACO 🛡 %c${message}`, "color: red", "color: initial");
}

export {
    log,
    logError,
}