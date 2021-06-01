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

export {
    clickElement,
};