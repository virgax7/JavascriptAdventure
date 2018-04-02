function synchronizeAsyncTasksArray(array) {
    let prev = () =>
        new Promise(resolve => resolve());

    for (let i = 0; i < array.length; i++) {
        let prevCopy = prev;
        prev = () =>
            prevCopy().then(() =>
                new Promise(resolve =>
                    array[i](resolve, i))
            )
    }
    prev();
}

const array = (arr =>
        arr.map(num =>
            (callBack, data) =>
                setTimeout(() => {
                    console.log(data);
                    callBack();
                }, 1000)
        )
)([1, 2, 3, 4, 5]);

synchronizeAsyncTasksArray(array);
