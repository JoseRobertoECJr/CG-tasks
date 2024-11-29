import { line } from "./line";
import { rasterizeLine } from "./rasterization";

export const primitives = {
    Lines: lines,
    LineStrip: lineStrip,
    LineLoop: lineLoop,
    Triangles: 3,
    TriangleStrip: 4,
    TriangleFan: 5
};

export function lines(vec2ColArr) {

    let out = [];

    for(let i = 0; i < vec2ColArr.length - 1; i+2) {
        out.push(...rasterizeLine(new line(vec2ColArr[i], new line(vec2ColArr[i+1]))));
    }

    return out;
}

export function lineStrip(vec2ColArr) {

    let out = [];

    for(let i = 0; i < vec2ColArr.length - 1; i++) {
        out.push(...rasterizeLine(
            new line(vec2ColArr[i],
            new line(vec2ColArr[i+1])
        )));
    }
    
    return out;
}

export function lineLoop(vec2ColArr) {

    let out = [];

    for(let i = 0; i < vec2ColArr.length; i++) {
        out.push(...rasterizeLine(
            new line(vec2ColArr[i],
            new line(vec2ColArr[(i+1)%vec2ColArr.length])
        )));
    }
    
    return out;
}

