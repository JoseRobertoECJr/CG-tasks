import { imageRGB, vec2Col,
    points, lines, lineStrip, lineLoop, triangles, triangleStrip, triangleFan,
    red, green, blue, yellow, cyan, orange, white
} from '../render2d.js';
import { clipRectangle, clip, clipPolygon } from '../clip2d.js';
import { line, toLines } from '../line.js';

export function main() {

    const R = new clipRectangle(30, 40, 300, 200);
    const RP = [
        new vec2Col([R.x0,R.y0], blue),
        new vec2Col([R.x0,R.y1], blue),
        new vec2Col([R.x1,R.y1], blue),
        new vec2Col([R.x1,R.y0], blue)
    ];

    const P = [
        new vec2Col([ 60, 105], red),
        new vec2Col([145, 270], blue),
        new vec2Col([283, 333], cyan),
        new vec2Col([471, 298], orange),
        new vec2Col([364, 208], yellow),
        new vec2Col([229, 114], green),
    ];

    const polygon = clipPolygon(P, R);

    console.log(polygon.map(v => v.point.value.flat()))

    let G = new imageRGB();
    G.fill(white);
    G.render2d([
        //[P, triangleFan],
        [RP, lineLoop],
        [polygon, triangleFan]
    ]);
}
