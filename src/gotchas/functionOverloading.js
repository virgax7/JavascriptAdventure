// function overloading doesn't exists :P

function foo(x, y) {
    console.log(x + " " + y);
}

function foo(x) {
    console.log(x);
}

foo(1); // this guy prints 1
foo(1, 2); // this guy also prints 1...

// since functions are objects the later defined function will overwrite the existing one
