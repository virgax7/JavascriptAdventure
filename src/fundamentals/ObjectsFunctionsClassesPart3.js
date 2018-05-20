class X {
    constructor(name) {
        this.name = name
    }

    sleep() {
        console.log(this.name + " gonna " + "zzZ");
    }
}
let x = new X("rust");
x.sleep(); // rust gonna zzZ
console.log(X.prototype.sleep); // function sleep
console.log(x.sleep == X.prototype.sleep); // true

// remember from part2 the above is similar to
function XUnderTheHood(name) {
    this.name = name;
}

XUnderTheHood.prototype.sleep = function() {
    console.log(this.name + " gonna " + "zzZ");
};
let xUnderTheHood = new XUnderTheHood("rust");
xUnderTheHood.sleep(); // rust gonna zzZ
console.log(xUnderTheHood.sleep == XUnderTheHood.prototype.sleep); // true
console.log(xUnderTheHood.__proto__.sleep == XUnderTheHood.prototype.sleep); // true

// however you need to be careful when doing something like the below

function Bar(name) {
    this.name = name;
}

this.name = "UH";
Bar.prototype.sleep = () => {
    console.log(this);
    console.log(this.name + " gonna  " + "zzZ");
};

let bar = new Bar("blue");
bar.sleep(); // this will print
                // { name: 'UH' }
                // UH gonna zzZ
// "this" isn't bound to the object caller, even though its an object method
// this is because arrow functions inherits the values in the enclosing lexical scope
// which in our case is the global scope..so the 'this' reference belongs to the object ref of this
// in the global scop. you can see this with the this.name = "UH" and then the function printing what it prints


class Foo {
    constructor(name) {
        this.name = name;
        this.hmm();
    }

   hmm() {
        console.log(this.name);
        this.x = "new x";
   }
}

let f = new Foo("f"); // f
console.log(f.x); // new x


















































