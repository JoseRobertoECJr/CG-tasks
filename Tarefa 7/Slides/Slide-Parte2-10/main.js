import { line } from '../line.js';
import { bresenham, dda, rasterizeLine, simple, simpleRasterizeTriangle, scanline, rasterizeTriangle } from '../rasterization.js';
import { imageRGB, points,
    red, green, blue, yellow, cyan, orange, white, black, canvas
} from '../render2d.js';
import { triangle } from '../triangle.js';
import { vec2Col } from '../vec.js';

export function main() {

    const triang = new triangle(
        new vec2Col([20, 50], red),
        new vec2Col([20, 100], blue),
        new vec2Col([400, 100], yellow)
    );

    const P = rasterizeTriangle(triang, scanline);

    console.log(P)

    let Img = new imageRGB();

    Img.fill(white);
    
    Img.render2d([
        [P, points]
    ]);
}
