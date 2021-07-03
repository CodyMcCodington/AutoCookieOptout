import { log } from "./logger";

function retryUntil<T>(func: () => boolean, retryInterval: number, maxAttempts?: number) {
    return new Promise<void>((resolve, reject) => {
        let attemptsDone = 0;

        function doAttempt() {
            const outcome = func();
            if (outcome) {
                log(`Attempt ${attemptsDone + 1} successful`);
                resolve();
            } else if (attemptsDone < maxAttempts || maxAttempts === undefined) {
                attemptsDone++;
                log(`Attempt ${attemptsDone} unsuccessful, snoozing`)
                setTimeout(doAttempt, retryInterval);
            } else {
                reject();
            }
        }
        doAttempt();
    })
}

export {
    retryUntil,
}