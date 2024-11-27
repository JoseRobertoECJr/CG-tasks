import { dot, vec2 } from './vec.js';

export function semiplane(vecA, vecn) {
    this.A = vecA;
    this.n = vecn;

    this.has = (P) => {
        return dot(P.sub(this.A), this.n) >= 0;
    }

    this.intersect = (P, Q) => {
        return dot(this.A.sub(P), this.n) / dot(Q.sub(P), n);
    }
}

export function clipRectangle(x0, y0, x1, y1) {
    this.x0 = x0;
    this.y0 = y0;
    this.x1 = x1;
    this.y1 = y1;

    this.sides = () => {
        return [
            new semiplane(new vec2([x0, y0]), new vec2([1, 0])), // left
            new semiplane(new vec2([x1, y0]), new vec2([-1, 0])), // right
            new semiplane(new vec2([x0, y0]), new vec2([0, 1])), // down
            new semiplane(new vec2([x1, y1]), new vec2([0, -1])) // up
        ];
    }
}