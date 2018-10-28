function Animal(name) {
    this.name = name;
}

Animal.prototype.canRun = true;
Animal.prototype.canSpeak = false;
Animal.prototype.callIt = function () {
    console.log(this.name);
};
//	var animal = {
//     canRun:true,
//     canSpeak:false
// };

function Wolf(name) {
    this.name = name;
    //Animal.apply(this, arguments);
}
function inherit(proto) {
    function F() {
    }

    F.prototype = proto;
    return new F;
}
//Wolf.prototype = Object.create(Animal.prototype);
Wolf.prototype = Object.create(Animal.prototype);
//Wolf.prototype.constructor = Wolf;
//Wolf.prototype = new Animal();
//Wolf.prototype = Animal.prototype;
const wolfy = new Wolf("wolfy");
const animal = new Animal("anton");
//wolfy.__proto__ = Animal.prototype;
//wolfy = Object.create(animal);
console.log(wolfy);

// function A() {  console.log("A!")}
// function B() {  console.log("B!")}
// A.prototype = new B();
// var a = new A();
// B.bb=function (){alert('');}
// console.log(a.bb())