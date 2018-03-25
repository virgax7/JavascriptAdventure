new Promise(resolve =>
    setTimeout(() => {
        console.log("first");
        resolve("1");
    }, 1000)
)
.then(num =>
    new Promise(resolve =>
        setTimeout(() => {
            console.log(num);
            console.log("second");
            resolve("2");
        }, 1000)
    )
)
.then(num =>
    new Promise(resolve =>
        setTimeout(() => {
            console.log(num);
            console.log("third");
            resolve("3");
        }, 1000)
    )
)
.then(num => console.log(num));