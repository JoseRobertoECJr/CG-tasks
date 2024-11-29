import { imageRGB, red, green, blue, yellow, cyan, orange, white, black, canvas } from '../render2d.js';
import { primitives } from '../primitives.js';
import { vec2Col } from '../vec.js';

export function main() {

    const P = [
        new vec2Col([20, 20], red),
        new vec2Col([80, 60], green),
        new vec2Col([220, 30], blue),
        new vec2Col([350, 90], yellow),
        new vec2Col([70, 300], cyan),
        new vec2Col([320, 150], orange)
    ];

    let Img = new imageRGB();

    Img.fill(white);
    
    Img.render2d([
        [P, primitives.lineLoop]
    ]);
}
