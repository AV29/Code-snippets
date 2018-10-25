var inputString = "{Anton{Kse{ASDasdasdads}niya} {Mama} Vlasik}bdkdkfjds,dskfdkdkfdk{fjdkdkdklsjfslfslsdjldkfsldfjslkfjsldjk";
function parseString(input, opening, closing) {
    if (opening === void 0) { opening = '{'; }
    if (closing === void 0) { closing = '}'; }
    var DEFAULT_COLOR = 'transparent';
    var colorMap = ['green', 'blue', 'red', 'purple', 'yellow'];
    var parse = [];
    var startIndexes = {};
    var string = '';
    var depth = 0;
    for (var i = 0; i < input.length; i += 1) {
        var currentChar = input.charAt(i);
        if (currentChar === closing && depth > 0) {
            parse.push({
                color: colorMap[depth - 1] || DEFAULT_COLOR,
                start: startIndexes[depth],
                end: i + 1,
                string: input.slice(startIndexes[depth] + 1, i)
            });
            depth -= 1;
            string += "</span>" + currentChar;
        }
        else if (currentChar === opening) {
            depth += 1;
            startIndexes[depth] = i;
            string += currentChar + "<span style=\"color:" + (colorMap[depth - 1] || DEFAULT_COLOR) + "\">";
        }
        else {
            string += currentChar;
        }
    }
    return { parse: parse, string: string };
}
var start = performance.now();
var _a = parseString(inputString), string = _a.string, parse = _a.parse;
console.log(performance.now() - start);
console.log(parse);
document.body.innerHTML = string;
