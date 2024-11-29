import { barycentricCoords, triArea } from "./geometry.js";
import { vec2 } from "./vec.js";

const P = [
    new vec2([0, 1]),
    new vec2([4, 2]),
    new vec2([2, 4])
]

const area = triArea(P[0], P[1], P[2]);
const areaR = triArea(P[2], P[1], P[0]);

console.log(area, areaR)

const Q = new vec2([3, 2]);

const a = barycentricCoords(Q, P);

const aValues = a.value.flat();

const vQ = P[0].mult(aValues[0])
    .add(P[1].mult(aValues[1]))
    .add(P[2].mult(aValues[2]));

console.log(a.toString())
console.log(Q.toString())
console.log(vQ.toString())


// P está dentro do triângulo?
console.log(
    aValues[0] >= 0 && aValues[0] <= 1 &&
    aValues[1] >= 0 && aValues[1] <= 1 &&
    aValues[2] >= 0 && aValues[2] <= 1 ?
    'Sim' : 'Não'
)