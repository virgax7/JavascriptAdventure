// say you needed to sync async calls

// you can do something like this

function asyncFuncStarter(anotherAsyncFunc) {
    const seed = 1;
    anotherAsyncFunc(seed);
}

let count = 0;

function anotherAsyncFunc(val, callBackFunc) {
    console.log("running in order, count is " + ++count + " and val is " + val);
    // apply some func to val, rolling the seed down
    val += 5;
    callBackFunc(val);
}

asyncFuncStarter((seed) => {
    anotherAsyncFunc(seed, (plant) => {
        anotherAsyncFunc(plant, (tree) => {
            console.log("we stacked 2 anotherAsynFuncs to run and finally roll out this seed to a tree with value " + tree);
        })
    });
});

/*
The reason why this async calls works is because the seeder function is async so asyncFuncStarter
will run after the main thread code have run to completion.
afterwards it's anotherAsyncFunc callback will be picked up by the event loop and put on the main thread to run where
that will console log once and mutate val, and then place its callback(anotherAsyncFunc) onto the event queue
which will later get picked up and ran in the main thread doing another console, and then it will call its callback
and just without placing anything in the queue since we aren't dispatching another async func, console log the final statement :)
 */
