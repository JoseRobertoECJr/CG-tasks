// Vertex Shader
const vertexShaderSource = `
attribute vec3 aPosition;
void main(void) {
    gl_Position = vec4(aPosition, 1.0);
}
`;

// Fragment Shader (define a cor do triângulo)
const fragmentShaderSource = `
void main(void) {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); // Vermelho
}
`;

window.onload = main;
