function sleep(millis) {
    const timeToSleep = Date.now() + millis;
    while (Date.now() < timeToSleep) ;
}

// the timer actually runs in parallel by either the web apis(if you're using browser) or by node engine
// in separate threads and once the main thread is done, they all immediately
// console.log("done") because what really happens is that after the timer has run in their own threads
// they push the callback to the event queue, where the event loop just picks them up and calls their callbacks...

// remember that the sleep(3000) needs to finish first though because the main thread is still running
// and while there is stuff on the main stack, nothing can interrupt it
function foo() {
    setTimeout(() => {
        console.log("done");
    }, 2000);
}

for (let i = 0; i < 10; i++) {
    foo();
}


// like discussed, after 3 seconds we don't wait 17 more seconds 20-3, for the foo tasks to finish
// they are all counting down in their own threads..
sleep(3000);
