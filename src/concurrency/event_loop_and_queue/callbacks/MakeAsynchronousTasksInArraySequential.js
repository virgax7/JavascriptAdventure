function synchronizeAsyncTasksArray(asyncFns, cbTasks) {
    for (let i = 0; i < asyncFns.length; i++) {
        if (i >= cbTasks.length) {
            cbTasks.push(() => {});
        }
    }
    let applier = [];
    for (let i = 0; i < asyncFns.length - 1; i++) {
        applier.push(() => {
            asyncFns[i](() => {
                cbTasks[i]();
                applier[i + 1]();
            });
        });
    }
    if (asyncFns.length > 0) {
        applier[asyncFns.length - 1] =
            () => asyncFns[asyncFns.length - 1](cbTasks[asyncFns.length - 1]);
    }
    applier[0]();
}

const asyncFns = (arr =>
        arr.map($ => (callBack) => setTimeout(callBack, 1000))
)([1, 2, 3, 4, 5]);
// the $ which is 1, 2, 3, 4, and then 5 is just a
// was helper that is ignored for me to call map on an array of 5 things. I couldn't find a native
// range function like in java to collect to an array at the end...

const cbTasks = (arr =>
        arr.map(num => () => console.log(num))
)([1, 2, 3, 4, 5]);

synchronizeAsyncTasksArray(asyncFns, cbTasks);