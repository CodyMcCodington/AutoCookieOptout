// This script should only be imported in content scripts or background scripts. For common
// functions that are safe for use within page scripts, see common.pagescript.ts instead.

import { browser } from "webextension-polyfill-ts";
import { retryUntil } from "./common.pagescript";
import { log, logClick } from "./logger";

function attachPageScriptForClicker(clickerSlug: string) {
    const scriptTag = document.createElement('script');
    scriptTag.src = browser.runtime.getURL(`src/indirectClickers/${clickerSlug}.pagescript.js`);
    scriptTag.onload = function () {
        scriptTag.remove();
    };
    attachScriptToBodyLoad(scriptTag);
}

function attachScriptToBodyLoad(scriptElement: HTMLScriptElement) {
    if (document.body) {
        log('Inject script into body');
        document.body.appendChild(scriptElement);
    } else {
        log('Deferring script injection until page load');
        document.addEventListener('DOMContentLoaded', () => {
            document.body.appendChild(scriptElement);
        });
    }
}

function clickElement(selector: string, ignoreIfNotPresent = false) {
    const element = document.querySelector(selector);
    if (element instanceof HTMLElement) {
        logClick(selector);
        element.click();
    } else if (!element && ignoreIfNotPresent) {
        return;
    } else {
        throw new Error(`${selector} does not refer to HTML element`);
    }
}

function clickElementIfTextMatches(selector: string, expectedText: string, ignoreIfNotPresent = false) {
    const element = document.querySelector(selector);
    if (!element) {
        if (ignoreIfNotPresent) return false;
        throw new Error(`${selector} does not refer to HTML element`);
    }

    const actualText = element.textContent.trim();
    if (actualText === expectedText) {
        log(`Found the "${expectedText}" button`);
        clickElement(selector);
        return true;
    } else {
        log(`Selector mismatch for '${selector}' - Expected "${expectedText}", found "${actualText}"`);
        return false;
    }
}

function clickAllElements(selector: string) {
    log(`Clicking all matches of ${selector}`);
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

async function clickWhenOneOfFollowingFound(selectors: string[]) {
    const matchedSelector = await untilOneOfFollowingFound(selectors);
    clickElement(matchedSelector);
    return matchedSelector;
}

async function clickAllWhenFound(selector: string) {
    await waitUntilFound(selector);
    clickAllElements(selector);
}

function getCookie(cookieName: string): string | undefined {
    const cookieMatcher = document.cookie.match(`(?:^| )${cookieName}=([^;]+)`);
    if (!cookieMatcher) return undefined;
    return cookieMatcher[1];
}

function hasCookie(cookieName: string) {
    return !!document.cookie.match(`${cookieName}=`);
}

async function untilOneOfFollowingFound(selectors: string[]) {
    const mergedSelector = selectors.join(', ');
    await waitUntilFound(mergedSelector);

    for (const selector of selectors) {
        if (document.querySelector(selector)) {
            log(`Matched with selector ${selector}`);
            return selector;
        }
    }

    throw new Error('Illegal state when checking which selector was found');
}

async function waitUntilFound(selector: string) {
    return new Promise<void>((resolve) => {
        function callback(document: Document) {
            log(`Checking for ${selector}`);
            if (document.querySelector(selector)) {
                log(`Found ${selector}`);
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

function untilStable(milliseconds: number) {
    return new Promise<void>((resolve) => {
        let lastChange = Date.now();
        const observer = new MutationObserver(() => {
            lastChange = Date.now();
        });
        observer.observe(document.querySelector('html'), {
            subtree: true,
            childList: true,
            attributes: true,
        });

        function callback() {
            if (Date.now() - lastChange >= milliseconds) {
                log('Page seems stable');
                observer.disconnect();
                resolve();
            } else {
                log(`Waiting ${milliseconds} more milliseconds until stable`);
                setTimeout(callback, milliseconds);
            }
        }
        callback();
    })
}
export {
    attachPageScriptForClicker,
    attachScriptToBodyLoad,
    clickAllElements,
    clickAllWhenFound,
    clickElement,
    clickElementIfTextMatches,
    clickWhenFound,
    clickWhenOneOfFollowingFound,
    getCookie,
    hasCookie,
    retryUntil,
    untilOneOfFollowingFound,
    untilStable,
};