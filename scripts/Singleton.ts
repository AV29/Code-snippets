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