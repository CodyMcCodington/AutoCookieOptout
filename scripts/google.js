if (document.location.hostname.match(/^www\.google\.[a-z]+$/)) {
    // Page 1
    const customizeButton = document.querySelector('.jyfHyd');

    if (customizeButton) {
        customizeButton.click();
    }
} else if (document.location.hostname.match(/^consent\.google\.[a-z]+$/)) {
    // Page 2
    document.querySelector('[jsname=yUNjVb]').click();
    document.querySelector('[jsname=FXYDXd]').click();
    document.querySelector('[jsname=SHqtNc]').click();
    document.querySelector('form').submit();
}