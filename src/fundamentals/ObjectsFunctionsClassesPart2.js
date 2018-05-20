// lets get on with classes

// under the hood classes are just syntactic sugar
class Person {
    constructor(name) {
        this.name = name;
    }

    sleep() {
        console.log("zzZ");
    }
}

console.log(Person); // [Function: Person]
console.log(Person.prototype.sleep); // [Function: sleep]
console.log(Person.prototype.constructor === Person); // true

let personFromClass = new Person("actias");
console.log(personFromClass); // Person { name: 'actias' }
personFromClass.sleep(); // zzZ

// yes the constructor is just the function Person(name) itself

// under the hood the above is similar to
function PersonClassUnderTheHood(name) {
   this.name = name;
}

PersonClassUnderTheHood.prototype.sleep = function () {
    console.log("zzZ");
};

let personFromClassUnderTheHood = new PersonClassUnderTheHood("luna");
console.log(personFromClassUnderTheHood); // PersonClassUnderTheHood { name: 'luna' }
personFromClassUnderTheHood.sleep(); // zzZ


// let's demonstrate the constructor returning something again
class LastProto { // seem familiar ?
    constructor(age) {
        this.age = 'over 9000';
        return this;
    }
}


let a = new LastProto();
let b = Object.create(LastProto.prototype);

console.log(a); // LastProto { age: 'over 9000' }
console.log(b); // LastProto {}

// lets get on with class extends

class Bar {
    constructor(name) {
        this.name = name + " from bar";
    }

    speak() {
        console.log("I am bar");
        console.log("I am " + this.name + " from bar");
    }

    barFunc() {
        console.log("printing name : " + this.name);
    }
}

class Foo extends Bar {
    constructor(name) {
        super(name);
        this.name = name + " from foo";
    }

    speak() {
        console.log("I am foo");
        console.log("I am " + this.name + " from foo");
    }

    fooFunc() {}
}

console.log(Foo.prototype.__proto__.speak); // [Function: speak]
console.log(Foo.prototype.__proto__.barFunc); // [Function: barFunc]

let foo = new Foo("foo"); // I am foo
foo.speak(); // I am foo from foo from foo

// the below is pretty interesting... this is because foo.__proto__ is just the class Foo's prototype with this.name not assigned to anything
foo.__proto__.speak(); // I am undefined from foo
console.log(foo.__proto__ == Foo.prototype); // true

// the below is interesting too.. it will print foo from foo because this.name is name + " from foo" because it overrode name + " from bar"
foo.barFunc(); // printing name : foo from foo


console.log(foo.__proto__.speak == foo.speak); // true
console.log(foo.__proto__.__proto__.speak == foo.speak); // false, because it belongs to Bar's speak function
console.log(foo.__proto__.__proto__.speak); // [Function : speak]




















