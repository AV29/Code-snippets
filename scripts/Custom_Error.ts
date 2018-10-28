function CustomError(message) {
    this.name = "CustomError";
    this.message = message;

    if (Error["captureStackTrace"]) {
        Error["captureStackTrace"](this, this.constructor);
    } else {
        this.stack = (new Error()).stack;
    }
}

CustomError.prototype = Object.create(Error.prototype);
CustomError.prototype.constructor = CustomError;

function PropertyError(property) {
    CustomError.call(this, "Error in property" + property);
    this.name = "PropertyError";

    this.property = property;
}

PropertyError.prototype = Object.create(CustomError.prototype);
PropertyError.prototype.constructor = PropertyError;

function PropertyRequiredError(property) {
    PropertyError.call(this, property);
    this.name = 'PropertyRequiredError';
    this.message = 'Required property ' + property;
}

PropertyRequiredError.prototype = Object.create(PropertyError.prototype);
PropertyRequiredError.prototype.constructor = PropertyRequiredError;

const err = new PropertyRequiredError("age");

console.log(err);

alert(err instanceof PropertyRequiredError); // true
alert(err instanceof PropertyError); // true
alert(err instanceof CustomError); // true
alert(err instanceof Error); // true