import { imageRGB, vec2Col,
    points, lines, lineStrip, lineLoop, triangles, triangleStrip, triangleFan,
    red, green, blue, yellow, cyan, orange, white
} from '../render2d.js';
import { clipRectangle } from '../clip2d.js';

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

    const RP = [
        new vec2Col([R.x0,R.y0], blue),
        new vec2Col([R.x0,R.y1], blue),
        new vec2Col([R.x1,R.y1], blue),
        new vec2Col([R.x1,R.y0], blue),
    ];

    let G = new imageRGB();

    G.fill(white);
    
    G.render2d([
        [P, lineStrip],
        [RP, lineLoop]
    ]);
}
