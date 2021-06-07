function clickElement(selector: string, ignoreIfNotPresent = false) {
    const element = document.querySelector(selector);
    if (element instanceof HTMLElement) {
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
    return new Promise<void>((resolve) => {
        function callback(document: Document) {
            console.debug(`Checking for ${selector}`);
            if (document.querySelector(selector)) {
                console.debug(`Found ${selector}`);
                observer.disconnect();
                clickElement(selector);
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

async function clickAllWhenFound(selector: string) {
    return new Promise<void>((resolve) => {
        function callback(document: Document) {
            console.debug(`Checking for all matching ${selector}`);
            if (document.querySelector(selector)) {
                console.debug(`Found ${selector}`);
                observer.disconnect();
                clickAllElements(selector);
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
    clickElement,
    clickAllElements,
    clickWhenFound,
    clickAllWhenFound,
};