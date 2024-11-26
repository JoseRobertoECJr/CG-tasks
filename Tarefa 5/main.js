import { Vec, vec2, vec3, vec4, toMat } from './vec.js';
import { sampleBezier, sampleBezierSpline, translation } from './geometry.js';
import { Mat, mat2, mat3, mat4, mat2x2, mat2x3, mat2x4, mat3x2, mat3x3, mat3x4, mat4x2, mat4x3, mat4x4, transpose, inverse, toMatT } from './matrix.js';
import { plot } from 'nodeplotlib';

const CP = [
    new vec2([250, 275]),
    new vec2([150, 350]),
    new vec2([200, 200]),
    new vec2([250, 250]),

    new vec2([200, 100]),
    new vec2([250, 100]),
    new vec2([275, 225]),

    new vec2([300, 150]),
    new vec2([350, 200]),
    new vec2([300, 250]),

    new vec2([350, 350]),
    new vec2([300, 350]),
    new vec2([250, 275])
];

const P = sampleBezierSpline(3, CP, 30);

function slide5() {

    const v = new vec2([220, 50]);

    const Q = translation(P, v);

    const data = [
        {
            x: P.map(p => p.value[0][0]),
            y: P.map(p => p.value[1][0]),
            type: 'scatter',
            line: { color: '#ff5656' }
        },
        {
            x: Q.map(p => p.value[0][0]),
            y: Q.map(p => p.value[1][0]),
            type: 'scatter',
            line: { color: '#3b3bff' }
        }
    ];

    plot(data);
}

function slide8() {
    const A = new Mat(2, 3, [
        [3, 2, 1],
        [1, 4, 5]
    ]);

    console.log('A', A.toString());

    const B = new Mat(5, 2, [
        [3, 2],
        [1, 4],
        [2, 6],
        [3, 7],
        [8, 9],
    ]);

    console.log('B', B.toString());
}

function slide9() {
    const C = new Mat(4, [
        [3, 2, 3, 8],
        [1, 4, 2, 1],
        [2, 6, 0, 2],
        [3, 7, 8, 4]
    ]);

    console.log('C', C.toString());
}

function slide11() {
    const A = new mat2([
        [3, 2],
        [4, 1]
    ]);

    console.log('A', A.toString());

    const B = new mat3([
        [0, 2, 1],
        [2, 1, 5],
        [7, 6, 2]
    ]);

    console.log('B', B.toString());
}

function slide12() {
    const C = new mat4([
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [3, 1, 3, 3],
        [6, 7, 8, 9]
    ]);

    console.log('C', C.toString());
}

function slide13() {
    const A = new mat2x3([
        [3, 2, 5],
        [4, 1, 2]
    ]);

    console.log('A', A.toString());

    const B = new mat2x4([
        [0, 2, 1, 6],
        [2, 1, 5, 4]
    ]);

    console.log('B', B.toString());
}

function slide14() {
    const A = new mat2x4([
        [3, 2, 2, 8],
        [4, 1, 4, 7]
    ]);

    const At = transpose(A);

    console.log('At', At.toString());
}

function slide15() {
    const A = new mat2x4([
        [3, 2, 2, 8],
        [4, 1, 4, 7]
    ]);

    const B = new mat4x3([
        [2, 3, 2],
        [5, 2, 8],
        [3, 1, 9],
        [7, 4, 6]
    ]);
    
    const C = A.mult(B);

    console.log('C', C.toString());
}

function slide17() {
    const A = new mat2([
        [3, 2],
        [4, 1]
    ]);
    
    const u = new vec2([1, 3]);
    const v = A.mult(u);

    console.log('v', v.toString());
}

function slide18() {
    const A = new mat2([
        [3, 2],
        [4, 1]
    ]);

    const Ai = inverse(A);
    console.log('Ai', Ai.toString());

    const I = A.mult(Ai);
    console.log('Ai*A', I.toString());
}

function slide19() {
    const a1 = new vec2([5, 3]);
    const a2 = new vec2([8, 5]);
    const a3 = new vec2([6, 4]);

    const M = toMat(a1, a2, a3);

    console.log('M', M.toString());
}

function slide20() {
    const a1 = new vec3([2, 5, 3]);
    const a2 = new vec3([8, 4, 5]);
    const a3 = new vec3([9, 6, 4]);
    const a4 = new vec3([3, 7, 8]);

    const M = toMat(a1, a2, a3, a4);

    console.log('M', M.toString());
}

function slide21() {
    const a1 = new Vec(5, [5, 3, 4, 9, 8]);
    const a2 = new Vec(5, [8, 5, 1, 0, 2]);

    const M = toMat(a1, a2);

    console.log('M', M.toString());
}

function slide22() {
    const A = new mat4([
        [5, 3, 4, 8],
        [9, 8, 2, 6],
        [8, 7, 6, 5],
        [5, 7, 9, 4]
    ]);

    const B = toMatT(3, A);

    console.log('A', A.toString());
    console.log('B', B.toString());
}

function slide23() {
    const A = new mat3([
        [5, 3, 4],
        [9, 8, 2],
        [8, 7, 6]
    ]);

    const B = toMatT(4, A);

    console.log('A', A.toString());
    console.log('B', B.toString());
}

function slide24() {
    const a1 = new vec3([2, 5, 4]);
    const a2 = new vec3([3, 2, 1]);
    const a3 = new vec3([1, 5, 9]);

    const A = toMatT(4, toMat(a1, a2, a3));

    console.log('A', A.toString());
}

