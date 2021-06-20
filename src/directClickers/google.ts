import { clickElement } from "../common";

if (document.location.hostname.match(/^(www|images)\.google\.[a-z]+$/)) {
    // Page 1 when consent is collected through an in-page popup
    // (case: Google web search, Google Images)
    const customizeButton = clickElement('.jyfHyd', true);
} else if (document.location.hostname.match(/^consent\.google\.[a-z]+$/)
        && document.location.pathname === '/m') {
    // Page 1 when consent is collected by redirecting to a full page
    // (case: Google Maps)
    clickElement('a[href^="https://consent.google.com/d?"]');
} else if (document.location.hostname === 'consent.youtube.com' 
        && document.location.pathname === '/m') {
    // Page 1 when consent is collected by redirecting to a full page
    // (case: YouTube)
    clickElement('a[href^="https://consent.youtube.com/d?"]');
} else if (document.location.hostname.match(/^consent\.(google\.[a-z]+|youtube\.com)$/)
        && document.location.pathname === '/d') {
    // Page 2
    clickElement('[jsname=yUNjVb]');
    clickElement('[jsname=FXYDXd]');
    clickElement('[jsname=SHqtNc]');
    document.querySelector('form').submit();
}