import { imageRGB,
    points, lines, lineStrip, lineLoop, triangles, triangleStrip, triangleFan,
    red, green, blue, yellow, cyan, orange, white
} from '../render2d.js';
import { clipRectangle, clip, clipPolygon } from '../clip2d.js';
import { line, toLines } from '../line.js';
import { vec2Col, vec3Col } from '../vec.js';

export function main() {

    const Q = [
        new vec3Col([ -1, -1, 2], red),
        new vec3Col([1, 0, 0], blue),
        new vec3Col([0, 0, 0], cyan)
    ];

    let G = new imageRGB();
    G.fill(white);
    G.render2d([
        [Q, triangles]
    ]);
}
