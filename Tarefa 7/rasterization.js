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
            if(isInside(new vec2([p.x, p.y]), triang)) {
                out.push();
            }
        }
    }

}