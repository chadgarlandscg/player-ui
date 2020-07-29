console.log("Hello, world!");

var x: string = "test";

function addNumbers(x: number, y: number): number {
    return x + y;
}

const y = addNumbers(2, 3);

function addNames(n1: string, n2: string) {
    console.log(n1 + n2);
    return n1 + n2;
}

const z = addNames("sergio", "chad");

console.log(z);