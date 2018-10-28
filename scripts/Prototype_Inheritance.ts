function Clock(options) {
    this._template = options.template;
    this._precision = +options.precision || 1000;
}

Clock.prototype.render = function render() {
    const date = new Date();

    let hours = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();
    const output = this._template
        .replace('h', hours < 10 ? '0' + hours : hours)
        .replace('m', min < 10 ? '0' + min : min)
        .replace('s', sec < 10 ? '0' + sec : sec);

    console.log(output);
};

Clock.prototype.stop = function () {
    clearInterval(this._timer);
};

Clock.prototype.start = function () {
    this.render();
    this._timer = setInterval(() => this.render(), 1000);
};

function ExtendedClock(options) {
    Clock.apply(this, arguments);
}

ExtendedClock.prototype = Object.create(Clock.prototype);
ExtendedClock.prototype.constructor = ExtendedClock;

ExtendedClock.prototype.start = function () {
    this.render();
    this._timer = setInterval(() => this.render(), this._precision);
};

const exClock = new ExtendedClock({
    template: 'h:m:s',
    precision: 1000
});
exClock.start();