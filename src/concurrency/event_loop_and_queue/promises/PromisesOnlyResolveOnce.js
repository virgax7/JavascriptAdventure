let promise = new Promise(resolve => {
    setTimeout(() => {
        console.log("5 will");
        resolve(5);
        console.log("not get printed");
    }, 2000);
    console.log("First");
    resolve(7);
});

console.log("MIDDLE");


promise.then(num => {
    console.log("HI");
    console.log(num);
    console.log("bye");
});


