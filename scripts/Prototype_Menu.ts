function Menu(state): void {
    this._state = state || this.STATE_CLOSED;
}

Menu.prototype.STATE_OPEN = 1;
Menu.prototype.STATE_CLOSED = 0;

Menu.prototype.open = function () {
    this._state = this.STATE_OPEN;
};

Menu.prototype.close = function () {
    this._state = this.STATE_CLOSED;
};

Menu.prototype._stateAsString = function () {
    switch (this._state) {
        case this.STATE_OPEN:
            return 'Opened';

        case this.STATE_CLOSED:
            return 'Closed';
    }
};

Menu.prototype.showState = function () {
    alert(this._stateAsString());
};
//----------------------------------------------------------------------------------------

function AnimatingMenu(state?): void {
    Menu.apply(this, arguments);
}

AnimatingMenu.prototype = Object.create(Menu.prototype);
AnimatingMenu.prototype.constructor = AnimatingMenu;

AnimatingMenu.prototype.STATE_ANIMATED = 2;
AnimatingMenu.prototype.open = function () {
    let self = this;
    this._state = this.STATE_ANIMATED;
    this._timerID = setTimeout(function () {
        Menu.prototype.open.call(self);
    }, 1000);
};

AnimatingMenu.prototype.close = function () {
    clearTimeout(this._timerID);
    Menu.prototype.close.call(this);
};

AnimatingMenu.prototype._stateAsString = function () {
    switch (this._state) {
        case this.STATE_ANIMATED:
            return 'Animated';

        default :
            return Menu.prototype._stateAsString.call(this);
    }

};

//----------------------------------------------------------------------------------------

const menu = new AnimatingMenu();

menu.showState();

menu.open();
menu.showState();

setTimeout(function () {
    menu.showState();

    menu.close();
    menu.showState();
}, 1000);