class AntonInsecure {
    private _age: number;

    public get Age(): number {
        return this._age;
    }

    public set Age(value: number) {
        this._age = value;
    }

    constructor(age: number) {
        this._age = age;
    }
}

let AntonSecure = /** @class */ (function () {
    function AntonSecure(age) {
        this._age = age;
    }

    Object.defineProperty(AntonSecure.prototype, "Age", {
        get: function () {
            return this._age;
        },
        set: function (age) {
            this._age = age;
        },
        enumerable: true,
        configurable: true
    });
    return AntonSecure;
}());


var Base = /** @class */ (function () {
    function Base(base) {
        this._base = base;
    }

    Object.defineProperty(Base.prototype, "Base", {
        get: function () {
            return this._base;
        },
        set: function (base) {
            this._base = base;
        },
        enumerable: true,
        configurable: true
    });
    return Base;
}());

let AntonSuperSecure = (function () {
    let _age;

    function AntonSuperSecure(age) {
        Base.apply(this, arguments);
        _age = age;
    }

    Object.defineProperty(AntonSuperSecure.prototype, "Age", {
        get: function () {
            return _age;
        },
        set: function (age) {
            _age = age;
        },
        enumerable: true,
        configurable: true
    });
    return AntonSuperSecure;
}());

//AntonSuperSecure.prototype = Object.create(Base.prototype);
//AntonSuperSecure.prototype.constructor = AntonSuperSecure;

function AntonMegaSecure(age) {
    let _age = age;

    this.Age = function (age) {
        if (arguments.length === 0) return _age;
        _age = age;
    };
}

AntonMegaSecure.prototype = Object.create(Base.prototype);
AntonMegaSecure.prototype.constructor = AntonMegaSecure;
