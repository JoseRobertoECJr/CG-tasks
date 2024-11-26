import { ImageRGB } from '../render2d.js';

export function main() {

    // Cria o canvas
    let G = new ImageRGB();

    console.log(G);

    // Define a cor de fundo e limpa a tela
    G.fill(0, 0, 0, 1.0);
    
    G.render2d();
}
