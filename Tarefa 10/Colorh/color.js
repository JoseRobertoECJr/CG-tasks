import { Vec, lerp } from "./vec.js";

export const white = new RGB([255, 255, 255]);
export const red = new RGB([255, 0, 0]);
export const green = new RGB([0, 255, 0]);
export const blue = new RGB([0, 0, 255]);
export const black = new RGB([0, 0, 0]);
export const cyan = new RGB([0, 255, 255]);
export const yellow = new RGB([255, 255, 0]);
export const orange = new RGB([255, 165, 0]);

export function clamp(v, a, b) {
    if(v < a) {
        return a;
    } else if(v > b) {
        return b;
    }

    return v;
}

export function toFloat(v) {
    return v/255;
}

export function toByte(v) {
    return Math.round(255*clamp(v, 0, 1));
}

function hexToRgb(hex) {
    hex = hex.replace(/^#/, '');
    
    if (hex.length === 3) {
        hex = hex.split('').map(char => char + char).join('');
    }
    
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return [r, g, b];
}

export function toVec(C) {

    if(typeof(C) === 'string') {
        return new Vec(3, hexToRgb(C).map(c => toFloat(c)));
    }

    let aux = C.value.flat();
    let V = [];

    for(let i = 0; i < aux.length; i++) {
        V[i] = toFloat(aux[i]);
    }

    return new Vec(3, V);
}

export function Color(N, color) {
    return new Vec(N, color);
}

export function RGB(color) {
    return new Color(3, color);
}

export function toColor(V) {
    let C = V.value.flat();
    for(let i = 0; i < C.length; i++) {
        C[i] = toByte(C[i]);
    }

    return new RGB(C);
}

export function lerpColor(t, A, B) {
    return toColor(lerp(t, toVec(A), toVec(B)));
}