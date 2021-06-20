// Vendors we handle by getting triggered when certain JavaScript
// URLs are requested and then messaging the tab that did the request
enum TriggeredVendor {
    CookieBot = 'cookiebot',
    CookiePro = 'cookiepro',
    Consensu = 'consensu',
    Didomi = 'didomi',
};

const triggeredVendorPatternLists: Record<TriggeredVendor, string[]> = Object.freeze({
    [TriggeredVendor.CookieBot]: ["https://consent.cookiebot.com/uc.js"],
    [TriggeredVendor.CookiePro]: [
        "https://cookie-cdn.cookiepro.com/scripttemplates/otSDKStub.js",
        "https://cdn.cookielaw.org/scripttemplates/otSDKStub.js",
    ],
    [TriggeredVendor.Consensu]: ["https://quantcast.mgr.consensu.org/choice/*"],
    [TriggeredVendor.Didomi]: [
        "https://sdk.privacy-center.org/loader.js?*",
        "https://sdk.privacy-center.org/*/loader.js?*",
    ],
});

export { TriggeredVendor, triggeredVendorPatternLists };