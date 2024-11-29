import { implicitFunc } from '../rasterization.js';
import { imageRGB,
    points, lines, lineStrip, lineLoop, triangles, triangleStrip, triangleFan,
    red, green, blue, yellow, cyan, orange, white, canvas
} from '../render2d.js';
import { vec2Col } from '../vec.js';

export function main() {

    const height = canvas.height;
    const width = canvas.width;

    const G = (x, y, cx, cy, s) =>
        100 * Math.exp(-((Math.pow(x - cx, 2) + Math.pow(y - cy, 2))/Math.pow(s, 2)));

    // const F = (x, y) => 50 - G(x, y, 200, 300, 50) - G(x, y, 350, 220, 120);
    const F = (x, y) => 50
        - G(x, y, 200, 300, 50) // cabeca
        - G(x, y, 200, 125, 120) // corpo
        - G(x, y, 100, 175, 20) // braco esquerdo
        - G(x, y, 50, 175, 20) // braco esquerdo
        - G(x, y, 300, 175, 20) // braco direito
        - G(x, y, 350, 175, 20) // braco direito
        - G(x, y, 275, 25, 20)
        - G(x, y, 125, 25, 20)

    const P = implicitFunc(F, height, width, blue);

    let Img = new imageRGB();

    Img.fill(white);
    
    Img.render2d([
        [P, points]
    ]);
}
