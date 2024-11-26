const vertexShaderSource = `
attribute vec2 aPosition;
uniform vec2 uResolution;
void main() {
    // Converte as coordenadas do canvas para o clip space
    vec2 clipSpace = (aPosition / uResolution) * 2.0 - 1.0;
    gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
}
`;

const fragmentShaderSource = `
precision mediump float;
uniform vec4 uColor;
void main() {
    gl_FragColor = uColor;
}
`;

window.onload = main;
