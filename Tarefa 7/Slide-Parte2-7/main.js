import { line } from '../line.js';
import { bresenham, dda, rasterizeLine, simple, simpleRasterizeTriangle } from '../rasterization.js';
import { imageRGB, vec2Col, points,
    red, green, blue, yellow, cyan, orange, white, canvas
} from '../render2d.js';
import { triangle } from '../triangle.js';

export function main() {

    const triang = new triangle(
        new vec2Col([20, 50], red),
        new vec2Col([524, 100], blue),
        new vec2Col([205, 567], green)
    );

    const P = simpleRasterizeTriangle(triang);

    console.log(P)

    let Img = new imageRGB();

    Img.fill(white);
    
    Img.render2d([
        [P, points]
    ]);
}
