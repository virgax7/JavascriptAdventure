// in javascript, things run to completion and events placed on the queue cannot interrupt until everything in
// the main thread runs to completion

setTimeout(() => console.log("last"), 0);
function sleep(millis) {
    const timeToSleep = Date.now() + millis;
    while (Date.now() < timeToSleep);
}

sleep(1000);
console.log("first");
sleep(1000);
console.log("ran to completion, now awaiting last");
