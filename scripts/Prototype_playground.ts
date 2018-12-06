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
function extend(proto) {
    function F() {
    }

    F.prototype = proto;
    var object = new F;
    debugger;
    return object;
}

//object.__proto__ = Human.prototype;
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

function Human() {
    this.name = 'Human';
}

function Anton(age) {
    this.age = age;
}

function Tosik(age) {
    this.age = age;
}

Human.prototype.qwerty = 'xxx';
Human.prototype.name = 'Shit';

Anton.prototype = /*new Human('Anton');*/Object.create(Human.prototype);
Tosik.prototype = extend(Human.prototype);
Anton.prototype.constructor = Anton;
Tosik.prototype.constructor = Tosik;
Anton.prototype.name = 'Volos';
Tosik.prototype.name = 'Volos';


const anton = new Anton(30);
const tosik = new Tosik(30);

/**
 *
 *
 Prototype reminder


 Human and Anton

 const hum = {legsCount: 2}

 Anton.prototype = hum; // every newly created object’s __proto__ will point at Anton.prototype, in this case hum object

 var ant = new Anton();  // ant.legsCount === 2

 ant.constructor // undefined -> should remember to save constructor. Either add it to Anton.prototype.constructor or do like Anton.prototype.legsCount = 2

 search chain for object should be: anton -> Anton.prototype -> Human.prototype

 if we do this: Anton.prototype = new Human(); then search chain becomes anton -> Anton.prototype === human instance -> Human.prototype;   human instance should be skipped


 So the right choice is to Anton.prototype = Object.create(Human.prototype);

 and don’t forget to save constructor property Anton.prototype.constructor = Anton;

 Object.create (extend) under the hood does this:
 function extend(proto) {
    function F() {
    }

    F.prototype = proto;
    return new F;
 }

 it creates and returns an empty object which __proto__ is set to what we wanted -> Human.prototype. We could pass any custom object like {twoLegs: true}
 // object.__proto__ === Human.prototype // true
 so basically we then make our Anton.prototype pointing on this empty object. But the main point is that is has in its __proto__ reference -> Human.prototype
 //object.__proto__ = Human.prototype;
 //Anton.prototype = object (which __proto__ leads us to Human.prototype) ==> Anton.prototype.__proto__ = Human.prototype
 or (as for future Anton objects: anton.__proto__ === Anton.prototype (it is set automatically)) anton.__proto__.__proto__ = Human.prototype;

 same here:

 Anton.prototype.__proto__ === Human.prototype // true!
 so Anton.prototype.__proto__ would get for us a parent's prototype object
 ... every time when we create new Anton -> anton's object __proto__ points on its own prototype (Anton.prototype)
 and anton.__proto__.__proto__ which is Anton.prototype.__proto__ points on Human.prototype

 var a = new Anton();
 var b = new Anton();
 a === b // false
 a.__proto__ === b.__proto__ // true
 *
 * */