let x = 3;
console.log({x});


let y = {
    id: 2,
    profile: {
        name: "foo",
        age: 19
    }
};

let { profile } = y;
console.log(profile);
console.log(y.profile);

console.log({profile});
/*
output:

{ x: 3 }
{ name: 'foo', age: 19 }
{ name: 'foo', age: 19 }
{ profile: { name: 'foo', age: 19 } }
 */