import { imageRGB, vec2Col,
    points, lines, lineStrip, lineLoop, triangles, triangleStrip, triangleFan,
    red, green, blue, yellow, cyan, orange, white
} from '../render2d.js';

export function main() {

    const P = [
        new vec2Col([20, 20], red),
        new vec2Col([80, 60], green),
        new vec2Col([220, 30], blue),
        new vec2Col([350, 90], yellow),
        new vec2Col([70, 300], cyan),
        new vec2Col([320, 150], orange)
    ];

    let G = new imageRGB();

    G.fill(white);
    
    G.render2d([
        [P, lineStrip]
    ]);
}
