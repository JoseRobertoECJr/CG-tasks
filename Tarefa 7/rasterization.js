import { vec2Col } from './render2d.js';
import { vec2 } from './vec.js';

export function implicitFunc(func, height, width, color) {
    
    let vec2ColArr = [];

    for(let x = 0; x < width; x++) {
        for(let y = 0; y < height; y++) {
            if(func(x, y) <= 0) {
                vec2ColArr.push(new vec2Col([x, y], color));
            }
        }
    }

    return vec2ColArr;
}

export function lineFunc(vec2ColorA, vec2ColorB) {
    let out = [];

    const d = vec2ColorB.point.sub(vec2ColorA.point);

    const m = d.value.flat()[1] / d.value.flat()[0];

    const b = vec2ColorA.point.value.flat()[1] - m * vec2ColorA.point.value.flat()[0];

    const x0 = Math.round(vec2ColorA.point.value.flat()[0]);
    const x1 = Math.round(vec2ColorB.point.value.flat()[0]);

    for(let x = x0; x <= x1; x++) {
        const y = Math.round(m * x + b);

        const t = (x - x0) /(x1 - x0);

        const color = [
            vec2ColorA.color[0] * (1-t) + vec2ColorB.color[0] * t, // red
            vec2ColorA.color[1] * (1-t) + vec2ColorB.color[1] * t, // blue
            vec2ColorA.color[2] * (1-t) + vec2ColorB.color[2] * t, // green
        ];

        out.push(new vec2Col([x, y], color));
    }

    return out;
}