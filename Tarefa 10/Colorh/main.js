import { lerpColor, orange, toVec, RGB } from "./color.js";

const c1 = "#7d663a";
const c2 = orange;
const c3 = lerpColor(0.2, c1, c2);

console.log("c1 =" + toVec(c1).toString());
console.log("c2 =" + toVec(c2).toString());
console.log("c3 =" + toVec(c3).toString());