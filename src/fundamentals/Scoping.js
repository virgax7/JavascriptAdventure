var blockScoped = 88888;
{
    const blockScoped = 5;
    // block scoping means not just the immediate block, but also child blocks..
    {
        console.log(blockScoped);
    }
    // this execution context has its own variable blockScoped to mean what it means in its context, forget the outside
    function ConstructorFn(blockScoped) {
        console.log(blockScoped);
        this.blockScoped = blockScoped;
    }
}

const obj = new ConstructorFn(10);

console.log(obj.blockScoped);

// should have printed
// 5
// 10
// 10

