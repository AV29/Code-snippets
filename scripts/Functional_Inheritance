function Machine(power) {
    this._enabled = false;
    this._power = power;

    const self = this;

    this.enable = function () {
        self._enabled = true;
    };

    this.disable = function () {
        self._enabled = false;
    };

}

function CoffeeMachine(power) {
    Machine.apply(this, arguments);

    let waterAmount = 0;
    let timerID = 0;
    this.setWaterAmount = function (amount) {
        waterAmount = amount;
    };

    const parentDisable = this.disable;
    this.disable = function () {
        parentDisable();
        clearTimeout(timerID);
    };

    function onReady() {
        alert('���� �����!');
    }

    this.run = function () {
        if (!this._enabled) {
            throw new Error("Error! Not enabled!");
            /*return;*/
        }
        timerID = setTimeout(onReady, 1000);
    };

}

function Fridge(power) {
    Machine.apply(this, arguments);

    const food = [];

    this.addFood = function (item) {
        if (!this._enabled) {
            throw new Error("The Fridge is off! Cannot add food!");
        }
        if (this.getFood().length + arguments.length >= this._power / 100) {
            throw new Error("Too much food! Can't do it!");
        }
        for (let i = 0; i < arguments.length; i++) {
            food.push(arguments[i]);
        }
        //food.push([].slice.call(arguments));
    };

    const parentDisable = this.disable;
    this.disable = function () {
        parentDisable();
        if (food.length) {
            throw new Error("Error! There's still food in the fridge");
        }
    };

    this.filterFood = function (func) {
        const result = [];

        for (let i = 0; i < food.length; i++) {
            const val = food[i];
            if (func(val)) {
                result.push(val);
            }
        }
        return result;
        //return food.filter(func);
    };

    this.removeFood = function (item) {
        let ind = food.indexOf(item);
        if (ind !== -1) {
            food.splice(ind, 1);
        }
    };

    this.getFood = function () {
        const retFood = [];
        for (let i = 0; i < food.length; i++) {
            retFood[i] = food[i];
        }
        return retFood;
        //return food.slice();
    }
}
try {
    const fridge = new Fridge(500);
    fridge.enable();
    fridge.addFood("Apple");
    fridge.disable();
} catch (e) {
    alert(e.message);
}