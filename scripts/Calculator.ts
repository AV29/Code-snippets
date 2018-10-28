function Calculator() {
    const methods = {
        "+": function (a, b) {
            return a + b;
        },
        "-": function (a, b) {
            return a - b;
        }
    };
    this.calculate = function (str) {
        const spl = str.split(" ");
        return methods[spl[1]](+spl[0], +spl[2]);
    };

    this.addMethod = function (name, func) {
        methods[name] = func;
    };
}