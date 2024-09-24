import { vec2, vec3, vec4, dot, cross, norm, normalize, lerp, toVec2, toVec3, toVec4 } from './vec.js';
import { barycentric_coords, tri_area } from './geometry.js';

// VEC TESTS

function slide46() {
    console.log('Slide 46:\n');

    const u = new vec2(2, 1);
    const v = new vec2(4, 3);
    
    console.log("u = " + u);
    console.log("v = " + v);
}

function slide47() {
    console.log('Slide 47:\n');

    const u = new vec3(2, 1, 5);
    const v = new vec3(4, 3, 7);
    
    console.log("u = " + u);
    console.log("v = " + v);
}

function slide48() {
    console.log('Slide 48:\n');

    const u = new vec4(2, 1, 5, 1);
    const v = new vec4(4, 3, 7);
    
    console.log("u = " + u);
    console.log("v = " + v);
}

function slide49() {
    console.log('Slide 49:\n');

    const u = new vec3(2, 1, 2);
    const v = new vec3(1, 3, 3);

    const w1 = u.add(v);
    const w2 = u.sub(v);
    
    console.log("u + v = " + w1);
    console.log("u - v = " + w2);
}

function slide50() {
    console.log('Slide 50:\n');

    const u = new vec2(2, 1);
    const v = new vec3(1, 3, 3);

    try {
        const w1 = u.add(v);
        console.log("u + v = " + w1);
    } catch (e) {
        console.error(e.message);
    }

    try {
        const w2 = u.sub(v);
        console.log("u - v = " + w2);
    } catch (e) {
        console.error(e.message);
    }
}

function slide51() {
    console.log('Slide 51:\n');

    const u = new vec3(2, 1, 2);
    const v = new vec3(1, 3, 3);

    const w1 = u.mult(2);
    const w2 = (u.mult(0.2)).add(v.mult(0.8));
    
    console.log("2u = " + w1);
    console.log("0.2u + 0.8v = " + w2);
}

function slide52() {
    console.log('Slide 52:\n');

    const u = new vec3(2, 3, 4);
    const v = new vec3(6, 4, 5);

    const w = u.mult(v);
    
    console.log("u*v = " + w);
}

function slide53() {
    console.log('Slide 53:\n');

    const u = new vec2(2, 1);
    const v = new vec2(1, 3);

    const a = dot(u, v);
    
    console.log("<u, v> = " + a + '\n');
}

function slide54() {
    console.log('Slide 54:\n');

    const u = new vec3(2, 1, 2);
    const v = new vec3(1, 2, 3);

    const a = dot(u, v);
    
    console.log("<u, v> = " + a + '\n');
}

function slide55() {
    console.log('Slide 55:\n');

    const u = new vec4(2, 1, 0, 1);
    const v = new vec4(1, 3, 2, 2);

    const a = dot(u, v);
    
    console.log("<u, v> = " + a + '\n');
}

function slide56() {
    console.log('Slide 56:\n');

    const u = new vec3(2, 1, 0);
    const v = new vec4(1, 3, 2, 2);

    try {
        const a = dot(u, v);
        console.log("<u, v> = " + a + '\n');
    } catch (e) {
        console.error(e.message);
    }
}

function slide57() {
    console.log('Slide 57:\n');

    const u = new vec3(2, 1, 2);
    const v = new vec3(1, 2, 3);

    const a = cross(u, v);
    
    console.log("u x v = " + a + '\n');
}

function slide58() {
    console.log('Slide 58:\n');

    const u = new vec3(2, 3, 4);
    const n = norm(u);
    const v = normalize(u);
    
    console.log("|u| = " + n + '\n');
    console.log("u/|u| = " + v);
}

function slide59() {
    console.log('Slide 59:\n');

    const A = new vec3(2, 3, 5);
    const B = new vec3(5, 4, 8);
    const C = lerp(0.2, A, B);

    console.log("A = " + A);
    console.log("B = " + B);
    console.log("C = " + C);
}

function slide60() {
    console.log('Slide 60:\n');

    const A = new vec2(2, 3);
    const B = toVec3(A, 4);
    const C = toVec4(A, 4, 5);

    console.log("A = " + A);
    console.log("B = " + B);
    console.log("C = " + C);
}

function slide61() {
    console.log('Slide 61:\n');

    const A = new vec2(2, 3);
    const B = toVec3(A); // z = 0
    const C = toVec4(A); // z = 0, w = 1

    console.log("A = " + A);
    console.log("B = " + B);
    console.log("C = " + C);
}

function slide62() {
    console.log('Slide 62:\n');

    const A = new vec3(2, 3, 4);
    const B = toVec2(A);
    const C = toVec4(A, 5);

    console.log("A = " + A);
    console.log("B = " + B);
    console.log("C = " + C);
}

function slide63() {
    console.log('Slide 63:\n');

    const A = new vec4(2, 3, 5, 4);
    const B = toVec2(A);
    const C = toVec3(A);

    console.log("A = " + A);
    console.log("B = " + B);
    console.log("C = " + C);
}

// vec
slide46();
slide47();
slide48();
slide49();
slide50();
slide51();
slide52();
slide53();
slide54();
slide55();
slide56();
slide57();
slide58();
slide59();
slide60();
slide61();
slide62();
slide63();

// GEOMETRY TESTS

function slide69() {
    console.log('Slide 69:\n');

    const P = [new vec2(0, 1), new vec2(4, 2), new vec2(2, 4)];

    const area = tri_area(P[0], P[1], P[2]);
    console.log("area total = " + area + '\n');

    const areaR = tri_area(P[2], P[1], P[0]);
    console.log("area reversa = " + areaR + '\n');
}

function slide71() {
    console.log('Slide 71:\n');

    const P = [new vec2(0, 1), new vec2(4, 2), new vec2(2, 4)];
    const Q = new vec2(3, 2);

    const a = barycentric_coords(Q, P);
    console.log("coordenadas baricentricas = " + a);

    const vQ = (P[0].mult(a.x)).add(P[1].mult(a.y)).add(P[2].mult(a.z));
    console.log("Q = " + Q);
    console.log("vQ = " + vQ);
}

function slide72() {
    console.log('Slide 72:\n');

    const P = [new vec2(0, 1), new vec2(4, 2), new vec2(2, 4)];
    const R = new vec2(13, 22);

    const b = barycentric_coords(R, P);
    console.log("coordenadas baricentricas = " + b);

    const vR = (P[0].mult(b.x)).add(P[1].mult(b.y)).add(P[2].mult(b.z));
    console.log("R = " + R);
    console.log("vR = " + vR);
}

// geometry
slide69();
slide71();
slide72();

console.log('\n');