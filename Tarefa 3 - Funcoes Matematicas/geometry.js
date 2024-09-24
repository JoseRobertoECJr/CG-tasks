import { vec2, vec3 } from './vec.js';

export function tri_area(a, b, c) {
    if(!(a instanceof vec2)
        || !(b instanceof vec2)
        || !(c instanceof vec2)) throw new Error('ERRO! Dimensões incompatíveis!\n');

    return (c.x - a.x) * (b.y - a.y) / 2 - (b.x - a.x) * (c.y - a.y) / 2;
}

export function barycentric_coords(p, P) {
    const aT = tri_area(P[0], P[1], P[2]);

    return new vec3(
        tri_area(p, P[1], P[2]) / aT,
        tri_area(P[0], p, P[2]) / aT,
        tri_area(P[0], P[1], p) / aT,
    );
}