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

function Human(name) {
    this.name = name;
}

function Anton(age) {
    this.age = age;
}

Human.prototype.qwerty = 'xxx';
Human.prototype.name = 'Shit';

Anton.prototype = new Human('Anton');//Object.create(Human.prototype);
Anton.prototype.constructor = Anton;
Anton.prototype.name = 'Volos';


const anton = new Anton(30);

/**
 *
 *
 Prototype reminder


 Human and Anton

 const hum = {legsCount: 2}

 Anton.prototype = hum; // every newly created object’s __proto__ will point at Atnon.prototype, in this case hum object

 var ant = new Anton();  // ant.legsCount === 2

 ant.constructor // undefined -> should remember to save constructor. Either add it to Anton.prototype.constructor or do like Anton.prototype.legsCount = 2

 search chain for object should be: anton -> Anton.prototype -> Human.prototype

 if we do this: Anton.prototype = new Human(); then search chain becomes anton -> Anton.prototype === human instance -> Human.prototype;   human instance should be skipped


 So the right choice is to Anton.prototype = Object.create(Human.prototype);
 and don’t forget to save constructor property Anton.prototype.constructor = Anton;
 
 var a = new Anton();
 var b = new Anton();
 a === b // false
 a.__proto__ === b.__proto__ // true
 *
 * */