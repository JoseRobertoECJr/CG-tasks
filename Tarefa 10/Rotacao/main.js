import { init, desenha } from './init.js';



export function main() {

    const V = new Float32Array([
        // Face frontal
        -0.5, -0.5,  0.5, // Vértice 0
        0.5, -0.5,  0.5, // Vértice 1
        0.5,  0.5,  0.5, // Vértice 2
        -0.5,  0.5,  0.5, // Vértice 3

        // Face traseira
        -0.5, -0.5, -0.5, // Vértice 4
        0.5, -0.5, -0.5, // Vértice 5
        0.5,  0.5, -0.5, // Vértice 6
        -0.5,  0.5, -0.5, // Vértice 7
    ]);
    
    const indices = new Uint16Array([
        // Arestas da face frontal
        0, 1,
        1, 2,
        2, 3,
        3, 0,

        // Arestas da face traseira
        4, 5,
        5, 6,
        6, 7,
        7, 4,

        // Arestas que conectam a face frontal e traseira
        0, 4,
        1, 5,
        2, 6,
        3, 7,
    ]);

    init(V, indices);

    desenha();
}
