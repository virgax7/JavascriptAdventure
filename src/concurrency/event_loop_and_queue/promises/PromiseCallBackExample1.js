function asyncFuncStarter(seed) {
    return new Promise(resolve => resolve(seed));
}

let count = 0;

function anotherAsyncFunc(val) {
    console.log("running in order, count is " + ++count + " and val is " + val);
    // apply some func to val, rolling the seed down
    val += 5;
    return new Promise(resolve => resolve(val));
}

// asyncFuncStarter((seed) => {
//     anotherAsyncFunc(seed, (plant) => {
//         anotherAsyncFunc(plant, (tree) => {
//             console.log("we stacked 2 anotherAsynFuncs to run and finally roll out this seed to a tree with value " + tree);
//         })
//     });
// });


asyncFuncStarter(1) // returns new Promise(resolve => resolve(1));

    .then(seed => anotherAsyncFunc(seed)) // then calls our resolve => resolve(1) and returns new Promise(resolve => resolve(val));
                                          // our resolve object in resolve => resolve(1)
                                          // is the anon function seed => anotherAsyncFunc(seed)
                                          // which  is equivalent now of doing anotherAsyncFunc(1)
                                          // the returned new Promise(resolve => resolve(val)) is
                                          // equivalent now to new Promise(resolve => resolve(6));

    .then(plant => anotherAsyncFunc(plant)) // this time, then calls resolve => resolve(val) where val is 6
                                            // our resolve argument is this anon function
                                            // plant => anotherAsyncFunc(plant)
                                            // which is doing anotherAsyncFunc(6)
                                            // and as your know anotherAsyncFunc returns
                                            // new Promise(resolve => resolve(val)) where val = 11

    .then(tree => console.log("tree value : " + tree)); // this time, then calls resolve => resolve(val) where val is 11
                                                          // but it is a terminal then
                                                          // aka no more chained thens
                                                          // our resolve argument is tree => console.log("tree value : " + tree)
                                                          // so in the end the anon func runs with tree being 11, and logs 'tree value :  11'

