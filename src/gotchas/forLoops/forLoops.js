let array = [1, 2, 3];

let zeroOneTwo = "";
for (let element in array) {
    zeroOneTwo += element;
}
console.log(zeroOneTwo);
// the reason why this prints 0,1,2 is because the array object looks something like this
// 0: 1, 1: 2, 2: 3
// this means the following below can happen

let offsetArray = [];
offsetArray[3] = "start";
let offsetArrayString = "";
for (let i = 0; i < offsetArray.length; i++) {
    offsetArrayString += offsetArray[i];
}
console.log(offsetArrayString); // will print undefinedundefinedundefinedstart

// however, a nice thing about in is that it will avoid this for example the below
let anotherOffsetArray = [];
anotherOffsetArray[10] = "start";
for (let element in anotherOffsetArray) {
    console.log(element); // will print 10
}


// use of when iterating primitive arrays, you will get the what you want
let oneTwoThree = "";
for (let element of array) {
    oneTwoThree += element;
}
console.log(oneTwoThree);


// "The for...in statement iterates over the enumerable properties of an object. For each distinct property, statements can be executed."
// -https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in

// This is especially dangerous when you are iterating over nodes in a DOM, see forLoopsDemo.html


// example of where in might be used, but you should always be careful

var candy = {name: "jolly rancher", calories: 20};

for (let property in candy) {
    console.log(property + " : " + candy[property]);
}
