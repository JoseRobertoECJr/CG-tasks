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

    // alfas
    return new vec3([
        triArea(p, P[1], P[2]) / aT,
        triArea(P[0], p, P[2]) / aT,
        triArea(P[0], P[1], p) / aT,
    ]);
}

export function isInside(alfas) {
    const aValues = alfas.value.flat();

    return aValues[0] >= 0 && aValues[0] <= 1 &&
        aValues[1] >= 0 && aValues[1] <= 1 &&
        aValues[2] >= 0 && aValues[2] <= 1;
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

export function intersectSemirays(line1, line2) {

    const x0 = line1.p.point.value.flat()[0];
    const y0 = line1.p.point.value.flat()[1];
    const x1 = line1.q.point.value.flat()[0];
    const y1 = line1.q.point.value.flat()[1];

    const x2 = line2.p.point.value.flat()[0];
    const y2 = line2.p.point.value.flat()[1];
    const x3 = line2.q.point.value.flat()[0];
    const y3 = line2.q.point.value.flat()[1];

    // Calcula os determinantes
    const det = (x1 - x0) * (y3 - y2) - (y1 - y0) * (x3 - x2);

    if (det === 0) {
        // Se o determinante for zero, as retas são paralelas
        return false;
    }

    // Calcula os parâmetros t e u
    const t = ((x2 - x0) * (y3 - y2) - (y2 - y0) * (x3 - x2)) / det;
    const u = ((x2 - x0) * (y1 - y0) - (y2 - y0) * (x1 - x0)) / det;

    // Verifica se os parâmetros estão no intervalo [0, 1], o que indica interseção no segmento
    if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
        // Calcula o ponto de interseção
        const px = x0 + t * (x1 - x0);
        const py = y0 + t * (y1 - y0);

        return new vec2([px, py]);
    }

    // Sem interseção nas semirretas
    return false;
  }