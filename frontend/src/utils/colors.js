export const fixTailwindColors = (element) => {
    const clone = element.cloneNode(true);
    clone.style.position = 'absolute';
    clone.style.left = '-9999px';
    clone.style.width = `${element.offsetWidth}px`;
    document.body.appendChild(clone);

    const convertOklch = (value) => {
        const oklchRegex = /oklch\(([^)]+)\)/g;
        return value.replace(oklchRegex, (match) => {
            return match.replace('oklch', 'rgb');
        });
    };

    const allElements = clone.querySelectorAll('*');
    allElements.forEach(el => {
        const computed = window.getComputedStyle(el);

        if (computed.backgroundColor.includes('oklch')) {
            el.style.backgroundColor = convertOklch(computed.backgroundColor);
        }

        if (computed.color.includes('oklch')) {
            el.style.color = convertOklch(computed.color);
        }

        if (computed.borderColor.includes('oklch')) {
            el.style.borderColor = convertOklch(computed.borderColor);
        }
    });

    return clone;
};