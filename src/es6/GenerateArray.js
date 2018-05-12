// #FFA737
const randomNum = () => Math.floor(Math.random() * 9);
const arrayOfColors = Array.from(
    {length: 50},
    () => "#FFA" + randomNum() + randomNum() + randomNum()
);

console.log(arrayOfColors);

