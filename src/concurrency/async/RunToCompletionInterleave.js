// things outside of the main thread can interleave
function sleep(millis) {
    const timeToSleep = Date.now() + millis;
    while (Date.now() < timeToSleep) ;
}

let result = "";
let printOnce = 1;

function foo() {
    setTimeout(() => {
        result += "_";
        console.log(result);
    }, 0);
    setTimeout(() => {
        result += "-"
        if (printOnce++ === 100) {
            console.log(result);
        }
    }, 3000);
}


for (let i = 0; i < 100; i++) {
    foo();
}


