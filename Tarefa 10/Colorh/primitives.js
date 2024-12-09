import { line } from "./line.js";
import { rasterizeLine, rasterizeTriangle } from "./rasterization.js";
import { triangle } from "./triangle.js";

export const primitives = {
    lines: lines,
    lineStrip: lineStrip,
    lineLoop: lineLoop,
    triangles: triangles,
    triangleStrip: triangleStrip,
    triangleFan: triangleFan
};

export function lines(vec2ColArr) {

    let out = [];

    for(let i = 0; i < vec2ColArr.length - 1; i=i+2) {
        console.log(i)
        out.push(...rasterizeLine(new line(vec2ColArr[i], vec2ColArr[i+1])));
    }

    return out;
}

export function lineStrip(vec2ColArr) {

    let out = [];

    for(let i = 0; i < vec2ColArr.length - 1; i++) {
        console.log(i)
        out.push(...rasterizeLine(
            new line(vec2ColArr[i], vec2ColArr[i+1])
        ));
    }
    
    return out;
}

export function lineLoop(vec2ColArr) {

    let out = [];

    for(let i = 0; i < vec2ColArr.length; i++) {
        console.log(i)
        out.push(...rasterizeLine(
            new line(vec2ColArr[i], vec2ColArr[(i+1)%vec2ColArr.length])
        ));
    }
    
    return out;
}

export function triangles(vec2ColArr) {

    let out = [];

    for(let i = 0; i < vec2ColArr.length - 2; i=i+3) {
        out.push(...rasterizeTriangle(
            new triangle(vec2ColArr[i],
            vec2ColArr[i+1],
            vec2ColArr[i+2]
        )));
    }
    
    return out;
}

export function triangleStrip(vec2ColArr) {

    let out = [];

    for(let i = 0; i < vec2ColArr.length - 2; i++) {
        out.push(...rasterizeTriangle(
            new triangle(vec2ColArr[i],
            vec2ColArr[i+1],
            vec2ColArr[i+2]
        )));
    }
    
    return out;
}

export function triangleFan(vec2ColArr) {

    let out = [];

    for(let i = 0; i < vec2ColArr.length - 2; i=i+1) {
        out.push(...rasterizeTriangle(
            new triangle(vec2ColArr[0],
            vec2ColArr[i+1],
            vec2ColArr[i+2]
        )));
    }
    
    return out;
}
