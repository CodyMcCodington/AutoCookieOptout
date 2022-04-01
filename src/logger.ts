function log(message: string) {
    console.debug(`ACO 🛡 ${message}`);
}

function logClick(selector: string) {
    console.debug(`ACO 🛡 Clicking '${selector}'`);
}

function logError(message: string) {
    console.error(`ACO 🛡 ${message}`);
}

export {
    log,
    logClick,
    logError,
}