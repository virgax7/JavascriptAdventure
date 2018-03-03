// all console logs with === print true

// the ancestor of almost all prototypes is Object.prototype
let emptyObject1 = {};
console.log(emptyObject1.__proto__ === Object.prototype);

// you guessed it, an Object is a Function
console.log(Object); // [Function: Object]
// it inherits from Function.prototype
console.log(Object.__proto__ === Function.prototype);
// and Function.prototype inherits from Object.prototype
console.log(Object.__proto__.__proto__ === Object.prototype);

// you can make your own Object which inherits just the same as the native js Object
// remember the new operator operates on the operand by using its prototype and constructing
// an object where the constructed object's .__proto__ is the prototype of the operand
let myObject = new Function();
console.log(myObject.__proto__ === Function.prototype);








// the new keyword demonstrated again, as it takes Object.prototype and assigns it as
// the .__proto__ of the new object
let emptyObject2 = new Object();
console.log(emptyObject2.__proto__ === Object.prototype);


// Object.create(proto) does something like below
Object.myCreate = function (proto) {
    let resultingObject = function () {};
    resultingObject.prototype = proto;
    return new resultingObject();
};


// say you had a constructor called Proto
function Proto() {}
Proto.prototype.name = "NotProto";

let objFromCreate = Object.create(Proto);
let objFromMyCreate = Object.myCreate(Proto);
console.log(objFromCreate.__proto__ === objFromMyCreate.__proto__);
// however none of these guys inherited Proto.prototype.name, rather
// their .__proto__ points to Proto, and Proto.name is "Proto"
console.log(objFromCreate.name); // Proto
console.log(objFromMyCreate.name); // Proto

// however, if you do
let newObjectFromProto = new Proto();
// you will get NotProto because it sets the Proto.prototype as the new object's .__proto__
console.log(newObjectFromProto.name); // NotProto
console.log(newObjectFromProto.__proto__.name); // NotProto

// in order to achieve the same thing from Object.create, just do this
let newObjFromCreate = Object.create(Proto.prototype);
console.log(newObjFromCreate.name); // NotProto
console.log(newObjFromCreate.__proto__.name); // NotProto

// the lesson is that be careful on what you actually want to achieve,
// about who you want the .__proto__ of the new object to point to...


// one last thing for part 1,
// there is actually a difference between doing new Proto() vs Object.create(Proto.prototype)
// its demonstrated with the example below

function AnotherProto() {
    return new Number(5);
}

let x = new AnotherProto();
let y = Object.create(AnotherProto.prototype);

console.log(x); // [Number: 5]
console.log(y); // AnotherProto {}

// the difference here is just that Object.create returns that
// resultingObject as demonstrated from Object.myCreate
// but the new keyword will return either that resultingObject
// if the constructor function AnotherProto doesn't return an object already
// but you can leverage this and pass the resultingObject to the constructor function
// to set some properties to it before returning... This is a convenience type of thing

// what I mean is that internally the new keyword at the return step of the new object
// will do something like
// return LastProto.call(resultingObject) || resultingObject;

function LastProto() {
    // the this is resultingObject passed internally from the new keyword
    // where javascript engine does LastProto.call(resultingObject)
    // to bind this to the resultingObject
    this.age = "over 9000";
    return this;
}

let a = new LastProto();
let b = Object.create(LastProto.prototype);

console.log(a); // LastProto { age: 'over 9000' }
console.log(b); // LastProto


