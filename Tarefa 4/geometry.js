import { vec2, vec3, lerp } from './vec.js';

export function triArea(a, b, c) {
    if(!(a instanceof vec2)
        || !(b instanceof vec2)
        || !(c instanceof vec2)) throw new Error('ERRO! Dimensões incompatíveis!\n');

    return (c.x - a.x) * (b.y - a.y) / 2 - (b.x - a.x) * (c.y - a.y) / 2;
}

export function barycentricCoords(p, P) {
    const aT = triArea(P[0], P[1], P[2]);

    return new vec3(
        triArea(p, P[1], P[2]) / aT,
        triArea(P[0], p, P[2]) / aT,
        triArea(P[0], P[1], p) / aT,
    );
}

// M: bezier cubico: M = 3
// N: Dimensao dos pontos (vetores) (nao existe nessa versao)
// P: array de pontos (vetores)
function bezier(M, P, t) {
    let Q = [...P];

    for(let m = M; m > 0; m--) {
        for(let i = 0; i < m; i++) {
            Q[i] = lerp(t, Q[i], Q[i+1]);
        }
    }

    return Q[0];
}

// M: bezier cubico: M = 3
// N: Dimensao dos pontos (vetores) (nao existe nessa versao)
// P: array de pontos (vetores)
// n: quantidade de pontos a serem calculados
export function sampleBezier(M, P, n) {
    let C = [];

    for(let i = 0; i < n; i++) {
        const t = i / (n - 1);
        C[i] = bezier(M, P, t);
    }

    return C;
}

export function sampleBezierSpline(M, P, n) {
    let C = [];

    const nPoints = P.length();

    for(let i = 0; i + M < nPoints; i += M) {
        const Q = sampleBezier(M, P[i], n);
        C = [...C, ...Q];
    }
}