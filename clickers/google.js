if (document.location.hostname.match(/^(www|images)\.google\.[a-z]+$/)) {
    // Page 1 when consent is collected through an in-page popup
    // (case: Google web search, Google Images)
    const customizeButton = document.querySelector('.jyfHyd');

    if (customizeButton) {
        customizeButton.click();
    }
} else if (document.location.hostname.match(/^consent\.google\.[a-z]+$/)
        && document.location.pathname === '/m') {
    // Page 1 when consent is collected by redirecting to a full page
    // (case: Google Maps)
    document.querySelector('a[href^="https://consent.google.com/d?"]').click();
} else if (document.location.hostname === 'consent.youtube.com' 
        && document.location.pathname === '/m') {
    // Page 1 when consent is collected by redirecting to a full page
    // (case: YouTube)
    document.querySelector('a[href^="https://consent.youtube.com/d?"]').click();
} else if (document.location.hostname.match(/^consent\.(google\.[a-z]+|youtube\.com)$/)
        && document.location.pathname === '/d') {
    // Page 2
    document.querySelector('[jsname=yUNjVb]').click();
    document.querySelector('[jsname=FXYDXd]').click();
    document.querySelector('[jsname=SHqtNc]').click();
    document.querySelector('form').submit();
}