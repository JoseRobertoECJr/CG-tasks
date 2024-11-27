import { imageRGB, vec2Col,
    points, lines, lineStrip, lineLoop, triangles, triangleStrip, triangleFan,
    red, green, blue, yellow, cyan, orange, white
} from '../render2d.js';
import { clipRectangle, line, clip } from '../clip2d.js';
import { vec2 } from '../vec.js';

export function main() {

    const R = new clipRectangle(30, 40, 300, 200);

    const P = [
        new vec2Col([20, 20], red),
        new vec2Col([80, 60], green),
        new vec2Col([220, 30], blue),
        new vec2Col([350, 90], yellow),
        new vec2Col([70, 300], cyan),
        new vec2Col([320, 150], orange)
    ];

    let lines = [];
    for(let i = 0; i < P.length - 1; i++) {
        lines.push(new line(P[i], P[i+1]));
    }

    const newLines = clip(lines, R)
    .map(l =>
        [[
            l.p,
            l.q
        ], lineStrip]
    );

    console.log(lines)
    console.log(newLines)

    const RP = [
        new vec2Col([R.x0,R.y0], blue),
        new vec2Col([R.x0,R.y1], blue),
        new vec2Col([R.x1,R.y1], blue),
        new vec2Col([R.x1,R.y0], blue),
    ];

    let G = new imageRGB();

    G.fill(white);
    
    G.render2d([
        //[P, lineStrip],
        [RP, lineLoop],
        ...newLines
    ]);
}
