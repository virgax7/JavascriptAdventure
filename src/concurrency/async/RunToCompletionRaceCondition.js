// building on RunToCompletion.js
// you can introduce some race conditions if you use more async

setTimeout(() => console.log("not really last"), 0);
function sleep(millis) {
    const timeToSleep = Date.now() + millis;
    while (Date.now() < timeToSleep);
}

sleep(1000);
console.log("first");
sleep(1000);
setTimeout(() => console.log("ran to completion, now awaiting last, but didn't really"), 2);
