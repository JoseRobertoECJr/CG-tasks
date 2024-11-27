import { dot, vec2, vec3, vec4 } from './vec.js';

// const u = new vec2([2, 1]);
// const v = new vec2([1, 3]);

// const u = new vec3([2, 1, 2]);
// const v = new vec3([1, 2, 3]);

const u = new vec4([2, 1, 0, 1]);
const v = new vec4([1, 3, 2, 2]);

const a = dot(u, v);

console.log("<u, v> = " + a + '\n');