/*
    Closures are stack frame that when a function starts execution and held in memory
    after it returns as it if were living in the heap

    ... inspired from https://stackoverflow.com/questions/111102/how-do-javascript-closures-work
    ... from the answer of user https://stackoverflow.com/users/247482/flying-sheep
 */

function log42ButActuallyLog43() {
    let num = 42;
    var say = function () {
        console.log(num);
    };
    num++;
    return say; // when you return say, the num is still referencing the function scoped variable num
}

log42ButActuallyLog43()();

function log42ButActuallyLog43EasyFix() {
    let num = 42;
    const numCopy = num; // this one clones the variable, and not keep around a reference because
    // its not a function(which is an object) being returned, the const has nothing to do with it
    // other than making it final would be a good practice
    var say = function () {
        // const numCopy = num; this doesn't work because when you actually run this function
        // by then, num would be 43 and numCopy references num so its 43
        console.log(numCopy);
    };
    num++;
    return say; // when you return say, the num is still referencing the function scoped variable num
}

log42ButActuallyLog43EasyFix()();

console.log("\n--------------------------------------------------------------------------------------------\n");

var gLogNumber, gSetNumber;

function setupSomeGlobals() {
    var num = 42;
    gLogNumber = function () {
        console.log(num);
    };
    gSetNumber = function (x) {
        num = x;
    };
}

setupSomeGlobals();
gLogNumber(); // 43
gSetNumber(5);
gLogNumber(); // 5

var oldLog = gLogNumber;

setupSomeGlobals(); // a new stack frame is created, so num is fresh and is
// not the same as the num that the older function objects reference such as oldLog
gLogNumber(); // 42

oldLog(); // 5

console.log("\n--------------------------------------------------------------------------------------------\n");

var buildList = function (list) {
    var result = [];
    for (var i = 0; i < list.length; i++) {
        // for (let i = 0; i < list.length; i++) { This is a fix because var defines variable globally,
        // while let creates in block scope so outside the for loop, you can't get the value of i

        // another fix is to replace the use of i with j within the loop
        // let j = i;
        var item = 'item' + i;
        result.push(function () {
            console.log(item + ' ' + list[i])
            console.log("i is " + i);
        });
    }
    // console.log(i); // this will print 2.. while if I used let, it will say i is not defined
    return result;
};

function testList(buildFunction) {
    var list = buildFunction([1, 2]);
    for (var i = 0; i < list.length; i++) {
        list[i]();
    }
};

testList(buildList); //logs "item2 undefined" 2 times because i is 2 after the loop


function buildListOlderFix(list) {
    var result = [];
    for (var i = 0; i < list.length; i++) {
        extracted(i, result, list);
    }
    return result;
};

function extracted(i, result, list) { // this guy makes a copy of the i variable to this functions scope so this is fine to use look at line 111 for example
    var item = 'item' + i;
    result.push(function () {
        console.log(item + ' ' + list[i])
        console.log("i is " + i);
    });
    return item;
}

testList(buildListOlderFix);

var functionScopedVar;

function someFunction() {
    var result = [];
    functionScopedVar = 5;
    copyFunctionScopedVar(result, functionScopedVar);
    functionScopedVar++;
    return result;
}

function copyFunctionScopedVar(result, functionScopedVar) {
    result.push(function () {
        console.log(result[0]);
        console.log(functionScopedVar);
    });
}

someFunction()[0](); // this will print 5 and not six
console.log(functionScopedVar); // this will 6
console.log("\n--------------------------------------------------------------------------------------------\n");

// This final example shows that each call creates a separate closure for the local variables.
// There is not a single closure per function declaration. There is a closure for each call to a function.

function newClosure(someNum, someRef) {
    // Local variables that end up within closure
    var num = someNum;
    var anArray = [1, 2, 3];
    var ref = someRef;
    return function (x) {
        num += x;
        anArray.push(num);
        console.log('num: ' + num +
            '; anArray: ' + anArray.toString() +
            '; ref.someVar: ' + ref.someVar + ';');
    }
}

obj = {someVar: 4};
fn1 = newClosure(4, obj);
fn2 = newClosure(5, obj);
fn1(1); // num: 5; anArray: 1,2,3,5; ref.someVar: 4;
fn2(1); // num: 6; anArray: 1,2,3,6; ref.someVar: 4;
obj.someVar++;
fn1(2); // num: 7; anArray: 1,2,3,5,7; ref.someVar: 5;
fn2(2); // num: 8; anArray: 1,2,3,6,8; ref.someVar: 5;
