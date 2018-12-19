class Anton {
    private _age;

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