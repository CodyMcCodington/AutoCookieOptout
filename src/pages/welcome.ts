import { vendorPatternLists } from "../vendors";

document.querySelectorAll('[data-element-to-open]').forEach((element) => {
    if (element instanceof HTMLElement) {
        element.onclick = () => {
            document.querySelector('.prompt').classList.remove('visible');
            setTimeout(() => {
                document.querySelector(`.${element.attributes['data-element-to-open'].value}`).classList.add('visible');
            }, 100);
        }
    }
});

document.querySelector('.patternList').textContent = Object.values(vendorPatternLists).map((list) => list.join('\n')).join('\n');