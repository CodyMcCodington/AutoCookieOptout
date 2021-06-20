// Vendors we handle by getting triggered when certain JavaScript
// URLs are requested and then messaging the tab that did the request
enum TriggeredVendor {
    CookieBot = 'cookiebot',
    CookiePro = 'cookiepro',
    Quastcast = 'quantcast',
    Didomi = 'didomi',
    TrustArc = 'trustarc',
};

const triggeredVendorPatternLists: Record<TriggeredVendor, string[]> = Object.freeze({
    [TriggeredVendor.CookieBot]: ["https://consent.cookiebot.com/uc.js"],
    [TriggeredVendor.CookiePro]: [
        "https://cookie-cdn.cookiepro.com/scripttemplates/otSDKStub.js",
        "https://cdn.cookielaw.org/scripttemplates/otSDKStub.js",
    ],
    [TriggeredVendor.Didomi]: [
        "https://sdk.privacy-center.org/loader.js?*",
        "https://sdk.privacy-center.org/*/loader.js?*",
    ],
    [TriggeredVendor.Quastcast]: ["https://quantcast.mgr.consensu.org/choice/*"],
    [TriggeredVendor.TrustArc]: [
        "https://trustarc.mgr.consensu.org/*",
    ]
});

export { TriggeredVendor, triggeredVendorPatternLists };