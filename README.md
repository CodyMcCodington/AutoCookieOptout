# Auto Cookie Optout
You have the right to choose which cookies you're okay with. If your choice is 'only mandatory cookies', we'd like to automate that for you.

Non-exhaustive list of supported websites:

- Websites with cookie consent plugins from common vendors like TrustArc, Didomi and CookiePro
- Various Google properties including web search, Google Maps and YouTube (including some regional variations)
- Yahoo and affiliated websites like TechCrunch

## How we do it
Auto Cookie Optout tries to opt out of all optional cookies on supported sites in the most user-friendly way possible. Ideally we opt you out before you even see the cookie consent popup. We have the following assumptions:

- Websites should not set any optional cookies until they've registered your consent
- Not loading the cookie consent popup is therefore equivalent to opting out of all optional cookies in the popup, and it saves users a few extra seconds

Because of this we will try not to load cookie consent scripts where possible. This is especially effective on sites that integrate a third-party cookie consent script. For sites where that approach isn't easily feasible, we try to automatically deselect all optional cookies and submit the form. Of course, it's hard to scale this approach when most websites have their own type of cookie wall. For now, we will focus on big websites as well as third-party cookie consent scripts that are deployed on a wide ranges of sites.

## Disclaimer and other legal stuff
Use this plugin at your own risk. We do not accept any form of liability, including but not limited to you accidentally opting in to cookies you did not want. Scripts may break from time to time when websites update their cookie walls. If you find a bug in one of our scripts, you can open a new issue ticket.

## Questions

### Why does the extension need permission to run on all websites?
We don't have a full list of every website we support. If you're on a website that happens to use a compatible third-party cookie consent vendor, the plugin will detect it and take action. We've open sourced the extension so you can verify that we use this permission responsibly. We also don't obfuscate our builds so that you can inspect them.

### Is this legal?
ACO is a tool to automatically excercise your right to opt out of optional cookies. Unlike other legal plugins like uBlock Origin, it doesn't attempt to block ads. Maybe someday there will be a standardized optout system on browser level that every website uses. That would make a one-time universal optout a lot easier. Until then, we're happy to help.