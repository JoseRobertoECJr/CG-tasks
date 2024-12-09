import { dot } from './vec.js';

export function semiplane(vecA, vecn) {
    this.A = vecA;
    this.n = vecn;

    this.has = (P) => {
        return dot(P.sub(this.A), this.n) >= 0;
    }

    this.intersect = (P, Q) => {
        return dot(this.A.sub(P), this.n) / dot(Q.sub(P), this.n);
    }
}
