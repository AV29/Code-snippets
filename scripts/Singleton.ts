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

class Singleton_Seed
{
    private static _instance: Singleton_Seed;

    private constructor()
    {
        //...
    }

    public static get Instance()
    {
        // Do you need arguments? Make it a regular method instead.
        return this._instance || (this._instance = new this());
    }
}

const Singleton_2 = Singleton_Seed.Instance;