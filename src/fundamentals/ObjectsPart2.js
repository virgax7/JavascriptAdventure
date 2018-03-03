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

// under the hood the above is is really just
function PersonClassUnderTheHood(name) {
   this.name = name;
}

PersonClassUnderTheHood.prototype.sleep = function () {
    console.log("zzZ");
}

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

