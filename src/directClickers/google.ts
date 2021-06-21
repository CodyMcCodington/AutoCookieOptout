import { clickAllElements, clickElement } from "../common";

const regexGoogleMainOrImages = /^(www|images)\.google\.[a-z]+$/;
const regexConsentGoogleOrYouTube = /^consent\.(google\.[a-z]+|youtube\.com)$/;

if (document.location.hostname.match(regexGoogleMainOrImages)) {
    // Page 1 when consent is collected through an in-page popup
    // (case: Google web search, Google Images)
    const customizeButton = clickElement('.jyfHyd', true);
} else if (document.location.hostname.match(/^consent\.google\.[a-z]+$/)
        && document.location.pathname === '/m') {
    // Page 1 when consent is collected by redirecting to a full page
    // (case: Google Maps)
    clickElement('a[href^="https://consent.google.com/d?"], .AIC7ge > .lssxud [jsname=V67aGc]');
} else if (document.location.hostname === 'consent.youtube.com' 
        && document.location.pathname === '/m') {
    // Page 1 when consent is collected by redirecting to a full page
    // (case: YouTube, variant 1a/1b)
    clickElement('a[href^="https://consent.youtube.com/d?"], .qqtRac > .lssxud [jsname=V67aGc]');
} else if (document.location.hostname.match(regexConsentGoogleOrYouTube)
        && document.location.pathname === '/d') {
    // Page 2 (case: Google/YouTube, variant 1)
    clickElement('[jsname=yUNjVb]');
    clickElement('[jsname=FXYDXd]');
    clickElement('[jsname=SHqtNc]');
    document.querySelector('form').submit();
} else if (document.location.hostname.match(regexConsentGoogleOrYouTube)
        && document.location.pathname === '/dl') {
    // Page 2 (case: Google/YouTube, variant 2)
    clickAllElements('.setting input[value="false"]');
    clickElement('form[action$="/s"] input[type=submit]');
}