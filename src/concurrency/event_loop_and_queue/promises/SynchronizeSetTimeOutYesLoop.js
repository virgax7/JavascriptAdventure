function synchronizeAsyncTasksArray(array) {
    let prev = () =>
        new Promise(resolve => resolve());

    for (let i = 0; i < array.length; i++) {
        let prevCopy = prev;
        prev = () =>
            prevCopy().then(() =>
                new Promise(resolve =>
                    array[i](resolve))
            )
    }
    prev();
}

const array = (arr =>
        arr.map(num =>
            callBack =>
                setTimeout(() => {
                    console.log(num);
                    callBack();
                }, 1000)
        )
)([1, 2, 3, 4, 5]);

synchronizeAsyncTasksArray(array);

// some notes about prevCopy and closures

// prevCopy is needed otherwise an infinite recursion will happen
// also prevCopy needs to be block scoped, hence declared with keyword 'let'
// otherwise infinite recursion will happen again if array.length > 1
// because when the prev(); is executed it will call prevCopy which
// is the latest prev, and that prevCopy will again call prevCopy
// which is the same latest prev and not the one captured using closure of a block
// scoped variable by using let

// thanks to closure we can do stuff like
let x = () => console.log("HI");
let y = x;
x = () => y();
y();

