import { clickAllElements, clickElement, clickWhenFound, getCookie, hasCookie } from "../common";
import { log } from "../logger";

function hasConsentCookieSet() {
    const consentCookie = getCookie('CONSENT');
    return consentCookie && consentCookie.startsWith('YES+');
}

function handleInPagePopup(selectorToClick: string) {
    if (hasConsentCookieSet()) {
        log('Consent cookie found, assuming already opted out');
        clickElement(selectorToClick, true); // Just in case...
    } else {
        log('Waiting for consent popup to appear');
        clickWhenFound(selectorToClick);
    }
}

// Google has a bunch of consent popup variations in circulation across their different services.
// It's quite hard to keep track and to keep up but here we go
const regexGoogleMainOrImages = /^(www|images)\.google\.([a-z]+|co\.uk)$/;
const regexConsentGoogleOrYouTube = /^consent\.(google\.([a-z]+|co\.uk)|youtube\.com)$/;

if (document.location.hostname.match(regexGoogleMainOrImages)) {
    log('Using approach for main/image Google');
    // Page 1 when consent is collected through an in-page popup
    // on Google web search or Google Images. Press the 'Customize'
    // button. Selector 1 is from an older google version, selector 2
    // is a newer variation.
    handleInPagePopup('.jyfHyd, #VnjCcb');
} else if (document.location.hostname.match(/^consent\.google\.([a-z]+|co\.uk)$/)
        && document.location.pathname === '/m') {
    log('Using approach for page 1 of the Google consent process');
    // Page 1 when consent is collected by redirecting to a full page
    // in services like Google Maps
    clickElement('a[href^="https://consent.google.com/d?"], .AIC7ge > .lssxud [jsname=V67aGc]');
} else if (document.location.hostname === 'consent.youtube.com' 
        && document.location.pathname === '/m') {
    log('Using approach for page 1 of the YouTube consent process');
    // Page 1 when consent is collected by redirecting to a full page
    // on YouTube
    clickElement('a[href^="https://consent.youtube.com/d?"], .qqtRac > .lssxud [jsname=V67aGc]');
} else if (document.location.hostname === 'www.youtube.com') {
    log('Using approach for the YouTube in-page popup');
    // Page 1 when served as an in-page popup on YouTube. Press the
    // 'Customize' button. Press the 'Customize' button.
    handleInPagePopup('a[href^="https://consent.youtube.com/d?"]');
} else if (document.location.hostname.match(regexConsentGoogleOrYouTube)
        && document.location.pathname === '/d') {
    log('Using approach for page 2 of the Google/YouTube consent process (variation 1)');
    // Page 2 for Google and YouTube (specific variants)
    clickElement('[jsname=yUNjVb]');
    clickElement('[jsname=FXYDXd]');
    clickElement('[jsname=SHqtNc]');
    document.querySelector('form').submit();
} else if (document.location.hostname.match(regexConsentGoogleOrYouTube)
        && document.location.pathname === '/dl') {
    log('Using approach for page 2 of the Google/YouTube consent process (variation 2)');
    // Page 2 for Google and YouTube (specific variants)
    clickAllElements('.setting input[value="false"]');
    clickElement('form[action$="/s"] input[type=submit]');
} else {
    log('No matching approach found');
}