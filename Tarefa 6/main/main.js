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

    const P2 = [
        new vec2Col([ 60, 105], red),
        new vec2Col([229, 114], green),
        new vec2Col([145, 270], blue),
        new vec2Col([364, 208], yellow),
        new vec2Col([283, 333], cyan),
        new vec2Col([471, 298], orange)
    ];

    let G = new imageRGB();

    G.fill(white);
    
    G.render2d([
        [P, lineStrip],
        [P2, triangles],
    ]);
}
