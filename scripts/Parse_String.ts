namespace ParseString {

    const props = {
        delimiters: [],
        tag: 'span',
        searchWords: [],
        colors: [],
        defaultColor: '#333',
        solidHighlight: true,
        caseSensitive: true
    };

    export function parseString(input: string, opening: string = '{', closing: string = '}') {
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

   function getRegExp(props) {
        const {searchWords, caseSensitive} = props;
        if (!searchWords) {
            return null;
        }
        if (!(searchWords instanceof Array)) {
            throw new Error('Search Words should be an Array type!!!');
        }
        const string = searchWords.reduce((result, current) => result.concat(`${current}|`), '');
        return new RegExp(string, `g${!caseSensitive ? 'i' : ''}`);
    }


    function getOpeningTag(tag, depth) {
        const {colors = [], defaultColor, solidHighlight} = props;
        const color = colors[depth - 1] || defaultColor;
        const style = solidHighlight ? `background-color:${color};` : `color:${color};`;
        return `<${tag} style="${style}">`;
    }

    const regExp = getRegExp(props);

    export function parseString_2(input) {
        const {delimiters, tag, searchWords} = props;
        const stack = [];
        let string = '';
        let depth = 0;
        if (delimiters && !searchWords) {
            for (let i = 0; i < input.length;) {
                const startDelimitersPair = delimiters.find(({start}) => input.substr(i, start.length) === start);
                const endDelimitersPair = delimiters.find(({end}) => input.substr(i, end.length) === end);
                if (endDelimitersPair && depth > 0) {
                    if (stack[stack.length - 1] === endDelimitersPair.start) {
                        depth -= 1;
                        stack.pop();
                        string += `</${tag}>${endDelimitersPair.end}`;
                    } else {
                        string += endDelimitersPair.end;
                    }
                    i += endDelimitersPair.end.length;
                } else if (startDelimitersPair) {
                    depth += 1;
                    stack.push(startDelimitersPair.start);
                    string += `${startDelimitersPair.start}${getOpeningTag(tag, depth)}`;
                    i += startDelimitersPair.start.length;
                } else {
                    string += input.charAt(i);
                    i += 1;
                }
            }
            return string;
        } else if (searchWords && !delimiters) {
            return input.replace(/\n$/g, '\n\n').replace(regExp, `${getOpeningTag(tag, 1)}$&</${tag}>`);
        }
    }
}
