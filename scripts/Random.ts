/**
 * @name getRandomColor
 * Gets random hex color
 * @example
 * const color = getRandomColor();
 */
function getRandomColor(): string {
    const letters: string = '0123456789ABCDEF';
    let color: string = '#';
    for (let i = 0; i < 6; i += 1) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

const getRandom = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
