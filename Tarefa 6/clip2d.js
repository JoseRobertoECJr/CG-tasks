import { vec2 } from './vec.js';
import { semiplane } from './semiplane.js';
import { vec2Col } from './render2d.js';
import { line } from './line.js';

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

export function clipLine(lin, rect) {

    for(const semiplane of rect.sides()) {
        
        const hasP = semiplane.has(lin.p.point);
        const hasQ = semiplane.has(lin.q.point);


        // segmento de reta contido no semiplano
        if(!hasP && !hasQ)
        {
            return [false, lin];
        }

        // segmento de reta contido no semiplano
        if(hasP && hasQ)
        {
            continue;
        }
        
        const t = semiplane.intersect(lin.p.point, lin.q.point);
        const r = lin.p.point.mult(1-t).add(lin.q.point.mult(t));

        const rColor = [
            lin.p.color[0] * (1-t) + lin.q.color[0] * t, // red
            lin.p.color[1] * (1-t) + lin.q.color[1] * t, // blue
            lin.p.color[2] * (1-t) + lin.q.color[2] * t, // green
        ];

        const rvec2Col = new vec2Col(r.value.flat(), rColor)
        
        lin = !hasP ? new line(rvec2Col, lin.q) : new line(lin.p, rvec2Col);
    }

    return [true, lin];
}

export function clip(lines, rect) {
    
    let newLines = [];
    for(const lin of lines) {
        const [hasLine, clipedLin] = clipLine(lin, rect);

        if(hasLine) {
            newLines.push(clipedLin);
        }
    }

    return newLines;
}

export function clipPol(vec2ColArr, semipl) {

    let newVecs = [];
    for(let i = 0; i < vec2ColArr.length; i++) {
        const p = vec2ColArr[i];
        const q = vec2ColArr[(i+1)%vec2ColArr.length];
        
        const hasP = semipl.has(p.point);
        const hasQ = semipl.has(q.point);

        console.log(p.point.value.flat(), q.point.value.flat(), hasP, hasQ)

        if(hasP != hasQ) {
            const t = semipl.intersect(p.point, q.point);
            const r = p.point.mult(1-t).add(q.point.mult(t));

            const rColor = [
                p.color[0] * (1-t) + q.color[0] * t, // red
                p.color[1] * (1-t) + q.color[1] * t, // blue
                p.color[2] * (1-t) + q.color[2] * t, // green
            ];

            newVecs.push(new vec2Col(r.value.flat(), rColor));
        }

        if(hasQ) {
            newVecs.push(q);
        }
    }

    return newVecs;
}

export function clipPolygon(vec2ColArr, rect) {
    let polygon = [...vec2ColArr];

    for(let semipl of rect.sides()) {
        polygon = clipPol(polygon, semipl);
    }

    return polygon;
}