import { vec2, vec2Col } from './vec.js';
import { barycentricCoords, isInside, intersectSemirays } from './geometry.js';
import { line } from './line.js';

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

export function simple(vec2ColorA, vec2ColorB) {
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

export function dda(vec2ColorA, vec2ColorB) {
    
    const dif = vec2ColorB.point.sub(vec2ColorA.point);
    const delta = Math.max(Math.abs(dif.value.flat()[0]), Math.abs(dif.value.flat()[1]));

    const d = dif.mult(1 / delta);
    let p = vec2ColorA.point;

    const x0 = Math.round(vec2ColorA.point.value.flat()[0]);
    const x1 = Math.round(vec2ColorB.point.value.flat()[0]);

    let out = [];

    for(let i = 0; i <= delta; i++) {

        const t = (p.value.flat()[0] - x0) /(x1 - x0);

        const color = [
            vec2ColorA.color[0] * (1-t) + vec2ColorB.color[0] * t, // red
            vec2ColorA.color[1] * (1-t) + vec2ColorB.color[1] * t, // blue
            vec2ColorA.color[2] * (1-t) + vec2ColorB.color[2] * t, // green
        ];

        const newVec = new vec2Col([Math.round(p.value.flat()[0]), Math.round(p.value.flat()[1])], color);

        out.push(newVec);

        p = p.add(d);
    }

    return out;
}

export function bresenhamBase(dx, dy) {
    let out = [];

    let D = 2*dy - dx;
    let y = 0;

    for(let x = 0; x <= dx; x++) {
        out.push({ x, y });
        if(D > 0) {
            y++;
            D -= 2*dx;
        }
        D += 2*dy;
    }

    return out;
}

export function bresenhamInterm(dx, dy) {
    let out = [];

    if(dx >= dy) {
        out = bresenhamBase(dx, dy);
    } else {
        let res = bresenhamBase(dy, dx);
        out = res.map(p => { return { x: p.y, y: p.x } });
    }

    return out;
}

export function bresenham(vec2ColorA, vec2ColorB) {

    let p0x = vec2ColorA.point.value.flat()[0];
    let p1x = vec2ColorB.point.value.flat()[0];

    const p0 = p0x <= p1x ? vec2ColorA : vec2ColorB;
    const p1 = p0x <= p1x ? vec2ColorB : vec2ColorA;

    p0x = p0.point.value.flat()[0];
    let p0y = p0.point.value.flat()[1];

    p1x = p1.point.value.flat()[0];
    let p1y = p1.point.value.flat()[1];

    let res = bresenhamInterm(p1x - p0x, Math.abs(p1y - p0y));

    const s = p0y <= p1y ? 1 : -1;

    let out = [];
    for(const p of res) {

        const x = p0x + p.x;

        const t = (x - p0x) /(p1x - p0x);

        const color = [
            p0.color[0] * (1-t) + p1.color[0] * t, // red
            p0.color[1] * (1-t) + p1.color[1] * t, // blue
            p0.color[2] * (1-t) + p1.color[2] * t, // green
        ];

        out.push(new vec2Col([x, p0y + s * p.y], color));
    }

    return out;
}

export function rasterizeLine(lin, method) {
    if(!method) method = bresenham;

    return method(lin.p, lin.q);
}

export function simpleRasterizeTriangle(triang) {
    const A = triang.a;
    const B = triang.b;
    const C = triang.c;

    const Av = A.point.value.flat();
    const Bv = B.point.value.flat();
    const Cv = C.point.value.flat();

    const xmin = Math.ceil(Math.min(Av[0], Bv[0], Cv[0]));
    const xmax = Math.floor(Math.max(Av[0], Bv[0], Cv[0]));
    const ymin = Math.ceil(Math.min(Av[1], Bv[1], Cv[1]));
    const ymax = Math.floor(Math.max(Av[1], Bv[1], Cv[1]));

    let out = [];
    let p = {};

    for(p.y = ymin; p.y <= ymax; p.y++) {
        for(p.x = xmin; p.x <= xmax; p.x++) {

            const alfas = barycentricCoords(new vec2([p.x, p.y]), [A.point, B.point, C.point])

            const alfasV = alfas.value.flat();

            const color = [
                A.color[0] * alfasV[0] + B.color[0] * alfasV[1] + C.color[0] * alfasV[2], // red
                A.color[1] * alfasV[0] + B.color[1] * alfasV[1] + C.color[1] * alfasV[2], // blue
                A.color[2] * alfasV[0] + B.color[2] * alfasV[1] + C.color[2] * alfasV[2], // green
            ];

            if(isInside(alfas)) {
                out.push(new vec2Col([p.x, p.y], color));
            }
        }
    }

    return out;
}

export function scanline(triang) {

    const height = Math.max(
        triang.a.point.value[1][0], triang.b.point.value[1][0], triang.c.point.value[1][0]
    ) + 1;

    const width = Math.max(
        triang.a.point.value[0][0], triang.b.point.value[0][0], triang.c.point.value[0][0]
    ) + 1;

    const minHeight = Math.min(
        triang.a.point.value[1][0], triang.b.point.value[1][0], triang.c.point.value[1][0]
    ) - 1;

    const minWidth = Math.min(
        triang.a.point.value[0][0], triang.b.point.value[0][0], triang.c.point.value[0][0]
    ) - 1;

    console.log(width, height)
    
    const vec2ColArr = [triang.a, triang.b, triang.c];

    let out = [];

    for(let y = minHeight; y < height; y++) {

        let xIntersects = [];

        for(let i = 0; i < vec2ColArr.length; i++) {

            const vec1 = vec2ColArr[i];
            const vec2 = vec2ColArr[(i+1) % vec2ColArr.length];

            let semiray = new line(
                new vec2Col(vec1.point.value.flat(), vec1.color),
                new vec2Col(vec2.point.value.flat(), vec2.color)
            );

            let lineY = new line(
                new vec2Col([minWidth, y], [1, 1, 1]), // add qualquer cor
                new vec2Col([width, y], [1, 1, 1]) // add qualquer cor
            );

            const intersect = intersectSemirays(semiray, lineY);
            
            if(intersect) {
                const alfas = barycentricCoords(intersect, vec2ColArr.map(v => v.point));

                const alfasV = alfas.value.flat();

                const color = [
                    triang.a.color[0] * alfasV[0] + triang.b.color[0] * alfasV[1] + triang.c.color[0] * alfasV[2], // red
                    triang.a.color[1] * alfasV[0] + triang.b.color[1] * alfasV[1] + triang.c.color[1] * alfasV[2], // blue
                    triang.a.color[2] * alfasV[0] + triang.b.color[2] * alfasV[1] + triang.c.color[2] * alfasV[2], // green
                ];

                xIntersects.push(new vec2Col(intersect.value.flat(), color));
            }
        }

        xIntersects.sort((a, b) => a.point.value[0][0] - b.point.value[0][0]);

        for(let i = 0; i < xIntersects.length; i++) {

            if(!i%2) {
                out.push(...rasterizeLine(new line(xIntersects[i], xIntersects[(i+1)%xIntersects.length])))
            }
        }
    }

    return out;
}

export function rasterizeTriangle(triang, method) {
    if(!method) method = simpleRasterizeTriangle;

    return method(triang);
}