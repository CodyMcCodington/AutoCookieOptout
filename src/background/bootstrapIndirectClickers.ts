import { browser } from "webextension-polyfill-ts";
import { triggeredVendorPatternLists } from "../indirectClickers/vendors";
import { log } from "../logger";

const unhandledQueue = {};
const tabsThatCanReceive = [];

function catchUpOnMessages(tabId: number) {
    if (unhandledQueue[tabId]) {
        log(`Sending queued clicker trigger ${unhandledQueue[tabId]} to`
            + ` tab ${tabId}`);
        browser.tabs.sendMessage(tabId, unhandledQueue[tabId]);
        delete unhandledQueue[tabId];
    }
}

browser.runtime.onMessage.addListener((message, sender) => {
    if (message === 'tabReady') {
        log(`Tab ${sender.tab.id} pinged us`);
        tabsThatCanReceive.push(sender.tab.id);
        catchUpOnMessages(sender.tab.id);
    }
});

browser.tabs.onUpdated.addListener(async (tabId) => {
    if (await tabInCompleteState(tabId)) {
        log(`Tab ${tabId} has flipped to 'complete' state`);
        tabsThatCanReceive.push(tabId);
        catchUpOnMessages(tabId);
    } else if (tabsThatCanReceive.includes(tabId)) {
        log(`Tab ${tabId} no longer considered to accept messages`);
        tabsThatCanReceive.splice(tabsThatCanReceive.indexOf(tabId), 1)
    }
});

async function tabInCompleteState(tabId: number) {
    try {
        const tab = await browser.tabs.get(tabId);
        return tab.status === 'complete';
    } catch {
        return false;
    }
}

async function setupClicker(clickerSlug: string, matchPatterns: string[]) {
    async function triggerClickerForRequest(request: { url: string, tabId: number }) {
        if (tabsThatCanReceive.includes(request.tabId) && await tabInCompleteState(request.tabId)) {
            log(`Sending clicker trigger '${clickerSlug}' to tab ${request.tabId} because of ${request.url}`);
            browser.tabs.sendMessage(request.tabId, clickerSlug);
        } else {
            log(`Queuing clicker trigger '${clickerSlug}' for tab ${request.tabId} because of ${request.url}`);
            unhandledQueue[request.tabId] = clickerSlug;
        }
        return {};
    }

    browser.webRequest.onBeforeRequest.addListener(
        triggerClickerForRequest,
        {
            urls: matchPatterns,
            types: ["script"],
        }
    )
}

for (const vendorPatternList of Object.keys(triggeredVendorPatternLists)) {
    setupClicker(vendorPatternList, triggeredVendorPatternLists[vendorPatternList]);
}