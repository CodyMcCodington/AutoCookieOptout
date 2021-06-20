import { triggeredVendorPatternLists } from "../indirectClickers/vendors";

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