import { imageRGB, red, green, blue, yellow, cyan, orange, white, black, canvas } from '../render2d.js';
import { primitives } from '../primitives.js';
import { vec2Col } from '../vec.js';

export function main() {

    const P = [
        new vec2Col([ 60, 105], red),
        new vec2Col([229, 114], green),
        new vec2Col([145, 270], blue),
        new vec2Col([364, 208], yellow),
        new vec2Col([283, 333], cyan),
        new vec2Col([471, 298], orange)
    ];

    let Img = new imageRGB();

    Img.fill(white);
    
    Img.render2d([
        [P, primitives.triangleStrip]
    ]);
}
