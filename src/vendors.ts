enum Vendor {
    CookieBot = 'cookiebot',
    Consensu = 'consensu',
    Didomi = 'didomi',
    CookiePro = 'cookiepro',
};

const vendorPatternLists: Record<Vendor, string[]> = Object.freeze({
    [Vendor.CookieBot]: ["https://consent.cookiebot.com/uc.js"],
    [Vendor.Consensu]: ["https://quantcast.mgr.consensu.org/choice/*"],
    [Vendor.Didomi]: [
        "https://sdk.privacy-center.org/loader.js?*",
        "https://sdk.privacy-center.org/*/loader.js?*",
    ],
    [Vendor.CookiePro]: [
        "https://cookie-cdn.cookiepro.com/scripttemplates/otSDKStub.js",
        "https://cdn.cookielaw.org/scripttemplates/otSDKStub.js",
    ],
});

export { Vendor, vendorPatternLists };