# Auto Cookie Optout
You have the right to choose which cookies you're okay with. If your choice is "as little as possible", we'd like to automate that for you.

Non-exhaustive list of currently supported websites:

- Google.com and certain regional variations
- YouTube
- Yahoo and affiliated websites like TechCrunch
- Websites that use TrustArc's cookie wall

## How we do it
Auto Cookie Optout will try to deselect every optional cookie type on supported websites. Of course, it's hard to scale this approach when most websites have their own flavor of the cookie wall popup. For now, we will focus on big websites as well as generic cookie walls that are deployed on a wide ranges of sites. Once we've got the basics down, we might develop some kind of domain-specific language that makes it easier to add support for new websites.

## Disclaimer and other legal stuff
Use this plugin at your own risk. We do not accept any form of liability, including but not limited to you accidentally opting in to cookies you did not want. Scripts may break from time to time when websites update their cookie walls. If you find a bug in one of our scripts, please report an issue.

## Questions

### Can't you just hide cookie walls?
This is an extension to help you correctly register your opt outs automatically. If you merely want to hide cookie walls where possible, I would look into specialized uBlock Origin filters.

### Why don't you reverse engineer which cookie to set to signal optout, set the cookie and bypass the clicking entirely?
Reverse engineering is also susceptible to incorrect assumptions. Some sites do more than just set a cookie indicating you've seen the cookie wall, so as above, we're trying to make sure your opt out is registered correctly.

### Is this legal?
It's a privacy tool like any other. It's clicking the same buttons you'd normally have to click by hand, except automatically. Maybe someday there will be a standardized optout system on browser level that every website uses. That would make opting out everywhere a lot easier. Until then, we're happy to help.