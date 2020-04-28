/**
 * @name Singleton
 * A simple representation of creating singleton object
 * @example
 * const uni_1 = new Singleton();
 * const uni_2 = new Singleton();
 *
 * uni_1 === uni_2 // true
 */
let Singleton = function () {
    const onlyInstance = this;
    this.size = 'Giant';

    Singleton = function () {
        return onlyInstance;
    }
};

class Singleton_Seed {
    private static _instance: Singleton_Seed;

    private constructor() {
        //...
    }

    public static get Instance() {
        // Do you need arguments? Make it a regular method instead.
        return this._instance || (this._instance = new this());
    }
}

const Singleton_2 = Singleton_Seed.Instance;


/* Addy Osmani */

interface ISingletonOptions {
    pointX?: number,
    pointY?: number
}

const SingletonTester = (function() {
    const Singleton = function(options: ISingletonOptions = {}) {
        this.pointX = options.pointX || 0;
        this.pointY = options.pointY || 0;
    };

    let _instance = null;

    return {
        getInstance: function (options) {
            if(!_instance) {
                _instance = new Singleton(options);
            }

            return _instance;
        }
    };
})();