// avancado do 26
function slide27() {

    // transformacao linear
    const M = new mat2([
        [2.2, 0],
        [0, 1.3]
    ]);

    let Q = M.mult(P);

    const data = [
        {
            x: P.map(p => p.value[0][0]),
            y: P.map(p => p.value[1][0]),
            type: 'scatter',
            line: { color: '#ff5656' }
        },
        {
            x: Q.map(p => p.value[0][0]),
            y: Q.map(p => p.value[1][0]),
            type: 'scatter',
            line: { color: '#3b3bff' }
        }
    ];

    plot(data);
}

function slide29() {

    // cisalhamento
    const M = new mat2([
        [1, 1.8],
        [0, 1]
    ]);

    let Q = M.mult(P);

    const data = [
        {
            x: P.map(p => p.value[0][0]),
            y: P.map(p => p.value[1][0]),
            type: 'scatter',
            line: { color: '#ff5656' }
        },
        {
            x: Q.map(p => p.value[0][0]),
            y: Q.map(p => p.value[1][0]),
            type: 'scatter',
            line: { color: '#3b3bff' }
        }
    ];

    plot(data);
}

function slide31() {

    // espelhamento horizontal
    const M = new mat2([
        [-1, 0],
        [0, 1]
    ]);

    const v = vec2([800, 0]);

    let Q = M.mult(P);

    Q = translation(Q, v);

    const data = [
        {
            x: P.map(p => p.value[0][0]),
            y: P.map(p => p.value[1][0]),
            type: 'scatter',
            line: { color: '#ff5656' }
        },
        {
            x: Q.map(p => p.value[0][0]),
            y: Q.map(p => p.value[1][0]),
            type: 'scatter',
            line: { color: '#3b3bff' }
        }
    ];

    plot(data);
}

function slide32() {

    // espelhamento vertical
    const M = new mat2([
        [1, 0],
        [0, -1]
    ]);

    const v = vec2([0, 800]);

    let Q = M.mult(P);

    Q = translation(Q, v);

    const data = [
        {
            x: P.map(p => p.value[0][0]),
            y: P.map(p => p.value[1][0]),
            type: 'scatter',
            line: { color: '#ff5656' }
        },
        {
            x: Q.map(p => p.value[0][0]),
            y: Q.map(p => p.value[1][0]),
            type: 'scatter',
            line: { color: '#3b3bff' }
        }
    ];

    plot(data);
}

function slide34() {

    const t = 0.4;

    // rotação
    const M = new mat2([
        [Math.cos(t), -Math.sin(t)],
        [Math.sin(t), Math.cos(t)]
    ]);

    let Q = M.mult(P);

    const data = [
        {
            x: P.map(p => p.value[0][0]),
            y: P.map(p => p.value[1][0]),
            type: 'scatter',
            line: { color: '#ff5656' }
        },
        {
            x: Q.map(p => p.value[0][0]),
            y: Q.map(p => p.value[1][0]),
            type: 'scatter',
            line: { color: '#3b3bff' }
        }
    ];

    plot(data);
}

function slide35() {

    const t = 0.5;

    // rotação
    const Rot = new mat2([
        [Math.cos(t), -Math.sin(t)],
        [Math.sin(t), Math.cos(t)]
    ]);

    const Cis = new mat2([
        [1, 1.2],
        [0, 1]
    ]);

    let Q = Cis.mult(Rot).mult(P);

    const data = [
        {
            x: P.map(p => p.value[0][0]),
            y: P.map(p => p.value[1][0]),
            type: 'scatter',
            line: { color: '#ff5656' }
        },
        {
            x: Q.map(p => p.value[0][0]),
            y: Q.map(p => p.value[1][0]),
            type: 'scatter',
            line: { color: '#3b3bff' }
        }
    ];

    plot(data);
}

function slide35() {

    const t = 0.5;

    // rotação
    const Rot = new mat2([
        [Math.cos(t), -Math.sin(t)],
        [Math.sin(t), Math.cos(t)]
    ]);

    const Cis = new mat2([
        [1, 1.2],
        [0, 1]
    ]);

    let Q = Cis.mult(Rot).mult(P);

    const data = [
        {
            x: P.map(p => p.value[0][0]),
            y: P.map(p => p.value[1][0]),
            type: 'scatter',
            line: { color: '#ff5656' }
        },
        {
            x: Q.map(p => p.value[0][0]),
            y: Q.map(p => p.value[1][0]),
            type: 'scatter',
            line: { color: '#3b3bff' }
        }
    ];

    plot(data);
}

slide5();
// console.log('Slide 8:\n'); slide8();
// console.log('Slide 9:\n'); slide9();
// console.log('Slide 11:\n'); slide11();
// console.log('Slide 12:\n'); slide12();
// console.log('Slide 13:\n'); slide13();
// console.log('Slide 14:\n'); slide14();
// console.log('Slide 15:\n'); slide15();
// console.log('Slide 17:\n'); slide17();
// console.log('Slide 18:\n'); slide18();
// console.log('Slide 19:\n'); slide19();
// console.log('Slide 20:\n'); slide20();
// console.log('Slide 21:\n'); slide21();
// console.log('Slide 22:\n'); slide22();
// console.log('Slide 23:\n'); slide23();
// console.log('Slide 24:\n'); slide24();
slide27();
slide29();
slide31();
slide32();
slide34();
slide35();