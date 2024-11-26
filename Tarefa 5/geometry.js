import { vec2, vec3, lerp } from './vec.js';

export function triArea(a, b, c) {
    if(a.h != 2 || a.h != b.h || b.h != c.h || a.w != 1 || a.w != b.w || b.w != c.w)
        throw new Error('ERRO! Dimensões incompatíveis!\n');

    // x = [0][0]
    // y = [1][0]
    return (c.value[0][0] - a.value[0][0]) * (b.value[1][0] - a.value[1][0])
        / 2 - (b.value[0][0] - a.value[0][0]) * (c.value[1][0] - a.value[1][0]) / 2;
}

export function barycentricCoords(p, P) {
    const aT = triArea(P[0], P[1], P[2]);

    return new vec3([
        triArea(p, P[1], P[2]) / aT,
        triArea(P[0], p, P[2]) / aT,
        triArea(P[0], P[1], p) / aT,
    ]);
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

    const nPoints = P.length;

    for(let i = 0; i + M < nPoints; i += M) {
        const Q = sampleBezier(M, P.slice(i), n);
        C = [...C, ...Q];
    }

    return C;
}

export function translation(P, v) {
    let Q = [...P];

    for(let i = 0; i < P.length; i++)
    {
        Q[i] = P[i].add(v);
    }

    return Q;
}

export function get2DPosition(v3) {

    const v3ValueFlat = v.value.flat();
    
    return vec2([v3ValueFlat[0]/v3ValueFlat[2], v3ValueFlat[1]/v3ValueFlat[2]]);
}
