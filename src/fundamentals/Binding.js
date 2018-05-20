class Foo {
    constructor() {
        this.name = "foo";
        console.log(this);
    }

    getPrintThisFunc() {
        return this.printThisFunc;
    }

    printThisFunc() {
        console.log(this);
    }
}

let foo = new Foo();
foo.getPrintThisFunc()();

// foo's this would print "Foo { name: 'foo' }"
// however, the this in printThisFunc is undefined because it's not binded

class Bar {
    constructor() {
        this.name = "bar";
        console.log(this);
        this.printThisFuncBinded = this.printThisFunc.bind(this);
    }

    getPrintThisFunc() {
        return this.printThisFuncBinded;
    }

    printThisFunc() {
        console.log(this);
    }
}

let bar = new Bar();
bar.getPrintThisFunc()();
// the above would print
/*
Bar { name: 'bar' }
Bar {
  name: 'bar',
  printThisFuncBinded: [Function: bound printThisFunc] }
 */


// the point being that if you get a function back from a function, an then you wanna call that returned function,
// like in our example, the function you got back from bar.getPrintThisFunc()
// Then, since you are no longer calling it as an object method, you need to bind the returned function to the object's this

// this is easily shown in another example where if you called it as an object method, then 'this' is already bound
class Car {
    constructor() {
        this.name = "car";
        console.log(this);
        this.printThisFuncBinded = this.printThisFunc.bind(this);
    }

    getPrintThisFunc() {
        this.printThisFunc();
    }

    printThisFunc() {
        console.log(this);
    }
}

let car = new Car();
car.getPrintThisFunc();
// since you called the above with the 'this' already bound, because javascript sees it as an object method, you get
/*
Car { name: 'car' }
Car {
  name: 'car',
  printThisFuncBinded: [Function: bound printThisFunc] }
 */


// in react if you have something like
/*
render() {
    return (
        <button onClick={this.handleClick}>
            {this.state.isToggleOn ? 'ON' : 'OFF'}
        </button>
    );
}
*/


// it will be transpiled into
/*
    key: 'render',
    value: function render() {
      return React.createElement(
        'button',
        { onClick: this.handleClick },
        this.state.isToggleOn ? 'ON' : 'OFF'
      );
    }
 */


// here you can see that the render method will return a React element object
// that has a object, which has the callback function this.handleClick.

// by the time that callback gets called, its no longer called somewhere down the line from having called it(not as a callback) as an object method
// of the encompassing object that holds the function that holds this key and value pair
// lexical declaration(just plain text/code inside the function)-- meaning that the function belongs to that object

// in this case the this inside of the handleClick method, isn't the encompassing React element object.. so we need to
// explicitly bind it to be for that this.handleClick callback, which at the time it was made, the this in this.handleClick
// refers to that encompassing React element object...

