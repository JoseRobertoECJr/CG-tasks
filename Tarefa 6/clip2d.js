import { vec2 } from './vec.js';
import { semiplane } from './semiplane.js';

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

export function line(P, Q) {
    this.p = P;
    this.q = Q;
}

export function clipLine(lin, rect) {

    for(const semiplane of rect.sides()) {
        
        const hasP = semiplane.has(lin.p);
        const hasQ = semiplane.has(lin.q);


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
        
        const t = semiplane.intersect(lin.p, lin.q);
        const r = lin.p.mult(1-t).add(lin.q.mult(t));
        
        lin = !hasP ? new line(r, lin.q) : new line(lin.p, r);
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
