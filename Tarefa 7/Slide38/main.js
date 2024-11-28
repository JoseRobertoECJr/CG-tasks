import { implicitFunc, lineFunc, dda } from '../rasterization.js';
import { imageRGB, vec2Col,
    points, lines, lineStrip, lineLoop, triangles, triangleStrip, triangleFan,
    red, green, blue, yellow, cyan, orange, white, canvas
} from '../render2d.js';
import { vec2 } from '../vec.js';

export function main() {

    const P = lineFunc(new vec2Col([20, 300], red), new vec2Col([280, 200], red));
    const Q = lineFunc(new vec2Col([20, 20], blue), new vec2Col([80, 334], blue));

    let Img = new imageRGB();

    Img.fill(white);
    
    Img.render2d([
        [P, points],
        [Q, points]
    ]);
}
