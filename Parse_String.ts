let inputString = "{Anton{Kse{ASDasdasdads}niya} {Mama} Vlasik}bdkdkfjds,dskfdkdkfdk{fjdkdkdklsjfslfslsdjldkfsldfjslkfjsldjk";

function parseString(input: string, opening: string = '{', closing: string = '}') {
    const DEFAULT_COLOR = 'transparent';
    const colorMap = ['green', 'blue', 'red', 'purple', 'yellow'];
    const parse = [];
    const startIndexes = {};
    let string = '';
    let depth = 0;
    for (let i = 0; i < input.length; i += 1) {
        const currentChar = input.charAt(i);
        if (currentChar === closing && depth > 0) {
            parse.push({
                color: colorMap[depth - 1] || DEFAULT_COLOR,
                start: startIndexes[depth],
                end: i + 1,
                string: input.slice(startIndexes[depth] + 1, i)
            });
            depth -= 1;
            string += `</span>${currentChar}`;
        } else if (currentChar === opening) {
            depth += 1;
            startIndexes[depth] = i;
            string += `${currentChar}<span style="color:${colorMap[depth - 1] || DEFAULT_COLOR}">`;
        } else {
            string += currentChar;
        }
    }
    return {parse, string};
}

let start = performance.now();
const {string, parse} = parseString(inputString);
console.log(performance.now() - start);
console.log(parse);

document.body.innerHTML = string;
