import { Mat, transpose } from './matrix.js';

export function Vec(M, vec) {
    return new Mat(M, 1, vec.map(el => [el]));
}

export function vec2(vec) {
    return new Mat(2, 1, vec.map(el => [el]));
}

export function vec3(vec) {
    return new Mat(3, 1, vec.map(el => [el]));
}

export function vec4(vec) {
    return new Mat(4, 1, vec.map(el => [el]));
}

export function toMat(...args) {
    const matrix = new Mat(args.length, args[0].h, args.map(el => el.value.flat()));

    return transpose(matrix);
}

export function lerp(t, A, B) {
    return A.add((B.sub(A)).mult(t));
}
