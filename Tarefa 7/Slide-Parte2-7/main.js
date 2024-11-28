import { line } from '../line.js';
import { bresenham, dda, rasterizeLine, simple } from '../rasterization.js';
import { imageRGB, vec2Col, points,
    red, green, blue, yellow, cyan, orange, white, canvas
} from '../render2d.js';

export function main() {

    // const lineP = new line(new vec2Col([20, 300], red), new vec2Col([280, 200], red));
    const lineP = new line(new vec2Col([20, 20], blue), new vec2Col([80, 334], red));
    const lineQ = new line(new vec2Col([40, 20], blue), new vec2Col([100, 334], red));
    const lineR = new line(new vec2Col([60, 20], blue), new vec2Col([120, 334], red));

    const P = rasterizeLine(lineP, simple);
    const Q = rasterizeLine(lineQ, dda);
    const R = rasterizeLine(lineR, bresenham);

    let Img = new imageRGB();

    Img.fill(white);
    
    Img.render2d([
        [P, points],
        [Q, points],
        [R, points]
    ]);
}
