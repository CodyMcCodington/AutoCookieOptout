import { browser } from "webextension-polyfill-ts";

function attachPageScriptForClicker(clickerSlug: string) {
    const scriptTag = document.createElement('script');
    scriptTag.src = browser.runtime.getURL(`src/indirectClickers/${clickerSlug}.pagescript.js`);
    scriptTag.onload = function() {
        scriptTag.remove();
    };
    attachScriptToBodyLoad(scriptTag);
}

function attachScriptToBodyLoad(scriptElement: HTMLScriptElement) {
    if (document.body) {
        console.debug('Inject script into body');
        document.body.appendChild(scriptElement);
    } else {
        console.debug('Deferring script injection until page load');
        document.addEventListener('DOMContentLoaded', () => {
            document.body.appendChild(scriptElement);
        });
    }
}

function clickElement(selector: string, ignoreIfNotPresent = false) {
    const element = document.querySelector(selector);
    if (element instanceof HTMLElement) {
        console.debug(`Clicking ${selector}`);
        element.click();
    } else if (!element && ignoreIfNotPresent) {
        return;
    } else {
        throw new Error(`${selector} does not refer to HTML element`);
    }
}

function clickAllElements(selector: string) {
    console.debug(`Clicking all matches of ${selector}`);
    const elements = document.querySelectorAll(selector);
    for (const element of elements) {
        if (element instanceof HTMLElement) {
            element.click();
        }
    }
}

async function clickWhenFound(selector: string) {
    await waitUntilFound(selector);
    clickElement(selector);
}

async function clickAllWhenFound(selector: string) {
    await waitUntilFound(selector);
    clickAllElements(selector);
}

function retryUntil<T>(func: () => boolean, retryInterval: number, maxAttempts?: number) {
    return new Promise<void>((resolve, reject) => {
        let attemptsDone = 0;

        function doAttempt() {
            const outcome = func();
            if (outcome) {
                console.debug(`Attempt ${attemptsDone + 1} successful`);
                resolve();
            } else if (attemptsDone < maxAttempts || maxAttempts === undefined) {
                attemptsDone++;
                console.debug(`Attempt ${attemptsDone} unsuccessful, snoozing`)
                setTimeout(doAttempt, retryInterval);
            } else {
                reject();
            }
        }
        doAttempt();
    })
}

async function waitUntilFound(selector: string) {
    return new Promise<void>((resolve) => {
        function callback(document: Document) {
            console.debug(`Checking for ${selector}`);
            if (document.querySelector(selector)) {
                console.debug(`Found ${selector}`);
                observer.disconnect();
                resolve();
            }
        }
        const observer = new MutationObserver(() => {
            callback(document);
        });

        observer.observe(document.querySelector('html'), {
            subtree: true,
            childList: true,
            attributes: true,
        });
        callback(document);
    })
}

export {
    attachPageScriptForClicker,
    attachScriptToBodyLoad,
    clickElement,
    clickAllElements,
    clickWhenFound,
    clickAllWhenFound,
    retryUntil,
};